import { useState, useMemo } from "react";
import { AiOutlineAudit } from "react-icons/ai";
import { IoMdReturnLeft } from "react-icons/io";
import { FaRegCheckCircle, FaCloudDownloadAlt, FaFileCode, FaWrench, FaExclamationTriangle } from "react-icons/fa";
import { FiFilter, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import initialVulnerabilities from "../utils/vunerabilites"

export default function Rapport() {
    const dateAujourdhui = new Date().toLocaleDateString('fr-FR');

    // États de filtrage
    const [selectedGravite, setSelectedGravite] = useState("Toutes");
    const [searchQuery, setSearchQuery] = useState("");

    // Filtrage dynamique
    const filteredVulnerabilities = useMemo(() => {
        return initialVulnerabilities.filter((vuln) => {
            const matchesGravite = selectedGravite === "Toutes" || vuln.gravite === selectedGravite;
            const matchesSearch = 
                vuln.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vuln.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vuln.fichier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vuln.remediation.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesGravite && matchesSearch;
        });
    }, [selectedGravite, searchQuery]);

    // Badges de gravité
    const getGraviteBadge = (gravite) => {
        switch (gravite) {
            case "Critique":
                return "bg-rose-100 text-rose-700 border-rose-300";
            case "Élevée":
                return "bg-amber-100 text-amber-800 border-amber-300";
            case "Moyenne":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            case "Faible":
            default:
                return "bg-sky-100 text-sky-700 border-sky-300";
        }
    };

    // Compteurs par gravité
    const countBySeverity = {
        Toutes: initialVulnerabilities.length,
        Critique: initialVulnerabilities.filter(v => v.gravite === "Critique").length,
        Élevée: initialVulnerabilities.filter(v => v.gravite === "Élevée").length,
        Moyenne: initialVulnerabilities.filter(v => v.gravite === "Moyenne").length,
        Faible: initialVulnerabilities.filter(v => v.gravite === "Faible").length,
    };

    return (
        <div className="min-h-screen bg-[#E8F6EC] flex flex-col gap-6 pb-20">
            {/* Header supérieur style terminal */}
            <header className="flex justify-between bg-black text-gray-400 text-sm items-center px-6 md:px-20 py-3 shadow-md">
                <h5 className="flex items-center gap-2">
                    <AiOutlineAudit className="text-[#27845F]" size={16} />
                    audit_process_complet.sh
                </h5>
                <h5 className="text-emerald-400 font-mono text-xs">Status: COMPLETED</h5>
            </header>

            {/* Titre et navigation retour */}
            <div className="flex justify-between text-sm items-center px-6 md:px-20 py-2 container mx-auto">
                <h5 className="flex items-center text-gray-800 font-bold text-lg">
                    <Link 
                        to="/" 
                        className="text-gray-500 hover:text-[#27845F] p-2 hover:bg-white transition-all rounded-lg me-2 inline-flex items-center shadow-xs"
                        title="Retour à l'accueil"
                    >
                        <IoMdReturnLeft size={22} />
                    </Link>
                    Security Audit Report
                </h5>
                <h5 className="text-gray-600 bg-white px-4 py-1.5 rounded-md shadow-xs border border-gray-200">
                    Généré le : <span className="font-semibold text-gray-800">{dateAujourdhui}</span>
                </h5>
            </div>

            {/* Carte de score global */}
            <div className="p-6 bg-white container mx-auto border-2 border-gray-200 rounded-lg shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center">
                    <div className="bg-[#104235] w-20 h-20 rounded-md flex justify-center items-center text-white text-3xl font-extrabold shadow-md">
                        A+
                    </div>
                    <h3 className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider mt-2">
                        Score de sécurité
                    </h3>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="text-[#27845F] text-sm font-bold flex items-center gap-2">
                        <FaRegCheckCircle /> Posture générale solide
                    </h2>
                    <h2 className="text-xl font-bold text-gray-800">
                        {countBySeverity.Critique} vulnérabilités critiques & {countBySeverity.Élevée} élevées identifiées
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Le scan complet de votre architecture d’application a été réalisé avec succès. 
                        Une attention immédiate est recommandée pour les vulnérabilités critiques listées ci-dessous afin de prévenir tout risque d'intrusion.
                    </p>
                </div>

                <div>
                    <button 
                        onClick={() => window.print()}
                        className="bg-[#27845F] cursor-pointer hover:bg-[#104235] duration-200 text-white text-sm shadow-md px-5 py-3 rounded-md flex items-center gap-2 font-medium"
                    >
                        <FaCloudDownloadAlt size={18} />
                        Télécharger le Rapport
                    </button>
                </div>
            </div>

            {/* Section Tableau des Vulnérabilités */}
            <div className="container mx-auto bg-white border-2 border-gray-200 rounded-lg shadow-xl overflow-hidden">
                {/* Barre de filtre et recherche */}
                <div className="p-5 border-b border-gray-200 bg-gray-50/70 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Filtre par gravité */}
                    <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 me-2">
                            <FiFilter className="text-[#27845F]" /> Filtre :
                        </span>
                        {["Toutes", "Critique", "Élevée", "Moyenne", "Faible"].map((gravite) => {
                            const isSelected = selectedGravite === gravite;
                            return (
                                <button
                                    key={gravite}
                                    onClick={() => setSelectedGravite(gravite)}
                                    className={`text-xs px-3 py-1.5 rounded-full font-semibold cursor-pointer transition-all border ${
                                        isSelected 
                                            ? "bg-[#104235] text-white border-[#104235] shadow-xs" 
                                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                >
                                    {gravite} ({countBySeverity[gravite]})
                                </button>
                            );
                        })}
                    </div>

                    {/* Barre de recherche */}
                    <div className="relative w-full md:w-72">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher par mot-clé, fichier..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-xs pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#27845F] focus:ring-1 focus:ring-[#27845F] bg-white"
                        />
                    </div>
                </div>

                {/* Tableau à 4 colonnes */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#104235] text-white text-xs uppercase tracking-wider font-semibold">
                                <th className="py-3.5 px-5 w-36">Gravité</th>
                                <th className="py-3.5 px-5 w-60">Fichier / Emplacement</th>
                                <th className="py-3.5 px-5">Description</th>
                                <th className="py-3.5 px-5 w-80">Remédiation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {filteredVulnerabilities.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-12 text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaExclamationTriangle className="text-gray-400 text-2xl" />
                                            <span>Aucune vulnérabilité ne correspond à vos critères de filtrage.</span>
                                            {(selectedGravite !== "Toutes" || searchQuery) && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedGravite("Toutes");
                                                        setSearchQuery("");
                                                    }}
                                                    className="text-xs text-[#27845F] hover:underline font-semibold mt-1 cursor-pointer"
                                                >
                                                    Réinitialiser les filtres
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredVulnerabilities.map((vuln) => (
                                    <tr 
                                        key={vuln.id} 
                                        className="hover:bg-[#E8F6EC]/30 transition-colors align-top"
                                    >
                                        {/* 1. Colonne Gravité */}
                                        <td className="py-4 px-5 whitespace-nowrap">
                                            <span 
                                                className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold border ${getGraviteBadge(vuln.gravite)}`}
                                            >
                                                {vuln.gravite === "Critique" && <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>}
                                                {vuln.gravite}
                                            </span>
                                        </td>

                                        {/* 2. Colonne Fichier / Emplacement */}
                                        <td className="py-4 px-5">
                                            <div className="flex items-start gap-1.5 text-gray-700">
                                                <FaFileCode className="text-[#27845F] mt-1 shrink-0 text-xs" />
                                                <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded border border-gray-200 break-all">
                                                    {vuln.fichier}
                                                </span>
                                            </div>
                                        </td>

                                        {/* 3. Colonne Description */}
                                        <td className="py-4 px-5">
                                            <div className="font-semibold text-gray-900 text-sm mb-1">
                                                {vuln.type}
                                            </div>
                                            <p className="text-gray-600 text-xs leading-relaxed">
                                                {vuln.description}
                                            </p>
                                        </td>

                                        {/* 4. Colonne Remédiation */}
                                        <td className="py-4 px-5">
                                            <div className="bg-[#E8F6EC] border border-[#27845F]/30 text-[#104235] p-3 rounded-md text-xs leading-relaxed flex items-start gap-2 shadow-2xs">
                                                <FaWrench className="text-[#27845F] mt-0.5 shrink-0 text-xs" />
                                                <span>{vuln.remediation}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pied de tableau avec compteur */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center px-5">
                    <span>
                        Affichage de <strong>{filteredVulnerabilities.length}</strong> sur <strong>{initialVulnerabilities.length}</strong> vulnérabilités
                    </span>
                    <span className="text-[11px] text-gray-400">
                        SecurCheck Vulnerability Engine v1.0
                    </span>
                </div>
            </div>
        </div>
    );
}