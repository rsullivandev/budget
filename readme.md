# Budget App #

This app uses Puppeteer to fetch transactions from Mint and various banks, categorizes them via various rules and then uploads to an attached Google spreadsheet.

## Banks ##
Currently Mint and US Bank are supported. Provide credentials in the .env file under \<BANK>USER and \<BANK>PASS. For best results, log in to the account normally first to cache any 2FA challenges.

## Category Rules ##
Rules are captured per bank and are currently included in the files /src/\<BANK>CategoryRules.js. It's recommended to pick a handful of budget categories to return. These will be listed as budget line items in the final spreadsheet

## Drive Upload ##
The first time this is run, you'll need to approve the budget application to integrate with Google Drive. Just visit the requested URL and follow the prompts. After allowing it, a token file will be saved to your local filesystem and the output flie will be uploaded.

## Budget ##
The above steps will compile a list of the month's transactions in a single file to your associated Google Drive file. From there, it's trivial to create a pivot chart and / or copy into whatever budget sheet currently be used.