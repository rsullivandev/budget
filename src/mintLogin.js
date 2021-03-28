const puppeteer = require('puppeteer');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');

const today = new Date();
let mm = today.getMonth()+1;
mm = mm.toString().padStart(2, '0');
let yyyy = today.getFullYear();
let yy = yyyy.toString().slice(2);
let dd = new Date(yyyy, mm, 0).getDate().toString().padStart(2, '0');

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
  // await page.goto("https://accounts.intuit.com/");
  await page.goto(`https://mint.intuit.com/transaction.event?startDate=${mm}/01/${yy}&endDate=${mm}/${dd}/${yy}`);
  // await page.waitForNavigation();
  await page.waitForSelector('#ius-identifier');
  await page.type('#ius-identifier', `${process.env.email}`, { delay: 100 });
  const [respones1] = await Promise.all([
    // await page.click('#ius-sign-in-submit-btn'),
    page.keyboard.press('Enter'),
    // await page.waitForSelector('#ius-sign-in-mfa-password-collection-current-password');
    page.waitForTimeout(10000)
  ]);
  // await page.click('#ius-sign-in-submit-btn');

  // await page.waitForTimeout(5000);
  await page.type('#ius-sign-in-mfa-password-collection-current-password', `${process.env.pass}`);
  const [response2] = await Promise.all([
    // page.click('#ius-sign-in-mfa-password-collection-continue-btn'),
    page.keyboard.press('Enter'),
    // page.waitForSelector('#transactionExport', { timeout: 120000, waitUntil: 'networkidle0' })
    page.waitForTimeout(15000),
    // page.waitForNavigation()
  ]);
  console.log("pass entered...waiting");
  // await page.waitForTimeout(12000);
  console.log("done waiting, taking screenshot");
  // await page.screenshot({ path: 'example.png' });
  // const cookies = await page.cookies();
  // fs.writeFileSync('session.txt', JSON.stringify(cookies));

  console.log("redirecting to mint");

  const downloadedURL = `https://mint.intuit.com/transactionDownload.event?startDate=${mm}%2F01%2F${yyyy}&endDate=${mm}%2F${dd}%2F${yyyy}&queryNew=&offset=0&filterType=cash&comparableType=8`;
  const downloadedContent = await page.evaluate(async downloadedURL => {
    const fetchResp = await fetch(downloadedURL, {credentials: 'include'});
    return await fetchResp.text();
  }, downloadedURL);

  // console.log(`Downloaded: ${downloadedContent}`)

  fs.writeFileSync(`./input/transactions_input_${mm}${yy}.csv`, downloadedContent);

  await browser.close();
  // await page.goto("https://mint.intuit.com/transactionDownload.event?startDate=03%2F01%2F2021&endDate=03%2F31%2F2021&queryNew=&offset=0&filterType=cash&comparableType=8")
  // await page.waitForTimeout(120000);
  // await page.waitForTimeout(5000);
  // await page.click('#transactionExport');

  // await page.goto('https://jsonplaceholder.typicode.com/todos/1')
  // var innerText = await page.evaluate(() => {
  //   return JSON.parse(document.querySelector('body').innerText);
  // });

  // console.log(innerText);
  // const name = await new Promise((resolve) => {
  //   readline.question("Enter OTP Code: ", answer => {
  //     resolve(answer);
  //     readline.close();
  //   })
  // })

  // console.log(`Your name is ${name}`);

  // Need to figure out the 2 factor Auth. Maybe need to load it once and manually type it in?
  // Once authenticated and at home page. can i just do await.page.goto(<directurlfortransactions>)? Not sure how the authentication is carried over. I guess it is
  // all in one session....


  
})();