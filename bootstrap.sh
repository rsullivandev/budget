#!/usr/bin/env bash
echo $(date -u)
apt-get update
apt-get install -y curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
source ~/.nvm/nvm.sh
nvm install node
npm i puppeteer