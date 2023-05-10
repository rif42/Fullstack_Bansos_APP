import LogoBogor from "../assets/logobogor.svg";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "./LoginPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "react-qr-code";

function LoginPage() {
    const regNotify = () => toast("Register Success!");
    const loginNotify = () => toast("Login Success!");
    const errNotify = (msg) => toast.error(msg);
    const normalNotify = (msg) => toast(msg);

    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [loginmodal, setLoginModal] = useState(false);
    const [checkstate, setCheckState] = useState(false);
    const [nkk, setNKK] = useState(null);
    const [bansos, setBansos] = useState(null);
    const [datawarga, setDataWarga] = useState(null);
    const [qrmodal, setQRModal] = useState(false);

    const validatenkk = () => {
        if (nkk.length > 0 && nkk.length < 16) {
            errNotify("NKK must be 16 characters!");
            return false;
        }
        if (isNaN(nkk)) {
            errNotify("NKK harus berupa angka");
            return false;
        }
        return true;
    };

    const validate = () => {
        if (user === "" || pass === "") {
            errNotify("Username or Password is Empty!");
            return false;
        }
        if (user.length < 5 || pass.length < 5) {
            errNotify("Username or Password must be at least 6 characters!");
            return false;
        }

        return true;
    };

    const loginAccount = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // console.log(user, "USER REF");
        // console.log(pass, "PASS REF");
        try {
            Axios.post("http://localhost:3001/login", { user: user, pass: pass }).then((res, err) => {
                // console.log(res, "LOGIN RESPONSE");
                // console.log(err, "LOGIN RESPONSE");
                if (res.data.message) {
                    errNotify(res.data.message);
                } else if (res.data.err) {
                    console.log(res.data.err, "ERROR");
                    errNotify(res.data.err);
                } else {
                    loginNotify();
                    navigate("/admin");
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const registerAccount = (e) => {
        e.preventDefault();
        //run validate function, if return false then stop the function
        if (!validate()) return;
        // console.log(user, "USER REF");
        // console.log(pass, "PASS REF");

        Axios.post("http://localhost:3001/register", { user: user, pass: pass }).then((res) => {
            console.log(res);
            if (res.data.message) {
                console.log(res);
                errNotify(res.data.message);
            } else {
                regNotify();
            }
        });
    };

    const checkBantuan = async () => {
        if (!validatenkk()) return;
        try {
            const datawargankk = await Axios.post("http://localhost:3001/getdatawargabynkk", { nkk: nkk }).then(
                (res) => {
                    if (res.data.length === 0) {
                        errNotify("NKK tidak ditemukan!");
                        return;
                    }

                    if (res.data[0].tgl_claim != null) {
                        normalNotify("NKK sudah mengambil bantuan!");
                        setDataWarga(res.data[0]);
                        console.log(res.data[0]);
                        setQRModal(!qrmodal);
                        return res.data[0];
                    }
                }
            );
            const bansos = await Axios.post("http://localhost:3001/getbansosbyid", {
                bansos_id: datawargankk.bansos_id,
            }).then((res) => {
                if (res.data.length === 0) {
                    errNotify("Bansos tidak ditemukan!");
                    return;
                }
                setBansos(res.data[0]);
                console.log(res.data[0]);
                setCheckState(true);
                return res.data[0];
            });
        } catch (err) {
            console.log(err);
        }
    };

    const updateData = (e) => {
        setDataWarga({
            ...datawarga,
            [e.target.name]: e.target.value,
        });
    };

    const nkkcheck_submit = () => {
        if (datawarga.no_antre === null) {
            datawarga.no_antre = 1;
        } else {
            datawarga.no_antre = datawarga.no_antre + 1;
        }
        if (datawarga.sesi === null) datawarga.sesi = "1";
        console.log(datawarga, "DATAWARGA");

        Axios.post("http://localhost:3001/konfirmasipengambilan", {
            no_antre: datawarga.no_antre,
            sesi: datawarga.sesi,
            tgl_claim: datawarga.tgl_claim,
            nkk: datawarga.nkk,
        }).then((res) => {
            if (res) {
                normalNotify("Data Berhasil Diupdate!");
            } else {
                errNotify("ERROR!");
            }
        });
    };

    const closemodal = () => {
        setQRModal(!qrmodal);
        navigate(0);
    };

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
            {qrmodal && (
                <div className='qrmodal_bg'>
                    <AiOutlineClose className='modalcloseicon' onClick={closemodal} />
                    <div className='qrmodal'>
                        <QRCode
                            className='qrmodal_code'
                            size={256}
                            value={datawarga.bansos_id + datawarga.nkk + datawarga.sesi}
                            viewBox={`0 0 256 256`}
                        />
                        <div className='qrmodal_info'>
                            <p className='qrmodal_info_title'>
                                Silahkan datang sesuai tanggal dan sesi yang telah anda tentukan
                            </p>
                            <div className='qrmodal_info_items'>
                                <div className='qrmodal_info_item1'>Nama Bansos :</div>
                                <div className='qrmodal_info_item2'>{datawarga.bansos_id}</div>
                            </div>
                            <div className='qrmodal_info_items'>
                                <div className='qrmodal_info_item1'>No KK :</div>
                                <div className='qrmodal_info_item2'>{datawarga.nkk}</div>
                            </div>
                            <div className='qrmodal_info_items'>
                                <div className='qrmodal_info_item1'>Alamat :</div>
                                <div className='qrmodal_info_item2'>{datawarga.alamat}</div>
                            </div>
                            <div className='qrmodal_info_items'>
                                <div className='qrmodal_info_item1'>Tanggal Claim :</div>
                                <div className='qrmodal_info_item2'>{datawarga.tgl_claim.slice(0, 10)}</div>
                            </div>
                            <div className='qrmodal_info_items'>
                                <div className='qrmodal_info_item1'>Sesi :</div>
                                <div className='qrmodal_info_item2'>{datawarga.sesi}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {loginmodal ? (
                <div className='loginmodal'>
                    <AiOutlineClose className='closebutton' onClick={() => setLoginModal(false)} />
                    <form id='loginform' className='modalbox'>
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
                            placeholder='input username here'
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
                            placeholder='input password here'
                        />
                        <button onClick={loginAccount} className='loginbutton'>
                            Login
                        </button>

                        <button onClick={registerAccount} className='loginbutton'>
                            Register
                        </button>
                    </form>
                </div>
            ) : null}

            <div className='title'>
                <h1 className='title_h1'>Website Pengambilan Bantuan Sosial Kecamatan Parungpanjang</h1>

                {!checkstate && (
                    <div className='title_check'>
                        <p onClick={() => console.log(datawarga)}>Cek Bantuan Anda</p>
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

                {checkstate && (
                    <div className='nkkcheck'>
                        <b>Halo, selamat datang {datawarga.nkk}</b>
                        <p>Silahkan buat jadwal untuk pengambilan bantuan sosial</p>
                        <form className='nkkcheck_form' onSubmit={handleSubmit}>
                            <div className='twargaform_formitems'>
                                <label className='twargaform_itemlabel' htmlFor='namabansos'>
                                    Nama Bansos :
                                </label>
                                <select
                                    placeholder='Pilih Bansos'
                                    required
                                    className='twargaform_iteminput'
                                    name='namabansos'
                                    id='namabansos'>
                                    <option value={bansos.nama_bansos}>{bansos.nama_bansos}</option>
                                </select>
                            </div>
                            <div className='twargaform_formitems'>
                                <label className='twargaform_itemlabel' htmlFor='tglbansos'>
                                    Pilih Tanggal :
                                </label>
                                <input
                                    onChange={updateData}
                                    className='twargaform_iteminput'
                                    type='date'
                                    id='tgl_claim'
                                    name='tgl_claim'
                                    min={bansos.tgl1.slice(0, 10)}
                                    max={bansos.tgl2.slice(0, 10)}
                                    required
                                />
                            </div>
                            <div className='twargaform_formitems'>
                                <label className='twargaform_itemlabel' htmlFor='sesi'>
                                    Pilih Sesi :
                                </label>

                                <select
                                    onChange={updateData}
                                    required
                                    placeholder='Pilih Sesi'
                                    className='twargaform_iteminput'
                                    name='sesi'
                                    id='sesi'>
                                    <option value='1'>Sesi 1</option>
                                    <option
                                        value='2'
                                        style={bansos.sesi == 2 ? { display: "flex" } : { display: "none" }}>
                                        Sesi 2
                                    </option>
                                    <option
                                        value='3'
                                        style={bansos.sesi == 3 ? { display: "flex" } : { display: "none" }}>
                                        Sesi 3
                                    </option>
                                </select>
                            </div>
                            <div className='nkkcheck_buttons'>
                                <button onClick={nkkcheck_submit} type='submit' className='twargaform_button1'>
                                    Konfirmasi
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default LoginPage;
