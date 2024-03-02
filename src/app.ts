import express, { Application, json } from "express"
import "express-async-errors"
import cors from "cors"
import helmet from "helmet"
import { taskRouter } from "./routers/task.router"
import { categoryRouter } from "./routers/category.router"
import { handleErrors } from "./middlewares/handleErrors.middleware"
import { userRouter } from "./routers/user.router"

export const app: Application = express()

app.use(cors())
app.use(helmet())
app.use(json())

app.use("/tasks", taskRouter)
app.use("/categories", categoryRouter)
app.use("/users", userRouter)

app.use(handleErrors)