console.log('symbol', Symbol() == Symbol())

function init() { }
console.log('symbol profill', Object.create(init.prototype) == Object.create(init.prototype))