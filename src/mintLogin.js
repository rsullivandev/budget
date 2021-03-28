const puppeteer = require('puppeteer');
const fs = require('fs');
const dateHelper = require('./dateHelper');


const mm = getMonth();
const dd = getDate();
const yyyy = getYearFull();
const yy = getYearShort();

(async () => {
  const browser = await puppeteer.launch(
    {
      args: [
        '--no-sandbox',
        '--remote-debugging-port=9222',
        '--remote-debugging-address=0.0.0.0',
      ],
      slowMo: 20
    });
  const page = await browser.newPage();
  await page.goto(`https://mint.intuit.com/transaction.event?startDate=${mm}/01/${yy}&endDate=${mm}/${dd}/${yy}`);
  await page.waitForSelector('#ius-identifier');
  await page.type('#ius-identifier', `${process.env.email}`, { delay: 100 });
  const [respones1] = await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForTimeout(10000)
  ]);

  await page.type('#ius-sign-in-mfa-password-collection-current-password', `${process.env.pass}`);
  const [response2] = await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForTimeout(15000),
  ]);
  console.log("Authenticated....Starting download");

  const downloadedURL = `https://mint.intuit.com/transactionDownload.event?startDate=${mm}%2F01%2F${yyyy}&endDate=${mm}%2F${dd}%2F${yyyy}&queryNew=&offset=0&filterType=cash&comparableType=8`;
  const downloadedContent = await page.evaluate(async downloadedURL => {
    const fetchResp = await fetch(downloadedURL, {credentials: 'include'});
    return await fetchResp.text();
  }, downloadedURL);


  fs.writeFileSync(`./input/mint/transactions_input_${mm}${yy}.csv`, downloadedContent);

  await browser.close();  
})();