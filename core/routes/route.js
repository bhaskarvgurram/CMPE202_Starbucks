let authservice = require('../services/authservice').router;
let userservice = require('../services/userservice').router;
let orderservice = require('../services/orderservice').router;
let cardservice = require('../services/cardservice');
let jwt = require('../commons/jwt');
module.exports = (express) => {
    let versionRouter = express.Router();

    /* Auth Routes */
    versionRouter.post('/auth/signin', authservice.signin);
    versionRouter.post('/auth/signup', authservice.signup);
    /* Auth Routes */


    /* User Routes */
    versionRouter.get('/users/:userId', userservice.read);
    versionRouter.put('/users/:userId', userservice.update);
    /* User Routes */


    /* Manage Cards Routes */
    versionRouter.get('/users/:userId/cards', cardservice.getCards);
    versionRouter.get('/users/:userId/cards/:cardId', cardservice.read);
    versionRouter.post('/users/:userId/cards', cardservice.addCard);
    versionRouter.put('/users/:userId/cards/:cardId/reload', cardservice.reloadCard);
    versionRouter.delete('/users/:userId/cards/:cardId', cardservice.deleteCard);
    /* Manage Cards Routes */


    /* Manage Order Routes */
    versionRouter.post('/items', orderservice.addItem);
    versionRouter.get('/items', orderservice.readItems);
    versionRouter.get('/items/:itemId', orderservice.readOneItem);
    versionRouter.get('/orders/:orderId', orderservice.readOrder);
    versionRouter.post('/orders', orderservice.manageOrder);
    versionRouter.delete('/orders/:orderId', orderservice.deleteOrder);
    /* Manage Order Routes */


    /* Payment Routes */
    versionRouter.post('/orders/:orderId/pay', orderservice.checkoutOrder);
    versionRouter.get('/users/:userId/orders', orderservice.getMyOrders);
    /* Payment Routes */

    


    return versionRouter;
}