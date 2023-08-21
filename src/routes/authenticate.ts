import { Router } from 'express'
import { authenticateControllerFactory } from '@/controllers/user/factories/make-authenticate-controller-factory'

const router = Router()

const authenticateController = authenticateControllerFactory()

router.post('/sessions', (req, res, next) => authenticateController.authenticate(req, res, next))

export const authenticateRoutes = router
