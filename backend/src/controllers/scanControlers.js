//importation des models et services
import scanServices from "../services/scanServices.js"

const scanController = async (req, res) => {

    const {type, target} = req.body
    const result = await scanServices(type, target)

    res.json(result)

}


export default scanController