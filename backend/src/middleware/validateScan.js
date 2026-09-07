const if_existUrl = (req, res, next) => {

    const {type, target} = req.body

    //verification de l'existance des parametres
    if(!type || !target) {
        const error = new Error("l'url ou le statut est indisponible" )
        error.status = 400

        return next(error)
    }

    //verification du statut du scan
    if(type !== "website" && type !== "github") {
        const error = new Error("Le type doit etre website ou github")
        error.status = 400

        return next(error)
    }

    ///parsons au suivant
    next()
}

export default if_existUrl