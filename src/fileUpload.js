const fs = require('fs').promises
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const TOKEN_PATH = `${__dirname}/token.json`;

const executeUpload = async (combinedData, fileName) => {
    try {
        const credFile = await fs.readFile(`${__dirname}/credentials.json`);
        authorize(JSON.parse(credFile), uploadFile, combinedData, fileName);
    } catch (err) {
        return console.log('Error loading client secret file:', err);
    }
}

const authorize = async (credentials, callback, data, fileName) => {
    console.log('authorize');
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    try {
        const token = await fs.readFile(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, data, fileName);
    } catch (err) {
        return getAccessToken(oAuth2Client, callback, data, fileName);
    }

}


const getAccessToken = (oAuth2Client, callback, data, fileName) => {
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
            callback(oAuth2Client, data, fileName);
        });
    });
}

const uploadFile = async (auth, data, fileName) => {

    console.log("UploadFile");
    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.create({
        requestBody: {
            name: fileName,
            mimeType: 'application/vnd.google-apps.spreadsheet',
            parents: ['1C0g53n8MEs-vCWpGIkh3gnA7dsw_NC-5']
        },
        media: {
            mimeType: 'application/vnd.google-apps.spreadsheet',
            body: data
        },
    });

    console.log(response.status);
}

module.exports = {
    executeUpload: executeUpload,
}
