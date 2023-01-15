import { Router } from 'express'
import chatController from '../controller/chatController';

const router = Router();



router.post('/', chatController.createChat);
router.get('/:userId', chatController.userChats);
router.get('/find/:firstId/:secondId', chatController.findChat);





export=router