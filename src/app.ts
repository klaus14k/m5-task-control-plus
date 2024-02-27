import express, { Application, json } from "express"
import "express-async-errors"
import helmet from "helmet"
import { taskRouter } from "./routers/task.router"
import { categoryRouter } from "./routers/category.router"
import { handleErrors } from "./middlewares/handleErrors.middleware"

export const app: Application = express()

app.use(helmet())
app.use(json())

app.use("/tasks", taskRouter)
app.use("/categories", categoryRouter)

app.use(handleErrors)