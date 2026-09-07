import { spawn } from "child_process";

const Command = (command, args,timeout = 30000) => {

    return new Promise((resolve, reject) => {
        const process = spawn(command, args);

        const timer = setTimeout(() => {
            process.kill();
            reject(new Error("Le processus a dépassé le délai autorisé"));
        }, timeout);

        let stdout = "";
        process.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        let stderr = "";
        process.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        process.on("close", (code) => {

            clearTimeout(timer);
            if (code === 0) {
                resolve({
                    stdout,
                    stderr
                });
            } else {
                reject(new Error(`Le processus s'est terminé avec le code ${code}`));
            }

        });

        process.on("error", (error) => {
            reject(error);
        });
    });
};

export default Command