import {
    Router
} from "express";
import {
    smesRouter
} from './smes'
import {
    userRouter
} from './users'

const router = Router()

router.use('/api/smes', smesRouter)
router.use('/api/users', userRouter)

export { router }