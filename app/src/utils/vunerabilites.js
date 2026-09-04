    // Liste d'exemples de vulnérabilités
    const initialVulnerabilities = [
        {
            id: 1,
            gravite: "Critique",
            type: "Injection SQL (CWE-89)",
            fichier: "src/api/auth.js:42",
            description: "Concaténation directe de paramètres utilisateurs non échappés dans une requête SQL d'authentification.",
            remediation: "Utiliser des requêtes préparées avec paramètres de liaison (Prepared Statements) ou un ORM sécurisé."
        },
        {
            id: 2,
            gravite: "Critique",
            type: "Secret exposé (CWE-798)",
            fichier: "server/config/keys.env:14",
            description: "Clé d'API Stripe et token JWT privé de production committés en clair dans le code source.",
            remediation: "Révoquer immédiatement la clé, utiliser des variables d'environnement injectées via un gestionnaire de secrets (KMS/Vault)."
        },
        {
            id: 3,
            gravite: "Élevée",
            type: "Cross-Site Scripting - XSS (CWE-79)",
            fichier: "src/components/UserProfile.jsx:78",
            description: "Rendu direct de données utilisateur via 'dangerouslySetInnerHTML' sans assainissement préalable.",
            remediation: "Nettoyer systématiquement les entrées avec la bibliothèque DOMPurify ou utiliser le rendu JSX standard."
        },
        {
            id: 4,
            gravite: "Élevée",
            type: "Path Traversal (CWE-22)",
            fichier: "server/routes/download.js:29",
            description: "Nom de fichier fourni par le client transmis directement au système de fichiers sans validation de chemin ('../').",
            remediation: "Valider avec path.resolve() et restreindre l'accès exclusivement au sous-dossier autorisé."
        },
        {
            id: 5,
            gravite: "Moyenne",
            type: "Configuration CORS laxiste (CWE-942)",
            fichier: "server/app.js:33",
            description: "L'en-tête 'Access-Control-Allow-Origin' utilise le caractère générique '*' avec support des credentials.",
            remediation: "Définir une liste blanche stricte de domaines autorisés et rejeter les origines non reconnues."
        },
        {
            id: 6,
            gravite: "Moyenne",
            type: "Hachage déprécié (CWE-328)",
            fichier: "src/utils/crypto.js:15",
            description: "Utilisation de MD5 pour le hachage des mots de passe utilisateurs, sujet aux attaques par dictionnaire.",
            remediation: "Migrer vers un algorithme de dérivation de clé robuste et salé tel qu'Argon2id ou bcrypt (facteur >= 12)."
        },
        {
            id: 7,
            gravite: "Faible",
            type: "En-têtes HTTP de sécurité absents",
            fichier: "server/middleware/headers.js:8",
            description: "Absence de l'en-tête 'Content-Security-Policy' (CSP) et de 'X-Frame-Options' sur les pages publiques.",
            remediation: "Configurer les en-têtes de sécurité recommandés (Helmet pour Express ou équivalent Nginx)."
        }
    ];

    export default initialVulnerabilities