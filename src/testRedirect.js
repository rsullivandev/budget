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
    page.on('console', consoleObj => console.log(consoleObj.text()));


    await page.waitForTimeout(10000);

    otherData = 'rob';

    data = {
        "test": "12345",
        "test2": "5678"
    };

    url = `http://testurl.com/${otherData}`

    const content = await page.evaluate(async ({ url, data }) => {
        const responseFetch = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        // console.log(responseFetch);
        // const jsonObj = await responseFetch.json();
        // const strData = console.log(jsonObj);
        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        //     .then(response => response.json())
        //     .then(json => console.log(json));
        // console.log(url);
        // console.log(JSON.stringify(data));
        // console.log('test');
        return await responseFetch.text();
    }, { url, data })

    console.log(content);

    await page.waitForTimeout(60000);

    await browser.close();
})();