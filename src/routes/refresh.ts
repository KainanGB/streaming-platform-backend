import { refreshControllerFactory } from '@/controllers/user/factories/make-refresh-controller-factory'
import { Router } from 'express'

const router = Router()

const authenticateController = refreshControllerFactory()

router.post('/refresh', (req, res, next) => authenticateController.refresh(req, res, next))

export const refreshRoutes = router
