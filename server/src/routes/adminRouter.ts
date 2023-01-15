import { Router } from 'express'
import adminController from '../controller/adminController';

const router = Router();


router.get('/users',adminController.getAllUsers)
router.get('/posts', adminController.getAllPost)
router.get('/block/:id', adminController.blockUser);
router.patch('/block/:id', adminController.unBlockUser);
router.get('/dashboard',adminController.dashboard)






export=router