// testSsrFBlock.js – vérifie que les cibles internes (IP privées / localhost) sont bloquées
// Utilise le fetch natif de Node (v18+) – aucune dépendance externe requise

const run = async () => {
  console.log("--- Test SSRF – cible interne (127.0.0.1) ---");
  try {
    const res = await fetch("http://localhost:3000/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "website", target: "http://127.0.0.1:22" })
    });
    const data = await res.json();
    console.log("Statut HTTP :", res.status);
    console.log("Réponse :", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Erreur réseau :", e.message);
  }
};

run();
