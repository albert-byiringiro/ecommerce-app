export default function errorHandler(err, req, res, next) {
    console.error(err.stack)

    let statusCode = 500
    let message = "Internal Server Error"

    if (err.name === "ValidationError") {
        statusCode = 400
        message = err.message
    } else if (err.name === 'NotFoundError') {
        statusCode = 404
        message = err.message
    }

    res.status(statusCode).json({ error: message })
}