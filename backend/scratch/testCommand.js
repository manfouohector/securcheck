// Petit script de test pour le wrapper Command
import Command from "../src/utils/command.js"; // chemin relatif depuis le répertoire backend

const runTests = async () => {
  console.log("--- Test 1 : commande existante (node -v) ---");
  try {
    const { stdout } = await Command("node", ["-v"]);
    console.log("Résultat :", stdout.trim());
  } catch (e) {
    console.error("Erreur :", e.message);
  }

  console.log("\n--- Test 2 : commande inexistante ---");
  try {
    await Command("command_qui_n_existe_pas", []);
  } catch (e) {
    console.error("Erreur attendue :", e.message);
  }

  console.log("\n--- Test 3 : timeout (ping -n 10 127.0.0.1) avec timeout=2000ms ---");
  try {
    await Command("ping", ["-n", "10", "127.0.0.1"], 2000);
  } catch (e) {
    console.error("Timeout ou autre erreur attendue :", e.message);
  }
};

runTests();
