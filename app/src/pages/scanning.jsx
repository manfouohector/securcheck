import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSkipBackward } from "react-icons/io";
import { VscDebugConsole } from "react-icons/vsc";
import Logs from "../utils/logs";


export default function Scanning() {
    const navigate = useNavigate();

    // État de progression (pourra être synchronisé en temps réel avec votre backend)
    const [progress] = useState(45);
    const [currentStep] = useState("Analyse statique du code (SAST)...");

    // Référence pour le défilement automatique vers le bas lors de l'arrivée de nouveaux logs
    const logsEndRef = useRef(null);
    const [logs] = useState(Logs);

    useEffect(() => {
        // Défile automatiquement vers le dernier log à chaque mise à jour de la liste
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    // Fonction d'aide pour attribuer les styles et badges selon le type de log
    const getLogBadge = (type) => {
        switch (type) {
            case "success":
                return {
                    label: "SUCCESS",
                    badgeClass: "bg-emerald-950 text-emerald-400 border border-emerald-800",
                    textClass: "text-emerald-300"
                };
            case "warning":
                return {
                    label: "WARN",
                    badgeClass: "bg-amber-950 text-amber-400 border border-amber-800",
                    textClass: "text-amber-200"
                };
            case "error":
                return {
                    label: "ERROR",
                    badgeClass: "bg-rose-950 text-rose-400 border border-rose-800",
                    textClass: "text-rose-300 font-semibold"
                };
            case "info":
            default:
                return {
                    label: "INFO",
                    badgeClass: "bg-sky-950 text-sky-400 border border-sky-800",
                    textClass: "text-gray-200"
                };
        }
    };

    return (
        <div className="min-h-screen bg-[#E8F6EC] flex flex-col">
            {/* En-tête */}
            <header className="flex justify-between items-center px-6 md:px-20 py-3 bg-white shadow-md">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="p-1 text-gray-700 hover:text-[#27845F] transition-colors cursor-pointer"
                        title="Retour"
                    >
                        <IoIosSkipBackward className="text-xl" />
                    </button>
                    <Link to="/" className="text-xl text-transparent bg-clip-text bg-linear-to-r to-[#27845F] from-[#104235] font-extrabold">
                        SecurCheck
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27845F] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#27845F]"></span>
                    </span>
                    <h3 className="bg-[#E0E9E9] text-[#104235] px-4 py-1.5 rounded-sm font-semibold text-sm">
                        Scanning en cours...
                    </h3>
                </div>
            </header>

            {/* Corps de la page */}
            <main className="flex-1 py-10 px-4">
                {/* Carte de progression */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-3xl w-full mx-auto shadow-sm">
                    <h5 className="font-bold text-gray-800 mb-4 text-base">Progression du scan</h5>
                    <div className="flex justify-between items-center mb-2">
                        <h6 className="text-gray-500 text-sm">{currentStep}</h6>
                        <h6 className="text-[#27845F] font-extrabold text-lg">{progress}%</h6>
                    </div>
                    
                    {/* Barre de progression */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                            className="bg-[#27845F] h-full transition-all duration-500 ease-out" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Console en direct */}
                <div className="bg-[#0b2b22] border border-[#1a5a47] rounded-lg mt-6 max-w-3xl w-full mx-auto shadow-2xl overflow-hidden flex flex-col">
                    {/* En-tête de la console */}
                    <div className="bg-[#071d17] border-b border-[#134436] text-sm text-[#27845F] p-3 flex justify-between items-center px-5">
                        <h5 className="font-extrabold flex items-center gap-2 tracking-wide text-white">
                            <VscDebugConsole className="text-[#27845F] text-lg" />
                            Live Console View
                        </h5>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                        </div>
                    </div>

                    {/* Zone des logs */}
                    <div className="logs font-mono text-xs md:text-sm p-4 h-80 overflow-y-auto space-y-2 bg-[#0a231c]/90 scroll-smooth">
                        {logs.length === 0 ? (
                            <p className="text-gray-400 italic">En attente des premiers logs du serveur...</p>
                        ) : (
                            logs.map((log) => {
                                const { label, badgeClass, textClass } = getLogBadge(log.type);
                                return (
                                    <div key={log.id} className="flex items-start gap-2.5 leading-relaxed hover:bg-white/5 p-1 rounded transition-colors">
                                        <span className="text-gray-500 select-none text-[11px] pt-0.5">
                                            [{log.timestamp}]
                                        </span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${badgeClass}`}>
                                            {label}
                                        </span>
                                        <span className={`flex-1 wrap-break-words ${textClass}`}>
                                            {log.message}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                        {/* Indicateur de défilement & curseur de frappe */}
                        <div ref={logsEndRef} className="flex items-center gap-2 pt-2 text-[#27845F]">
                            <span className="animate-pulse">❯</span>
                            <span className="w-2 h-4 bg-[#27845F] animate-pulse inline-block align-middle"></span>
                        </div>
                    </div>
                </div>

                {/* Bouton d'annulation */}
                <div className="max-w-3xl w-full mx-auto text-right mt-6">
                    <button 
                        onClick={() => navigate("/")}
                        className="p-2.5 px-6 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 font-semibold text-sm rounded-md transition-all cursor-pointer"
                    >
                        Annuler le scan
                    </button>
                </div>
            </main>
        </div>
    );
}