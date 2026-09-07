//importation des modules 
import express from "express"
import errorHandlers from "./src/middleware/errorhandlers.js"
import scanRoutes from "./src/Routes/scanRoutes.js"
import Command from "./src/utils/command.js"
import nmapService from "./src/services/tools/nmapservice.js"

//instantation de l'application
const app = express()

//middleware
app.use(express.json())
app.use('/api',scanRoutes)
//route temporaire
app.get("/test-command", async (req, res, next) => {

    try {
        const result = await nmapService("http://localhost:5173");

        res.json(result);
    } catch (error) {
        next(error);
    }

});

app.use(errorHandlers)

app.listen(3000,() => {
    console.log("Application lance au port 3000")
})