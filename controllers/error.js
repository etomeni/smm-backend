export const get404 = (req, res, next) => {
    const error = new Error(" Not Found.");
    error.statusCode = 404;
    next(error);
}

export const get500 = (error, req, res, next) => {
    const data = error.data;

    return res.status(error.statusCode || 500).json({
        error: {
            message: error.message,
            data: data
        }
    });
}
