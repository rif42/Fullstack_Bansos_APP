import LogoBogor from "../assets/logobogor.svg";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "./LoginPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    const regNotify = () => toast("Register Success!");
    const loginNotify = () => toast("Login Success!");
    const errNotify = (msg) => toast.error(msg);

    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [loginmodal, setLoginModal] = useState(false);

    const registerAccount = () => {
        console.log(user, "USER REF");
        console.log(pass, "PASS REF");
        try {
            Axios.post("http://localhost:3001/register", { user: user, pass: pass }).then((res) => {
                if (res.data.message) {
                    errNotify(res.data.message);
                } else {
                    regNotify();
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const loginAccount = () => {
        console.log(user, "USER REF");
        console.log(pass, "PASS REF");
        try {
            Axios.post("http://localhost:3001/login", { user: user, pass: pass }).then((res) => {
                // console.log(res, "LOGIN RESPONSE");
                // loginNotify();
                // navigate("/admin");
                if (res.data.message) {
                    errNotify(res.data.message);
                } else {
                    loginNotify();
                    navigate("/admin");
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
    }

    const title = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: "16%",
    };

    const title_h1 = {
        display: "flex",
        flexDirection: "column",
        width: "45%",
        marginLeft: "5%",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3rem",
        fontWeight: "1200",
        fontStyle: "bold",
        fontFamily: "Sans-Serif",
    };

    const title_check = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "15%",
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#747474",
    };

    const title_check_input = {
        width: "20rem",
        height: "3rem",
        paddingLeft: "1rem",
        borderRadius: "1rem",
        fontSize: "1.1rem",
        borderColor: "transparent",
        marginBottom: "1rem",
    };

    const title_check_button = {
        width: "10rem",
        backgroundColor: "#373737",
        color: "white",
        height: "2rem",
        borderRadius: "5rem",
        fontSize: "1rem",
    };

    const navbar = {
        display: "flex",
        flexDirection: "row",
        textDecoration: "none",
        height: "4vw",
    };

    const nav_ul = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        backgroundColor: "#A0C334",
        margin: "0",
        justifyContent: "space-around",
        flexGrow: "1",
        textDecoration: "none",
        listStyleType: "none",
        alignItems: "center",
        color: "white",
        paddingRight: "5%",
    };

    const logo_bogor = {
        display: "flex",
        width: "80%",
        backgroundColor: "#A0C334",
        height: "4vw",
    };

    const login_button = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.1rem",
        padding: "0.5rem",
        borderRadius: "5rem",
        borderColor: "transparent",
        cursor: "pointer",
    };

    const modal = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
    };

    const modalbox = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        marginBottom: "5%",
        width: "30%",
        height: "60%",
        borderRadius: "10%",
        backgroundColor: "white",
    };

    const loginlabel = {
        color: "#747474",
        fontSize: "1.1rem",
    };

    const loginbox = {
        fontSize: "1rem",
        width: "50%",
        height: "7%",
        borderRadius: "5rem",
        paddingLeft: "2%",
        marginBottom: "5%",
        marginTop: "2%",
    };

    const loginbutton = {
        fontSize: "1.1rem",
        width: "30%",
        backgroundColor: "#373737",
        color: "white",
        height: "2rem",
        borderRadius: "5rem",
        marginTop: "5%",
        cursor: "pointer",
    };

    const closebutton = {
        position: "absolute",
        zIndex: 50,
        marginBottom: "30%",
        marginLeft: "25%",
        width: "4%",
        height: "4%",
        cursor: "pointer",
    };

    return (
        <>
            <nav style={navbar}>
                <img src={LogoBogor} alt='Logo Kabupaten Bogor' style={logo_bogor} />
                <ul style={nav_ul}>
                    <li>Home</li>
                    <li>Publikasi</li>
                    <li>
                        <button onClick={() => setLoginModal(!loginmodal)} style={login_button}>
                            Login Admin
                        </button>
                    </li>
                </ul>
            </nav>
            <ToastContainer />
            {loginmodal ? (
                <div style={modal}>
                    <AiOutlineClose style={closebutton} onClick={() => setLoginModal(false)} />
                    <form id='loginform' style={modalbox} onSubmit={handleSubmit}>
                        <label htmlFor='user' style={loginlabel}>
                            Username
                        </label>
                        <input
                            type='text'
                            id='user'
                            onChange={(e) => {
                                setUser(e.target.value);
                            }}
                            style={loginbox}
                            placeholder='admin'
                        />
                        <label htmlFor='pass' style={loginlabel}>
                            Password
                        </label>
                        <input
                            type='password'
                            id='pass'
                            onChange={(e) => {
                                setPass(e.target.value);
                            }}
                            style={loginbox}
                            placeholder='ridoganteng'
                        />
                        <button type='submit' onClick={registerAccount} style={loginbutton}>
                            Register
                        </button>

                        <button type='submit' onClick={loginAccount} style={loginbutton}>
                            Login
                        </button>
                    </form>
                </div>
            ) : null}

            <div style={title}>
                <h1 style={title_h1}>Website Pengambilan Bantuan Sosial Kecamatan Parungpanjang</h1>
                <div style={title_check}>
                    <p>Cek Bantuan Anda</p>
                    <input type='text' placeholder='Masukkan NIK Anda' style={title_check_input} />
                    <button style={title_check_button}>Check</button>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
