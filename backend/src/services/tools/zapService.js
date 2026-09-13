// zapService.js – exécute OWASP ZAP et retourne des findings structurés
import Command from "../../utils/command.js"; // chemin relatif depuis services/tools

/**
 * Exécute un scan rapide OWASP ZAP sur la cible donnée.
 * @param {string} target – URL à scanner (ex. "https://example.com")
 * @returns {Promise<{findings: Array}>}
 */
const zapService = async (target) => {
  // Utilise le binaire ZAP (défini via ZAP_PATH ou "zap" par défaut)
  // Options : -quickurl <url> -quickout - (JSON sur stdout)
  const args = ["-quickurl", target, "-quickout", "-"];
  const zapBin = process.env.ZAP_PATH || "zap";

  try {
    const { stdout } = await Command(zapBin, args);
    // ZAP renvoie un tableau JSON d'alertes
    const alerts = JSON.parse(stdout);
    const findings = alerts.map((alert) => {
      return {
        tool: "zap",
        severity: alert.risk || "info",
        title: alert.alert || "ZAP finding",
        description: alert.description || "",
        target,
        location: alert.url || "",
        metadata: alert,
      };
    });
    return { findings };
  } catch (err) {
    // Si ZAP ne retourne aucune alerte, il peut renvoyer un code 2 – on traite cela comme aucun résultat
    if (err.message && err.message.includes("code 2")) {
      return { findings: [] };
    }
    // Toute autre erreur : on ne veut pas casser le pipeline, on renvoie un tableau vide
    console.error("ZAP execution failed:", err.message);
    return { findings: [] };
  }
};

export default zapService;
