const puppeteer = require('puppeteer');

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
  // await page.type('#ius-identifier', 'env.email', { delay: 100 });
  // await page.click('#ius-sign-in-submit-btn')
  // await page.waitForSelector('#ius-sign-in-mfa-password-collection-current-password');
  // await page.waitForTimeout(20000);
  // await page.type('#ius-sign-in-mfa-password-collection-current-password', 'env.pass');
  // await page.click('#ius-sign-in-mfa-password-collection-continue-btn');
  // await page.waitForTimeout(20000);
  // await page.screenshot({ path: 'example.png' });

  await page.goto('https://jsonplaceholder.typicode.com/todos/1')
  var innerText = await page.evaluate(() =>  {
    return JSON.parse(document.querySelector('body').innerText);
  });

  console.log(innerText);



// Need to figure out the 2 factor Auth. Maybe need to load it once and manually type it in?
// Once authenticated and at home page. can i just do await.page.goto(<directurlfortransactions>)? Not sure how the authentication is carried over. I guess it is
// all in one session....


  await browser.close();
})();