const EventEmitter = require('events');
const { models } = require('models/sequelize');


const myEmitter = new EventEmitter();

myEmitter.on('transaction', async (amount) => {
    const record = await models.balance.findAll({
        where: {
            accountType: 'accrual'
        }
    })

    const currentAmount = record[0].currentBalance;

    const newAmount = currentAmount + amount;

    const savedRecord = await models.balance.update({ currentBalance: newAmount }, {
        where: {
            id: record[0].id
        }
    });

    
    return savedRecord;
})



// const triggerEvent = () => {
//     myEmitter.emit('my-event', -50)
// }

// triggerEvent();