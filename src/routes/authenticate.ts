import { Router } from 'express'
import { authenticateControllerFactory } from '@/factories/authenticate-controller-factory'

const router = Router()

const authenticateController = authenticateControllerFactory()

router.post('/sessions', (req, res) => authenticateController.authenticate(req, res))

export const authenticateRoutes = router
