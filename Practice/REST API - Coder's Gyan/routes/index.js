import express from "express";
import { registerController, loginController, userController, refreshController, productController } from "../controllers";

import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.post('/register', registerController.register); // we no need to call the register method, as it must be an anonymous function
router.post('/login', loginController.login);
router.get('/me', authenticate, userController.me);
router.post('/refresh', refreshController.refresh);
router.post('/logout', authenticate, loginController.logout);

//Products
router.post('/products', productController.store);


export default router;