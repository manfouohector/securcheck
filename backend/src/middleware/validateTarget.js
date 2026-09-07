const validateTarget = (req, res, next) => {
    
    const {type, target} = req.body;
    let url;

    try {
        url = new URL(target)
    } catch (error) {
        error.status = 400
        return next(error)
    }

    //verification des liens githubs
    if(type === "github") {
        const regex_git = /^https?:\/\/github.com\/[a-z0-9\-]{3,}\/[a-z0-9\-]{3,}$/
        if(!regex_git.test(url.href) ) {
            const message =  "lien de votre dossier github invalide : veuillez saisir un lien acceptable"
            
            const error = new Error(message)
            error.status = 400
            return next(error)
        }
    }

    //verification des liens en ligne
    if(type === "website") {
        const regex_webite = /^https?:$/
        if(!regex_webite.test(url.protocol)) {
            const message = "lien de votre site est invalide : veuillez saisir un lien acceptable" 
            
            const error = new Error(message)
            error.status = 400
            return next(error)
        }   
    }

    req.github_owner = url.pathname.split('/')[1]
    req.github_repos = url.pathname.split('/')[2]
    req.git_url      = url
    next()
}

export default validateTarget;