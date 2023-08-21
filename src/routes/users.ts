import { Router } from 'express'
import { checkIfAdmin } from '@/middlewares/check-user-admin'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { registerControllerFactory } from '@/controllers/user/factories/make-register-controller-factory'
import { editControllerFactory } from '@/controllers/user/factories/make-edit-controller-factory'
import { deleteControllerFactory } from '@/controllers/user/factories/make-delete-controller-factory'
import { findByIdControllerFactory } from '@/controllers/user/factories/make-find-by-id-controller-factory'
import { getAllControllerFactory } from '@/controllers/user/factories/make-get-all-controller-factory'

const router = Router()

const registerController = registerControllerFactory()
const editController = editControllerFactory()
const deleteController = deleteControllerFactory()
const findByIdController = findByIdControllerFactory()
const getAllController = getAllControllerFactory()

router.post('/users', (req, res, next) => registerController.register(req, res, next))

router.put('/users/:id', verifyJWT, (req, res, next) => editController.edit(req, res, next))

router.delete('/users/:id', verifyJWT, (req, res, next) => deleteController.delete(req, res, next))

router.get('/users/:id', checkIfAdmin, verifyJWT, (req, res, next) => findByIdController.findById(req, res, next))

router.get('/users', checkIfAdmin, (req, res, next) => getAllController.getAll(req, res, next))

export const usersRouter = router
