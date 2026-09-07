import nmapService from "./tools/nmapService.js";

const websiteScan = async (target) => {

    const result = await nmapService(target);
    
    const results = {
        target,
        nmap: result,
        zap: null,
        testssl: null,
        nuclei: null
    };

    return results
}

export default websiteScan