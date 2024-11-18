import {Router, Request, Response} from "express";
import {db} from "../db/db";
import {getVideos} from "./getVideos";
import {availableResolutionsFieldValidator, titleFieldValidator} from "../validation/field-validator";
import {errorResponse} from "../validation/errorResponse";

export const videoRouter = Router()

export const videoController = {
    getVideos (req: Request, res: Response) {
        const videos = db.videos // получаем видео из бд
        res.status(200).json(videos)
    },
    creteVideo (req: Request, res: Response)  {
        const title = req.body.title
        const availableResolutions = req.body.availableResolutions

        const errorsArray: Array<{ field: string; message: string }> = []
        titleFieldValidator(title, errorsArray)
        availableResolutionsFieldValidator(availableResolutions, errorsArray)

        if (errorsArray.length > 0) {
            const errors_ = errorResponse(errorsArray)
            res.status(400).send(errors_)
            return
        }

        // если все ок, то добавляем видео
        const video = {
            ...req.body,
            id: Date.now() + Math.random(),
            //...
        }

        db.videos = [...db.videos, video]
        res.status(201).json(video)
    },
    updateVideo(){}
}

// videoRouter.get('/', getVideos)
videoRouter.get('/', videoController.getVideos)
videoRouter.post('/', videoController.creteVideo)
videoRouter.put('/:id', videoController.updateVideo)