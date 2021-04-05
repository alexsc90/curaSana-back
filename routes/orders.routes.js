const {Router} = require('express');
const router = new Router();
const orderController = require('../controllers/orderController')
const auth = require('../middleware/auth')
/* const {check} = require('express-validator') */

router.get('/pedidos', 
 /*  auth, */
  orderController.allOrders
);

router.post('/pedidos',
  /* auth, */
  /* [
    check('products', 'Agrega productos para realizar el pedido').not().isEmpty()
  ],  */
  orderController.createOrder
);

router.get('/pedidos/:id',
  auth,
  orderController.orderDetails
);

router.put('/pedidos/:id', 
  auth,
  /* [
  check('products', 'Agrega productos para realizar el pedido').not().isEmpty()
  ],  */
  orderController.updateOrder
);

router.delete('/pedidos/:id',
  auth,
  orderController.deleteOrder
);

module.exports = router