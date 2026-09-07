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

    const result = await Command("nmap", args);
    const lines = result.stdout.split("\n");
    const portLines = lines.filter((line) => {
        return (
            (line.includes("/tcp") || line.includes("/udp")) &&
            line.trim() !== ""
        );
    });


    const ports = portLines.map((line) => {
    const parts = line.split(/\s+/);

    
    const portParts = parts[0].split("/");

    return {
        port: Number(portParts[0]),
        protocol: portParts[1],
        state: parts[1],
        service: parts[2]
    };
    });

    const openPorts = ports.filter((port) => {
        return port.state === "open";
    });

    return {
        ports,
        openPorts
    };
};

export default nmapService;