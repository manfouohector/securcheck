const validateTarget = (req, res, next) => {
    
    // Utilisation du log pour debugger le mode d'exécution
    console.log('ENV:', process.env.NODE_ENV);
    const {type, target} = req.body;
    let url;

    try {
    url = new URL(target);
    // ---- Validation SSRF : bloquer les adresses locales ou privées en production ----
    const hostname = url.hostname;
    const isPrivate = (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
      hostname.startsWith('169.254.') // link‑local
    );
    // Autoriser les IP privées en mode développement (NODE_ENV !== 'production')
    if (isPrivate && process.env.NODE_ENV === 'production') {
      const err = new Error('Cible interdite : adresse IP privée ou localhost');
      err.status = 400;
      return next(err);
    }
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
        // Vérification du protocole du site web (http ou https uniquement)
        if (!['http:', 'https:'].includes(url.protocol)) {
            const message = "L'URL du site doit commencer par http:// ou https://";
            const error = new Error(message);
            error.status = 400;
            return next(error);
        }
    }

    req.github_owner = url.pathname.split('/')[1]
    req.github_repos = url.pathname.split('/')[2]
    req.git_url      = url
    next()
}

export default validateTarget;