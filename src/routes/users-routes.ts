import { Router } from 'express'
import registerController from '@/controllers/users-controllers/users-controller'

const router = Router()

router.get('/users', (req, res) => registerController.getAll(req, res))
router.get('/users/:id', (req, res) => registerController.find(req, res))
router.put('/users/:id', (req, res) => registerController.edit(req, res))
router.post('/users', (req, res) => registerController.register(req, res))
router.delete('/users/:id', (req, res) => registerController.delete(req, res))

export const usersRouter = router
