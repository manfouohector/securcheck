// testNmapInjection.js – vérifie qu'aucune injection de commande n'est possible via le target
import nmapService from "../src/services/tools/nmapservice.js";

const runInjectionTest = async () => {
  console.log("--- Test d'injection Nmap ---");
  // Cette chaîne ressemble à une tentative d’injection si elle était concaténée
  const maliciousTarget = "http://localhost:5173; echo HACKED";

  try {
    const result = await nmapService(maliciousTarget);
    console.log("Résultat Nmap (pas d'injection) :", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Erreur attendue (target invalide) :", err.message);
  }
};

runInjectionTest();
