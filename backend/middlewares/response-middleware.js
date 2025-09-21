
const responseMiddleware = (req, res, next) => {
    res.json({
        message: res.locals.message,
        success: res.locals.success,
        data: res.locals.data,
    });
};

export { responseMiddleware };