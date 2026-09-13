const errorHandlers = (err, req, res, next) => {

    console.log(err.message)

    const status = err.status || 500
    return res.status(status).json({
        statut: false,
        message: status === 500 ? "Une erreur inatendue c'est produite" : err.message
    })
}

export default errorHandlers

