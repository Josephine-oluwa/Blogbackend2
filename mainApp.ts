import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import {HTTP, mainError} from "./errors/mainError"
import {errorHandler} from "./errors/ErrorHandler"
import auth from "./Router/AuthRouter"

export const mainApp = (app: Application)=> {
  app.use(express.json())
  app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }))


  app.get("/", (req: Request, res: Response) => {
    res.status(HTTP.OK).json ({
      message: "awesome experience"
    })
  })

  app.use("/api/v1/", auth)

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next (
      new mainError({
        name: "Request Error",
        message: `the message request ${req.originalUrl} URL is not correct`,
        status: HTTP.BAD_REQUEST,
        success: false 
      })
    )
  })
app.use(errorHandler)
}

