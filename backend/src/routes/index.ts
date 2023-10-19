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

router.use('/smes', smesRouter)
router.use('/users', userRouter)

export { router }