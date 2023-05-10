import "./AdminDashboard.css";
import { AiOutlineImport, AiOutlineUser, AiOutlineDashboard, AiOutlineTeam } from "react-icons/ai";
import ScrollToTop from "./ScrollToTop";
import BuatBansos from "./BuatBansos";
import CardBansos from "./CardBansos";
import { useState, useEffect } from "react";
import { ReactPropTypes } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const [bansosdata, setBansosdata] = useState(null);
    const [bansosform, setBansosform] = useState(0);

    function formtoggle() {
        setBansosform(!bansosform);
        console.log(bansosform, "form toggled");
    }

    useEffect(() => {
        // get bansos data from database
        Axios.post("http://localhost:3001/getbansos").then((res, err) => {
            if (err) {
                console.log(err, "ERROR");
            }
            if (res) {
                if (bansosdata != res.data) {
                    setBansosdata(res.data);
                }
            }
        });
    });

    return (
        <>
            <ScrollToTop />
            <div className='admin_wrapper'>
                <div className='sidebar'>
                    <div className='upper_admin'>
                        <AiOutlineUser className='admin_pic' />
                        <div className='admin_name'>Admin</div>
                    </div>
                    <div className='sidebar_content'>
                        <div className='sidebar_items'>
                            <AiOutlineDashboard className='sidebar_icons' />
                            <p className='sidebar_items_text'>Dashboard </p>
                        </div>
                        <div className='sidebar_items'>
                            <AiOutlineTeam className='sidebar_icons' />
                            <p
                                onClick={() => {
                                    navigate("/datawarga");
                                }}
                                className='sidebar_items_text'>
                                Data Warga
                            </p>
                        </div>
                    </div>
                    <div className='lower_logout'>
                        <svg viewBox='0 0 100 5' xmlns='http://www.w3.org/2000/svg'>
                            <line x1='50' y1='0' x2='90' y2='0' stroke='#5D5D5D' strokeWidth={1} />
                            <line x1='50' y1='0' x2='10' y2='0' stroke='#5D5D5D' strokeWidth={1} />
                        </svg>
                        <div
                            className='logout_items'
                            onClick={() => {
                                navigate("/");
                            }}>
                            <AiOutlineImport className='admin_pic' />
                            <p className='sidebar_items_text'>Logout</p>
                        </div>
                    </div>
                </div>

                <div className='admin_content'>
                    {bansosform ? (
                        <BuatBansos formtoggle={formtoggle} />
                    ) : bansosdata.length != 0 ? (
                        <CardBansos data={bansosdata} formtoggle={formtoggle} />
                    ) : (
                        <div className='buatbansos'>
                            <div
                                onClick={() => {
                                    setBansosform(!bansosform);
                                }}
                                className='tombol'>
                                Buat Bansos
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
