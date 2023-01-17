import { Router } from 'express'
import userController from '../controller/userController';

const router = Router();




router.get('/', userController.getAllUsers);
router.get('/:id',userController.getUserData)
router.patch('/:id', userController.updateUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unFollow);
router.post('/comment/:id', userController.addComment);
router.get('/following/:id', userController.getFollowing);
router.get('/deletePost/:id', userController.deletePost);



export=router