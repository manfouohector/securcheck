//importation des modules 
import express from "express"
import errorHandlers from "./src/middleware/errorhandlers.js"
import scanRoutes from "./src/Routes/scanRoutes.js"
import Command from "./src/utils/command.js"
import nmapService from "./src/services/tools/nmapservice.js"

import dotenv from "dotenv";
dotenv.config();

//instantation de l'application
const app = express()

//middleware
app.use(express.json())
app.use('/api', scanRoutes)
//route temporaire
app.get("/test-command", async (req, res, next) => {

    try {
        const result = await nmapService("http://localhost:5173");

        res.json(result);
    } catch (error) {
        next(error);
    }

});

// route de test paramétrable – accepte un paramètre query ?target=URL
app.get("/test-nmap", async (req, res, next) => {
    try {
        const { target } = req.query;
        if (!target) {
            return res.status(400).json({ error: "Paramètre 'target' requis" });
        }
        const result = await nmapService(target);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

app.use(errorHandlers)

app.listen(3000, () => {
    console.log("Application lance au port 3000")
})