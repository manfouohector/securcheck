import { spawn } from "child_process";

/**
 * Execute une commande système de façon sécurisée.
 * Utilise `spawn` avec un tableau d'arguments afin d'éviter toute concaténation
 * de chaîne qui pourrait mener à une injection de commande.
 *
 * @param {string} command - Le binaire à exécuter (ex. "nmap").
 * @param {string[]} args - Tableau d'arguments passés séparément.
 * @param {number} [timeout=30000] - Timeout en millisecondes (30 s par défaut).
 * @returns {Promise<{stdout:string,stderr:string}>}
 *          Résout avec la sortie stdout et stderr quand le processus se termine
 *          avec le code 0. En cas d'erreur ou de code non‑zéro, le rejet contient
 *          un message explicite incluant `stderr`.
 */
const Command = (command, args, timeout = 30000) => {
    return new Promise((resolve, reject) => {
        // Lancement du processus
        const proc = spawn(command, args);

        // Gestion du timeout
        const timer = setTimeout(() => {
            proc.kill();
            reject(new Error("Le processus a dépassé le délai autorisé"));
        }, timeout);

        let stdout = "";
        let stderr = "";

        proc.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        proc.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        // Erreur au niveau du processus (ex. commande introuvable)
        proc.on("error", (err) => {
            clearTimeout(timer);
            reject(err);
        });

        // Fin du processus
        proc.on("close", (code) => {
            clearTimeout(timer);
            if (code === 0) {
                resolve({ stdout, stderr });
            } else {
                // Inclure stderr pour faciliter le diagnostic
                const message = `Le processus s'est terminé avec le code ${code}: ${stderr.trim()}`;
                reject(new Error(message));
            }
        });
    });
};

export default Command;