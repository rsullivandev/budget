const fs = require('fs').promises
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const TOKEN_PATH = 'token.json';

const executeUpload = async () => {
    try {
        const credFile = await fs.readFile('credentials.json');
        authorize(JSON.parse(credFile), uploadFile);
    } catch (err) {
        return console.log('Error loading client secret file:', err);
    }
}

const authorize = async (credentials, callback) => {
    console.log('authorize');
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);



    try {
        const token = await fs.readFile(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    } catch (err) {
        return getAccessToken(oAuth2Client, callback);
    }

}


const getAccessToken = (oAuth2Client, callback) => {
    console.log("get access token");
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retriving access token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

const listFiles = auth => {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
    })
}

const uploadFile = async auth => {

    console.log("UploadFile");

    const drive = google.drive({ version: 'v3', auth });

    const uploadFile = await (await fs.readFile('transactions_output_0321.csv')).toString();
    console.log(uploadFile);


    const response = await drive.files.create({
        requestBody: {
            name: 'Test.csv',
            mimeType: 'application/vnd.google-apps.spreadsheet',
            parents: ['1C0g53n8MEs-vCWpGIkh3gnA7dsw_NC-5']
        },
        media: {
            mimeType: 'application/vnd.google-apps.spreadsheet',
            body: uploadFile
        },
    });

    console.log(response.status);
}

module.exports = {
    executeUpload: executeUpload,
}
