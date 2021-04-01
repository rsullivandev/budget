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
    await page.goto('https://example.com');
    await page.waitForTimeout(20000);
    await page.goto(`https://onlinebanking.usbank.com/Auth/Login`);
    await page.waitForSelector('input[name="Username"]');
    console.log("Found username selection");
    await page.type('input[name="Username"]', '1234',);
    await page.type('input[name="Password"]', '12345',);
    await page.waitForTimeout(60000);

    await browser.close();
})();