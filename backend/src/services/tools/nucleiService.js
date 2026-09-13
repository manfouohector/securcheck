// nucleiService.js – exécute Nuclei et retourne des findings structurés
import Command from "../../utils/command.js"; // chemin relatif depuis services/tools

/**
 * Exécute Nuclei sur la cible donnée.
 * @param {string} target – URL à scanner (ex. "https://example.com")
 * @returns {Promise<{findings: Array}>}
 */
const nucleiService = async (target) => {
  // Arguments recommandés : -u <url> -json -silent -t <templates>
  const args = ["-u", target, "-json", "-silent", "-t", `${process.env.APPDATA}\\nuclei\\templates`];
  console.log('[DEBUG] Nuclei args:', args);
  console.log('[DEBUG] Using binary:', process.env.NUCLEI_PATH || (process.platform === 'win32' ? 'nuclei.exe' : 'nuclei'));

  try {
    const defaultBin = process.platform === "win32" ? "nuclei.exe" : "nuclei";
    const nucleiBin = process.env.NUCLEI_PATH || defaultBin;
    const { stdout } = await Command(nucleiBin, args);
    // Nuclei écrit chaque finding sur une ligne JSON distincte
    const lines = stdout.trim().split(/\r?\n/).filter(Boolean);
    const findings = lines.map((line) => {
      try {
        const obj = JSON.parse(line);
        return {
          tool: "nuclei",
          severity: obj.info?.severity || "info",
          title: obj.info?.name || obj.template?.id || "Nuclei finding",
          description: obj.info?.description || "",
          target,
          location: obj["matched-at"] || "",
          metadata: obj
        };
      } catch (e) {
        return {
          tool: "nuclei",
          severity: "info",
          title: "Parsing error",
          description: `Impossible de parser la ligne JSON : ${e.message}`,
          target,
          location: "",
          raw: line
        };
      }
    });
    return { findings };
  } catch (err) {
    // Nuclei returns exit code 2 when no findings are detected – treat as empty result
    if (err.message && err.message.includes('code 2')) {
      return { findings: [] };
    }
    throw new Error(`Nuclei execution failed: ${err.message}`);
  }
};

export default nucleiService;
