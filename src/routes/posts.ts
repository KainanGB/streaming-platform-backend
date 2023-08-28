import { Router } from 'express'
import { createPostControllerFactory } from '@/controllers/post/factories/make-create-controller-factory'
import { deletePostControllerFactory } from '@/controllers/post/factories/make-delete-controller-factory'
import { editPostControllerFactory } from '@/controllers/post/factories/make-edit-controller-factory'
import { getAllPostControllerFactory } from '@/controllers/post/factories/make-get-all-controller-factory'
import { getAllPostByUserIdControllerFactory } from '@/controllers/post/factories/make-get-all-by-user-id-controller-factory'

const router = Router()

const createPostController = createPostControllerFactory()
const deletePostController = deletePostControllerFactory()
const editPostController = editPostControllerFactory()
const getAllPostController = getAllPostControllerFactory()
const getAllPostsByUserIdController = getAllPostByUserIdControllerFactory()

router.post('/posts', (req, res, next) => createPostController.execute(req, res, next))
router.delete('/posts/:id', (req, res, next) => deletePostController.execute(req, res, next))
router.put('/posts/:id', (req, res, next) => editPostController.execute(req, res, next))
router.get('/posts', (req, res, next) => getAllPostController.execute(req, res, next))
router.get('/posts/:userId', (req, res, next) => getAllPostsByUserIdController.execute(req, res, next))

export const postRoutes = router
