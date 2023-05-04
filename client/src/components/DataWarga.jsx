import "./DataWarga.css";
import { useState, useEffect } from "react";
import { AiOutlineImport, AiOutlineUser, AiOutlineDashboard, AiOutlineTeam, AiOutlineCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TambahWarga from "./TambahWarga";

function DataWarga() {
    const navigate = useNavigate();

    const [tambahwarga, setTambahwarga] = useState(false);

    function formtoggle() {
        setTambahwarga(!tambahwarga);
        console.log(tambahwarga, "form toggled");
    }

    const exampledata = [
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
        {
            bansos_id: 123123123123,
            nkk: 999999999999,
            nama: "rido ganteng",
            alamat: "borgor land",
        },
    ];

    return (
        <>
            <div className='datawarga_wrapper'>
                {tambahwarga ? <TambahWarga formtoggle={formtoggle} /> : null}

                <div className='sidebar'>
                    <div className='upper_admin'>
                        <AiOutlineUser className='admin_pic' />
                        <div className='admin_name'>Admin 1</div>
                    </div>
                    <div className='sidebar_content'>
                        <div className='sidebar_items'>
                            <AiOutlineDashboard className='admin_pic' />
                            <p
                                onClick={() => {
                                    navigate("/admin");
                                }}
                                className='sidebar_items_text'>
                                Dashboard
                            </p>
                        </div>
                        <div className='sidebar_items'>
                            <AiOutlineTeam className='admin_pic' />
                            <p className='sidebar_items_text'>Data Warga </p>
                        </div>
                    </div>
                    <div className='lower_logout'>
                        <svg viewBox='0 0 100 5' xmlns='http://www.w3.org/2000/svg'>
                            <line x1='50' y1='0' x2='90' y2='0' stroke='#5D5D5D' strokeWidth={1} />
                            <line x1='50' y1='0' x2='10' y2='0' stroke='#5D5D5D' strokeWidth={1} />
                        </svg>
                        <div className='logout_items'>
                            <AiOutlineImport className='admin_pic' />
                            <p className='sidebar_items_text'>Logout</p>
                        </div>
                    </div>
                </div>
                <div className='pilihbansos'>
                    Nama Bansos &nbsp;
                    <AiOutlineCaretDown />
                </div>

                <div
                    onClick={() => {
                        setTambahwarga(!tambahwarga);
                    }}
                    className='tambahwarga'>
                    Tambah Warga
                </div>

                <div className='datawarga_content'>
                    <table className='datawarga_table'>
                        <tr className='theader'>
                            <th className='th1'>No</th>
                            <th className='th2'>NKK</th>
                            <th className='th3'>Nama</th>
                            <th className='th4'>Alamat</th>
                        </tr>
                    </table>
                    <table className='datawarga_table_content'>
                        {exampledata.map((item, index) => {
                            return (
                                <tr className='tdata'>
                                    <td className='th1'>{index + 1}</td>
                                    <td className='th2'>{item.nkk}</td>
                                    <td className='th3'>{item.nama}</td>
                                    <td className='th4'>{item.alamat}</td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            </div>
        </>
    );
}

export default DataWarga;
