import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Scanning from './pages/scanning.jsx'
import Rapport from './pages/rapport.jsx'

function App() {
   
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scanning" element={<Scanning />} />
                <Route path="/rapport" element={<Rapport />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default App
