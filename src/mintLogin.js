const puppeteer = require('puppeteer');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

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
  await page.goto("https://mint.intuit.com/transaction.event?startDate=03/01/2021&endDate=03/31/2021");
  // await page.waitForNavigation();
  await page.waitForSelector('#ius-identifier');
  await page.type('#ius-identifier', `${process.env.email}`, { delay: 100 });
  const [respones1] = await Promise.all([
    await page.click('#ius-sign-in-submit-btn'),
    // await page.waitForSelector('#ius-sign-in-mfa-password-collection-current-password');
    await page.waitForTimeout(10000)
  ]);
  // await page.click('#ius-sign-in-submit-btn');

  // await page.waitForTimeout(5000);
  await page.type('#ius-sign-in-mfa-password-collection-current-password', `${process.env.pass}`);
  const [response2] = await Promise.all([
    page.click('#ius-sign-in-mfa-password-collection-continue-btn'),
    // page.waitForSelector('#transactionExport', { timeout: 120000, waitUntil: 'networkidle0' })
    await page.waitForTimeout(60000)
  ]);
  console.log("pass entered...waiting");
  // await page.waitForTimeout(12000);
  console.log("done waiting, taking screenshot");
  await page.screenshot({ path: 'example.png' });
  console.log("redirecting to mint");
  await page.waitForTimeout(5000);
  await page.click('#transactionExport');

  // await page.goto('https://jsonplaceholder.typicode.com/todos/1')
  // var innerText = await page.evaluate(() => {
  //   return JSON.parse(document.querySelector('body').innerText);
  // });

  // console.log(innerText);
  const name = await new Promise((resolve) => {
    readline.question("Enter OTP Code: ", answer => {
      resolve(answer);
      readline.close();
    })
  })

  console.log(`Your name is ${name}`);

  // Need to figure out the 2 factor Auth. Maybe need to load it once and manually type it in?
  // Once authenticated and at home page. can i just do await.page.goto(<directurlfortransactions>)? Not sure how the authentication is carried over. I guess it is
  // all in one session....


  await browser.close();
})();