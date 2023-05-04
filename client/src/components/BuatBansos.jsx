import "./BuatBansos.css";
import { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { prop } from "react";

function BuatBansos(props) {
    const handleBatal = () => {
        props.formtoggle();
    };
    const bansosNotify = () => toast("Bansos Telah Dibuat!");
    const errNotify = (msg) => toast.error(msg);

    const [formdata, setFormData] = useState({});

    const updateData = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const updateSesi = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.id,
        });
    };

    const validate = () => {
        if (formdata.idbansos.length < 12 || formdata.idbansos.length > 12) {
            errNotify("ID Bansos harus 12 digit");
            return false;
        }

        if (isNaN(formdata.idbansos)) {
            errNotify("ID harus berupa angka");
            return false;
        }

        if (formdata.namabansos.length < 7 || formdata.namabansos.length > 32) {
            errNotify("Nama Bansos harus 6-32 karakter");
            return false;
        }

        return true;
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log(formdata);
        // console.log(formdata.idbansos, "ID BANSOS");

        try {
            Axios.post("http://localhost:3001/buatbansos", {
                bansos_id: formdata.idbansos,
                nama_bansos: formdata.namabansos,
                tgl1: formdata.tglbansos1,
                tgl2: formdata.tglbansos2,
                sesi: formdata.sesibansos,
            }).then((res) => {
                if (res.data.err) {
                    errNotify(res.data.err.sqlMessage);
                } else {
                    bansosNotify();
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <ToastContainer />

            <div className='bansosform'>
                <p className='bansostitle'>Silahkan Isi Keterangan Bansos</p>
                <form className='bansosform_form' onSubmit={submit}>
                    <div className='bansosform_formitems'>
                        <label className='bansosform_itemlabel' htmlFor='namabansos'>
                            Nama Bansos :
                        </label>
                        <input
                            onChange={updateData}
                            className='bansosform_iteminput'
                            type='text'
                            id='namabansos'
                            name='namabansos'
                        />
                    </div>
                    <div className='bansosform_formitems'>
                        <label className='bansosform_itemlabel' htmlFor='tglbansos1'>
                            Pilih Tanggal :
                        </label>
                        <input
                            onChange={updateData}
                            className='bansosform_tgl'
                            type='date'
                            id='tglbansos1'
                            name='tglbansos1'
                            required
                        />
                        <p style={{ paddingRight: "3%", paddingLeft: "3%" }}>s.d</p>
                        <input
                            onChange={updateData}
                            className='bansosform_tgl'
                            type='date'
                            id='tglbansos2'
                            name='tglbansos2'
                            required
                        />
                    </div>
                    <div className='bansosform_formitems'>
                        <label className='bansosform_itemlabel' htmlFor='idbansos'>
                            ID Bansos :
                        </label>
                        <input
                            onChange={updateData}
                            className='bansosform_iteminput'
                            type='text'
                            id='idbansos'
                            name='idbansos'
                            required
                        />
                    </div>

                    <div className='bansosform_formitems'>
                        <label className='bansosform_itemlabel' htmlFor='sesibansos'>
                            Sesi :
                        </label>
                        <label className='sesibansos_label' htmlFor='sesibansos1'>
                            Sesi 1
                        </label>
                        <input
                            onChange={updateSesi}
                            className='sesibansos_input'
                            type='radio'
                            id='1'
                            name='sesibansos'
                            required
                        />
                        <label className='sesibansos_label' htmlFor='sesibansos2'>
                            Sesi 2
                        </label>
                        <input
                            onChange={updateSesi}
                            className='sesibansos_input'
                            type='radio'
                            id='2'
                            name='sesibansos'
                            required
                        />
                        <label className='sesibansos_label' htmlFor='sesibansos3'>
                            Sesi 3
                        </label>
                        <input
                            onChange={updateSesi}
                            style={{ marginRight: 0 }}
                            className='sesibansos_input'
                            type='radio'
                            id='3'
                            name='sesibansos'
                            required
                        />
                    </div>
                    <div className='buatbansos_buttons'>
                        <button type='submit' className='buatbansos_button1'>
                            Buat Bansos
                        </button>
                        <button onClick={handleBatal} type='reset' className='buatbansos_button2'>
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default BuatBansos;
