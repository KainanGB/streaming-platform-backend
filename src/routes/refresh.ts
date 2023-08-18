import { Router } from 'express'
import { refreshControllerFactory } from '@/factories/refresh-controller-factory'

const router = Router()

const authenticateController = refreshControllerFactory()

router.post('/refresh', (req, res) => authenticateController.refresh(req, res))

export const refreshRoutes = router
