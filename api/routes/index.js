const { middlewareHere } = require('../middleware/index.js');

module.exports = (app) => {
    const cUser = require('../controllers/user.js');
    const cVoucher = require('../controllers/voucher.js');
    const cAdmin = require('../controllers/admin.js');
    const cPurchase = require('../controllers/purchase.js');
    const cPlace = require('../controllers/place.js');
    const cTransaction = require('../controllers/transaction.js');
    const cEmployee = require('../controllers/employee.js');

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

    app.get('/purchases', middlewareHere, cPurchase.list);
    app.post('/purchase', middlewareHere, cPurchase.create);
    app.patch('/purchase', middlewareHere, cPurchase.update);
    app.delete('/purchase', middlewareHere, cPurchase.delete);

    app.get('/places', middlewareHere, cPlace.list);
    app.post('/place', middlewareHere, cPlace.create);
    app.patch('/place', middlewareHere, cPlace.update);
    app.delete('/place', middlewareHere, cPlace.delete);

    app.get('/employees', middlewareHere, cEmployee.list);
    app.post('/employee', middlewareHere, cEmployee.create);
    app.patch('/employee', middlewareHere, cEmployee.update);
    app.delete('/employee', middlewareHere, cEmployee.delete);

    app.get('/transactions', middlewareHere, cTransaction.list);
    app.post('/transaction', middlewareHere, cTransaction.create);
    app.patch('/transaction', middlewareHere, cTransaction.update);
    app.delete('/transaction', middlewareHere, cTransaction.delete);

}