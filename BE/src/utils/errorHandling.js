import { ModifyError } from "./classError.js"


export const asyncHandler = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(error => {
            return next(new ModifyError(error, 500))

        })
    }
}

export const globalErrorHandling = (error, req, res, next) => {
    return res.status(error.status || 400).json({ message: error.message,status:error.status })
}