module.exports = (req, res, next) => {
    const file = req.file
    if (!file){
        const error = new Error("Seleccionar una imagen")
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
}