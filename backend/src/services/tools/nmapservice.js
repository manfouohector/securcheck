import Command from "../../utils/command.js";

const nmapService = async (target) => {
    const url = new URL(target);
    const hostname = url.hostname;
    const port = url.port;

    const args = [];

    if (port) {
        args.push("-p", port);
    }

    args.push(hostname);
    // Normalise l'état des ports retournés par nmap
    const normalizeState = (state) => {
        const s = state.toLowerCase();
        if (s.includes("open")) return "open";
        if (s.includes("closed")) return "closed";
        if (s.includes("filtered")) return "filtered";
        return "unknown";
    };

    // Helper to format a Nmap finding in the common structure
    const formatNmapFinding = (port, target) => ({
        tool: "nmap",
        severity: "info",
        title: `Port ${port.port} ${port.state}`,
        description: `Le port ${port.port}/${port.protocol} est ${port.state}.`,
        target,
        location: `${port.port}/${port.protocol}`,
        metadata: {
            protocol: port.protocol,
            service: port.service
        }
    });

    try {
        const result = await Command("nmap", args);
        // Split output en lignes
        const lines = result.stdout.split("\n");
        // Ne garder que les lignes qui correspondent au format "PORT/PROTO STATE SERVICE"
        const portLines = lines.filter(line => {
            // Exemple typique : "80/tcp   open  http"
            // On accepte uniquement les lignes commençant par un numéro de port
            return /^\d+\/(tcp|udp)\s+\w+/i.test(line.trim());
        });
        // Parser chaque ligne en objet structuré, en étant tolerant aux éventuels champs manquants
        const ports = portLines.map(line => {
            const match = line.trim().match(/^([0-9]+)\/(tcp|udp)\s+(\w+)\s+(.*)?$/);
            if (!match) return null;
            const [, portStr, protocol, state, service = ""] = match;
            return {
                port: Number(portStr),
                protocol,
                state,
                service: service.trim() || "unknown"
            };
        }).filter(Boolean);
        const normalizedPorts = ports.map(p => ({
            ...p,
            state: normalizeState(p.state)
        }));
        const openPorts = normalizedPorts.filter(p => p.state === "open");
        // Build findings using the common structure
        const findings = normalizedPorts.map(p => formatNmapFinding(p, target));
        return { ports: normalizedPorts, openPorts, findings };
    } catch (err) {
        // Propager une erreur claire vers le middleware d'erreur
        throw new Error(`Nmap execution failed: ${err.message}`);
    }

    // Le parsing a été effectué dans le bloc try ci‑dessus. Les lignes suivantes étaient dupliquées et provoquaient des erreurs de portée.
    // Elles ont été supprimées.
};

export default nmapService;