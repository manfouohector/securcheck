//importation des services
import websiteScan from "./websiteScanService.js"
import githubscan from "./githubScanService.js"

const scanServices = async (type, target) => {
    
    if(type === 'website') {
        return await websiteScan(target)
    }

    if(type === 'github') {
       return githubscan(target)
    }
}

export default scanServices