import { Router } from 'express'
import postController from '../controller/postController';

const router = Router();



// router.get('/admin/allpost',postController.getAllPost)
router.get('/:id', postController.getPost);
router.post('/', postController.createPost);
router.put('/:id/like', postController.likePost);
router.post('/comment/:id', postController.addComment);
router.get('/allComment/:id', postController.allComment);
router.get('/save/post', postController.savePost)
router.get("/save/allPost/:id", postController.allSavedPost);
router.post('/report/:id', postController.reportPost);
router.post('/edit/post',postController.editPost)




export=router