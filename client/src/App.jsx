import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import DataWarga from "./components/DataWarga";
import DetailBansos from "./components/DetailBansos";

function App() {
    return (
        <>
            <ScrollToTop />
            {/* <h1>Hello Motherfucker</h1> */}
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='admin' element={<AdminDashboard />} />
                <Route path='datawarga' element={<DataWarga />} />
                <Route path='bansos/:id' element={<DetailBansos />} />
            </Routes>
        </>
    );
}

export default App;
