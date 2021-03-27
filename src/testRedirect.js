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
    // page.setRequestInterception(true);
    // page.on('request', request => {
    //     if (request.isNavigationRequest() && request.resourceType() === 'document') {
    //         console.log(request.url())
    //     }
    //     request.continue()
    // })
    await page.goto("https://mint.intuit.com/transaction.event?startDate=03/01/2021&endDate=03/31/2021");
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.waitForSelector('#ius-identifier');
    await page.screenshot({ path: 'mint.png' });
    await page.goto("http://example.com");
    await page.screenshot({ path: 'example.png' });
    await page.goto("http://google.com");
    await page.screenshot({ path: 'google.png' });
    //   const response = await page.goto("http://example.com");
    //   const chain = response.request().redirectChain();
    //   console.log(chain.length);
    //   console.log(chain);

    await browser.close();
})();