// const dh = require(`${__dirname}/dateHelper`);
const dh = require(`dateHelper`);

console.log(`${__dirname}`);


test('check date returned - February', () => {
    const myDate = new Date("02/01/2021");
    const _dh = new dh.dateHelper(myDate);
    expect(_dh.getDate()).toBe('28');
    expect(_dh.getMonth()).toBe('02');
    expect(_dh.getYearFull()).toBe(2021);
    expect(_dh.getYearShort()).toBe('21');
});

test('check date returned - October', () => {
    const myDate = new Date("10/01/2021");
    const _dh = new dh.dateHelper(myDate);
    expect(_dh.getDate()).toBe('31');
    expect(_dh.getMonth()).toBe('10');
    expect(_dh.getYearFull()).toBe(2021);
    expect(_dh.getYearShort()).toBe('21');
});

