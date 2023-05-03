import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import DataWarga from "./components/DataWarga";

function App() {
    return (
        <>
            <ScrollToTop />
            {/* <h1>Hello Motherfucker</h1> */}
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='admin' element={<AdminDashboard />} />
                <Route path='datawarga' element={<DataWarga />} />
            </Routes>
        </>
    );
}

export default App;
