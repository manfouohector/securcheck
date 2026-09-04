import { FaHtml5, FaLock } from "react-icons/fa6";
import {Link} from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import {useState} from "react"
import { FiLink } from "react-icons/fi";
import { VscRunAll } from "react-icons/vsc";
import {motion} from "framer-motion"
import { AiFillQuestionCircle } from 'react-icons/ai'
import { FaLink } from 'react-icons/fa'
import { GrInspect } from 'react-icons/gr'
import { FaRegLightbulb } from "react-icons/fa";

const MotionImage = motion.create(Link)

export default function Home() {

    const [selected, setSelected] = useState(false)

    return <>
        <div className='bg-[#E0E9E9] h-auto pt-5'>
            <div className="flex justify-around max-sm:justify-between items-center w-screen text-sm">
                <div>
                    <img src="/images/logo.png" alt="logo-securcheck" className="w-15 rounded-full inline" />
                    <span className="text-lg text-transparent bg-clip-text bg-linear-to-bl to-[#27845F] from-[#104235] font-extrabold">SecurCheck</span>
                </div>
                <div className="font-bold flex gap-2.5 max-sm:hidden" >
                    <Link to='/'>Accueil</Link>
                    <Link to='/'>A propos</Link>
                </div>
                <div className='flex gap-3'>
                    <span className="bg-[#E8F6EC] block text-[#27845F] font-bold p-2 rounded-sm cursor-pointer">
                        <FaLock className='inline me-2'/>
                        Stateless & private session
                    </span>
                    <FaUser className="bg-[#104235] max-sm:hidden text-white block w-8 h-8 p-2 rounded-full cursor-pointer" />
                </div>
            </div>
            <hr className='mt-4 border-t-2 border-gray-300' />
            <div className='sm:p-5 pb-10 md:w-280 bg-white md:container md:m-auto mt-10 rounded-sm shadow-xl'>
                <h2 className='text-center text-xl font-bold'>La Securite de votre code automatique et sans faille</h2>
                <p className='text-gray-500 text-sm text-center mt-5 mb-10'>
                    Détectez les vulnérabilités avant qu'elles ne  deviennent des  ménaces .
                    Une analyse complète, precise et rapide pour les déveleppeurs exigeants.
                </p>
                <hr className='mt-4 border-t-2 border-gray-300 mb-10'/>
                <div className='bg-[#E8F6EC] w-full flex gap-2 p-3 h-15 max-sm:text-sm'>
                    <button className={`w-1/2 cursor-pointer rounded-md font-bold ${!selected && 'bg-white text-[#27845F]'}`} onClick={()=> {setSelected(false)}}>
                        <FaCode className='inline me-2 w-10'/>Lien du site / URL (DASt)
                    </button>
                    <button className={`cursor-pointer rounded-md w-1/2 font-bold ${selected && 'bg-white text-[#27845F]'}`} onClick={()=> {setSelected(true)}}>
                        <FaGithub className='inline me-2 w-10'/>Lien github (SAST)
                    </button>
                </div>
                <div className='mt-5'>
                    <span className='space-x-3 text-lg text-gray-500'>Entrer votre url</span>
                    <div className="flex justify-center gap-2.5 mt-2 max-sm:px-3">
                        <div className='border-gray-200 border-2 w-3/4 px-3 rounded-md bg-[#E8F6EC]'>
                            <FiLink className='inline'/>
                            <input type="search" className='w-[90%] h-15 p-2 border-none outline-0' placeholder='https://github.com/user/repo' />
                        </div>
                        <MotionImage to="/scanning" whileTap={{scale : 0.8}} whileHover={{x : 5}} transition={{type : 'spring'}} className='bg-[#104235] text-white py-4 px-10 max-sm:px-2 max-sm:text-sm max-lg:w-[30%] rounded-md cursor-pointer'><VscRunAll className='inline me-2'/>Lancer l'audit</MotionImage>
                    </div>
                </div>
                <div className="flex max-sm:flex-col max-sm:items-center sm:justify-center gap-5 mt-15">
                    <div className='p-6 w-80 bg-white border-2 border-gray-200 rounded-md shadow-xl flex flex-col gap-2 items-center relative overflow-hidden'>
                        <div className='w-20 h-20 rounded-full bg-blue-300 absolute top-[-20%] left-[80%]'></div>
                        <span className="text-[#104235] font-bold"><FaLink className='inline me-2'/>Connecter</span>
                        <p className="text-gray-400 text-sm text-center">
                            Lier Votre repos GitHub <br /> ou entrez votre URL en un clic
                        </p>
                    </div>
                    <div className='p-6 w-80 bg-white border-2 border-gray-200 rounded-md shadow-xl flex flex-col gap-2 items-center relative overflow-hidden' >
                        <div className='w-20 h-20 rounded-full bg-blue-300 absolute top-[-20%] left-[80%]'></div>
                        <span className="text-[#104235] font-bold"><GrInspect className='inline me-2'/>Inspecter</span>
                        <p className="text-gray-400 text-sm text-center">
                            Scanne chaque ligne <br /> de code pour identifier les <br /> vulnérabilités
                        </p>
                    </div>
                    <div className='p-6 w-80 bg-white border-2 border-gray-200 rounded-md shadow-xl flex flex-col gap-2 items-center relative overflow-hidden'>
                        <div className='w-20 h-20 rounded-full bg-blue-300 absolute top-[-20%] left-[80%]'></div>
                        <span className="text-[#104235] font-bold"><FaRegLightbulb className='inline me-2'/> Suggestions</span>
                        <p className="text-gray-400 text-sm text-center">
                            Obtenez des recommandations <br /> pour améliorer votre code <br /> et améliorer la sécurité
                        </p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-5 max-sm:grid-cols-2 max-sm:gap-5 w-full px-20 pt-20'>
                <div>
                    <h4 className='text-md'>Compte</h4> <br />
                    <div className="flex gap-5 flex-col">
                        <span className='text-gray-400 text-sm block'>Saving</span> 
                        <span className='text-gray-400 text-sm block'>Join account</span> 
                        <span className='text-gray-400 text-sm block'>Crypto</span> 
                        <span className='text-gray-400 text-sm block'>Freelance</span>
                        <span className='text-gray-400 text-sm block'>Commodite</span>
                    </div>
                </div>
                <div>
                    <h4 className='text-md'>Client</h4> <br />
                    <div className="flex gap-5 flex-col">
                        <span className='text-gray-400 text-sm block'>Customer help</span> 
                        <span className='text-gray-400 text-sm block'>Community</span> 
                        <span className='text-gray-400 text-sm block'>Blog</span> 
                    </div>
                </div>
                <div>
                    <h4 className='text-md'>Finance</h4> <br />
                    <div className="flex gap-5 flex-col">
                        <span className='text-gray-400 text-sm block'>Cards</span> 
                        <span className='text-gray-400 text-sm block'>Linked account</span> 
                        <span className='text-gray-400 text-sm block'>Payments</span> 
                    </div>
                </div>
                <div>
                    <h4 className='text-md'>A propos</h4> <br />
                    <div className="flex gap-5 flex-col">
                        <span className='text-gray-400 text-sm block'>About us</span> 
                        <span className='text-gray-400 text-sm block'>Contacts</span> 
                        <span className='text-gray-400 text-sm block'>Carrer</span>
                    </div>
                </div>
                <div>
                    <img src="/images/logo.png" className='w-1/2 object-cover' alt="" />
                    <h1 className='text-5xl bonheur-royale-regular text-transparent bg-clip-text bg-linear-to-bl to-[#27845F] from-white font-extrabold'>SecurCheck</h1>
                </div>
                
            </div>
        </div>
      
    </>
}
