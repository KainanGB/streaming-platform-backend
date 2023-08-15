import { Router } from 'express'
import { userControllerFactory } from '@/factories/user-controller-factory'

const router = Router()

const usersController = userControllerFactory()

router.get('/users', (req, res) => usersController.getAll(req, res))
router.get('/users/:id', (req, res) => usersController.findById(req, res))
router.put('/users/:id', (req, res) => usersController.edit(req, res))
router.post('/users', (req, res) => usersController.register(req, res))
router.delete('/users/:id', (req, res) => usersController.delete(req, res))

export const usersRouter = router
