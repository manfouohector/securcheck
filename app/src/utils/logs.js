// Liste des logs : chaque log possède un id, un timestamp, un type/niveau et un message
    // Quand vous ferez votre fetch / WebSocket / EventSource, il vous suffira de faire :
    // setLogs((prevLogs) => [...prevLogs, nouveauLog])
    const Logs = [
        {
            id: 1,
            timestamp: "14:32:01",
            type: "info",
            message: "Initialisation du moteur d'audit SecurCheck..."
        },
        {
            id: 2,
            timestamp: "14:32:03",
            type: "info",
            message: "Connexion au dépôt cible réussie. Clonage de l'arborescence..."
        },
        {
            id: 3,
            timestamp: "14:32:05",
            type: "success",
            message: "248 fichiers analysés et indexés pour l'audit."
        },
        {
            id: 4,
            timestamp: "14:32:08",
            type: "info",
            message: "Démarrage de l'analyse des dépendances (package.json / lockfile)..."
        },
        {
            id: 5,
            timestamp: "14:32:12",
            type: "warning",
            message: "[CVE-2023-26136] Dépendance vulnérable détectée : tough-cookie < 4.1.3 (Sévérité : Moyenne)"
        },
        {
            id: 6,
            timestamp: "14:32:15",
            type: "info",
            message: "Inspection des variables d'environnement et détection de fuites de secrets..."
        },
        {
            id: 7,
            timestamp: "14:32:18",
            type: "success",
            message: "Aucune clé API ou mot de passe en clair détecté dans le code source."
        },
        {
            id: 8,
            timestamp: "14:32:22",
            type: "info",
            message: "Recherche de vulnérabilités OWASP Top 10 (Injections SQL, XSS, CSRF)..."
        },
        {
            id: 9,
            timestamp: "14:32:27",
            type: "warning",
            message: "Attention : Échappement insuffisant détecté dans le template 'src/components/Report.jsx' (Ligne 42)."
        },
        {
            id: 10,
            timestamp: "14:32:31",
            type: "info",
            message: "Contrôle des configurations SSL/TLS et des headers HTTP de sécurité..."
        }
    ]

    export default Logs