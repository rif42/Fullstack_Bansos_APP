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
    const [checkstate, setCheckState] = useState(false);
    const [nkk, setNKK] = useState(null);

    const validate = () => {
        if (user === "" || pass === "") {
            errNotify("Username or Password is Empty!");
            return false;
        }
        if (user.length < 5 || pass.length < 5) {
            errNotify("Username or Password must be at least 5 characters!");
            return false;
        }
        return true;
    };

    const registerAccount = () => {
        //run validate function, if return false then stop the function
        if (!validate()) return;
        // console.log(user, "USER REF");
        // console.log(pass, "PASS REF");
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

    const checkBantuan = () => {
        setCheckState(true);
        // console.log(nkk);
    };

    const loginAccount = () => {
        if (!validate()) return;
        // console.log(user, "USER REF");
        // console.log(pass, "PASS REF");
        try {
            Axios.post("http://localhost:3001/login", { user: user, pass: pass }).then((res, err) => {
                // console.log(res, "LOGIN RESPONSE");
                // console.log(err, "LOGIN RESPONSE");
                if (res.data.message) {
                    errNotify(res.data.message);
                } else if (res.err) {
                    errNotify(res.err);
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

    return (
        <>
            <div className='navbar'>
                <img src={LogoBogor} alt='Logo Kabupaten Bogor' className='logo_bogor' />
                <ul className='nav_ul'>
                    <li>Home</li>
                    <li>Publikasi</li>
                    <li>
                        <button onClick={() => setLoginModal(!loginmodal)} className='login_button'>
                            Login Admin
                        </button>
                    </li>
                </ul>
            </div>
            <ToastContainer />
            {loginmodal ? (
                <div className='modal'>
                    <AiOutlineClose className='closebutton' onClick={() => setLoginModal(false)} />
                    <form id='loginform' className='modalbox' onSubmit={handleSubmit}>
                        <label htmlFor='user' className='loginlabel'>
                            Username
                        </label>
                        <input
                            type='text'
                            id='user'
                            onChange={(e) => {
                                setUser(e.target.value);
                            }}
                            className='loginbox'
                            placeholder='admin'
                        />
                        <label htmlFor='pass' className='loginlabel'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='pass'
                            onChange={(e) => {
                                setPass(e.target.value);
                            }}
                            className='loginbox'
                            placeholder='ridoganteng'
                        />
                        <button type='submit' onClick={registerAccount} className='loginbutton'>
                            Register
                        </button>

                        <button type='submit' onClick={loginAccount} className='loginbutton'>
                            Login
                        </button>
                    </form>
                </div>
            ) : null}

            <div className='title'>
                <h1 className='title_h1'>Website Pengambilan Bantuan Sosial Kecamatan Parungpanjang</h1>

                {!checkstate && (
                    <div className='title_check'>
                        <p>Cek Bantuan Anda</p>
                        <input
                            onChange={(e) => setNKK(e.target.value)}
                            type='text'
                            placeholder='Masukkan NKK Anda'
                            className='title_check_input'
                        />
                        <button onClick={() => checkBantuan()} className='title_check_button'>
                            Check
                        </button>
                    </div>
                )}

                {checkstate && <div className='nkkcheck'>LMAOOO</div>}
            </div>
        </>
    );
}

export default LoginPage;
