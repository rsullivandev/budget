const myEmitter = require('utils/emitter.js');
const updateAccrual = require('services/adjustAccrual.js');

myEmitter.on('transaction', updateAccrual)