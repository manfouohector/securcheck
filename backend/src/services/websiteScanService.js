import nmapService from "./tools/nmapService.js";
import zapService from "./tools/zapService.js";
import nucleiService from "./tools/nucleiService.js"; // new import

const websiteScan = async (target) => {

    // Run Nmap, Nuclei and ZAP scans concurrently
    const [nmapResult, nucleiResult, zapResult] = await Promise.all([
        nmapService(target),
        nucleiService(target),
        zapService(target)
    ]);

    const results = {
        target,
        nmap: nmapResult,
        nuclei: nucleiResult, // contains { findings: [...] }
        zap: zapResult,
        testssl: null
    };

    return results;
}

export default websiteScan