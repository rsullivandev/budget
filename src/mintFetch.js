const puppeteer = require('puppeteer');
const fs = require('fs');
const dh = require('./dateHelper');
const readline = require('readline');

// const _dh = new dh.dateHelper(new Date());
const _dh = new dh.dateHelper(new Date('04-01-2021'));


const mm = _dh.getMonth();
const dd = _dh.getDate();
const yyyy = _dh.getYearFull();
const yy = _dh.getYearShort();

async function readLine() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {

      rl.question('Enter captcha: ', (answer) => {
        rl.close();
        resolve(answer)
      });
  })
}


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
  await page.type('#ius-identifier', `${process.env.EMAIL}`, { delay: 100 });
  const [respones1] = await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForTimeout(10000)
  ]);

  await page.type('#ius-sign-in-mfa-password-collection-current-password', `${process.env.PASS}`);
  const [response2] = await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForTimeout(15000),
  ]);

  await page.waitForSelector('#ius-mfa-options-submit-btn',{timeout: 10000})
  await page.waitForTimeout(10000);

  //TODO: Need to click enter button here....Waiting for 10 seconds for manual click at the moment

  const mfaCode = await readLine();
  await page.type('#ius-mfa-confirm-code', mfaCode);
  
  const [response3] = await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForTimeout(15000),
  ]);



  console.log("Authenticated....Starting download");

  const downloadedURL = `https://mint.intuit.com/transactionDownload.event?startDate=${mm}%2F01%2F${yyyy}&endDate=${mm}%2F${dd}%2F${yyyy}&queryNew=&offset=0&filterType=cash&comparableType=8`;
  console.log(downloadedURL);
  const downloadedContent = await page.evaluate(async downloadedURL => {
    const fetchResp = await fetch(downloadedURL, {credentials: 'include'});
    return await fetchResp.text();
  }, downloadedURL);


  fs.writeFileSync(`${__dirname}/input/mint/transactions_input_${mm}${yy}.csv`, downloadedContent);

  await browser.close();  
})();