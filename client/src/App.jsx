import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <>
            <ScrollToTop />
            {/* <h1>Hello Motherfucker</h1> */}
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='admin' element={<AdminDashboard />} />
            </Routes>
        </>
    );
}

export default App;
