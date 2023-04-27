import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import BuatBansos from "./components/BuatBansos";
import SideDashboard from "./components/SideDashboard";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <>
            <ScrollToTop />
            {/* <h1>Hello Motherfucker</h1> */}
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='bansos' element={<BuatBansos />} />
                <Route path='admin' element={<SideDashboard />} />
            </Routes>
        </>
    );
}

export default App;
