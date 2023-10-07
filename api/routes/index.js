const { middlewareHere } = require('../middleware/index.js');

module.exports = (app) => {
    const cUser = require('../controllers/user.js');
    const cVoucher = require('../controllers/voucher.js');
    const cAdmin = require('../controllers/admin.js');
    const cBank = require('../controllers/bank.js');
    const cPlace = require('../controllers/place.js');
    // const prices = require('../controllers/price.js');

    app.get('/users', middlewareHere, cUser.list);
    app.post('/user', middlewareHere, cUser.create);
    app.post('/user/login', middlewareHere, cUser.login);
    app.patch('/user', middlewareHere, cUser.update);
    app.delete('/user', middlewareHere, cUser.delete);

    app.get('/admins', middlewareHere, cAdmin.list);
    app.post('/admin', middlewareHere, cAdmin.create);
    app.post('/admin/login', middlewareHere, cAdmin.login);
    app.patch('/admin', middlewareHere, cAdmin.update);
    app.delete('/admin', middlewareHere, cAdmin.delete);

    app.get('/vouchers', middlewareHere, cVoucher.list);
    app.post('/voucher', middlewareHere, cVoucher.create);
    app.patch('/voucher', middlewareHere, cVoucher.update);
    app.delete('/voucher', middlewareHere, cVoucher.delete);

    app.get('/banks', middlewareHere, cBank.list);
    app.post('/bank', middlewareHere, cBank.create);
    app.patch('/bank', middlewareHere, cBank.update);
    app.delete('/bank', middlewareHere, cBank.delete);


}