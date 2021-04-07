const puppeteer = require('puppeteer');
const fs = require('fs');
const dh = require('./dateHelper');

const _dh = new dh.dateHelper(new Date());


const mm = _dh.getMonth();
const dd = _dh.getDate();
const yyyy = _dh.getYearFull();
const yy = _dh.getYearShort();

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
    page.on('console', consoleObj => console.log(consoleObj.text()));
    await page.goto('https://example.com');
    await page.waitForTimeout(20000);
    await page.goto(`https://onlinebanking.usbank.com/Auth/Login`);
    await page.waitForSelector('input[name="Username"]');
    console.log("Found username selection");
    await page.type('input[name="Username"]', process.env.USBANKLOGIN);
    await page.type('input[name="Password"]', process.env.USBANKPASS);
    await page.keyboard.press('Enter')
    await page.waitForTimeout(60000);

    const downloadedURL = `https://api.usbank.com/customer-management/servicing/files/v1/downloads`;

    const data = {
        "requestType": {
            "serviceType": "ACCOUNT_TRANSACTION",
            "serviceSubType": "HISTORY_DOWNLOAD"
        },
        "data": {
            "accountToken": "$IJZdzWA3kGW50D3SbdC2Ua9DoGh9DdCirz6EC19zjkk0eRKaCIOxdOLv0IUSw",
            "startTime": `${yyyy}-${mm}-01`,
            "endTime": `${yyyy}-${mm}-${dd}`,
            "fileType": "CSV"
        }
    }

    const downloadedContent = await page.evaluate(async ({ downloadedURL, data }) => {


        const fetchResp = await fetch(downloadedURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        return await fetchResp.text();
    }, { downloadedURL, data });

    console.log(downloadedContent);

    fs.writeFileSync(`${__dirname}/input/usbank/transactions_input_${mm}${yy}.csv`, downloadedContent);


    await browser.close();
})();