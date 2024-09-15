export default function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Set a default status code and message
    let statusCode = 500;
    let message = 'Internal Server Error';

    // Check for specific error types and set appropriate status codes
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    } else if (err.name === 'NotFoundError') {
        statusCode = 404;
        message = err.message;
    }

    // Send the error response
    res.status(statusCode).json({ error: message });
}