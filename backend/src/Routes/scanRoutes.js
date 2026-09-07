//importation  des modules
import express from "express"
import if_existUrl from "../middleware/validateScan.js"
import validateTarget from "../middleware/validateTarget.js"
import scanController from "../controllers/scanControlers.js"

///instanciation des routes
const route = express.Router()

route.post('/scan', if_existUrl, validateTarget, scanController)

export default route