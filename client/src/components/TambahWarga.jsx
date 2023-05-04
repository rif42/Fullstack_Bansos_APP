import React from "react";
import "./TambahWarga.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";

function TambahWarga(props) {
    const [tambahwargadata, setTambahwargadata] = useState({});
    const normalNotify = (msg) => toast(msg);
    const errNotify = (msg) => toast.error(msg);

    const handleToggle = () => {
        props.formtoggle();
    };

    const updateData = (e) => {
        setTambahwargadata({
            ...tambahwargadata,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log(tambahwargadata, "FORM DATA");
        console.log(props.bansos_id, "BANSOS ID");

        try {
            Axios.post("http://localhost:3001/inputdatawarga", {
                bansos_id: props.bansos_id,
                nkk: tambahwargadata.nkk,
                nama: tambahwargadata.nama,
                alamat: tambahwargadata.alamat,
            }).then((res) => {
                if (res.data.err) {
                    errNotify(res.data.err.sqlMessage);
                } else {
                    normalNotify("Data Warga Berhasil Ditambahkan");
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const validate = () => {
        //check nama is 6-32 char
        if (tambahwargadata.nama.length < 5 || tambahwargadata.nama.length > 32) {
            errNotify("Nama harus lebih dari 6 dan kurang dari 32 karakter");
            return false;
        }

        // check if nama contains number
        if (/\d/.test(tambahwargadata.nama)) {
            errNotify("Nama tidak boleh mengandung angka");
            return false;
        }

        //check if nkk contains only number
        if (isNaN(tambahwargadata.nkk)) {
            errNotify("NKK harus berupa angka");
            return false;
        }

        if (tambahwargadata.nkk.length < 16 || tambahwargadata.nkk.length > 16) {
            errNotify("NKK harus 16 digit");
            return false;
        }

        //check alamat is less than 64
        if (tambahwargadata.alamat.length < 5 || tambahwargadata.alamat.length > 64) {
            errNotify("Alamat harus lebih dari 6 dan kurang dari 64 karakter");
            return false;
        }

        return true;
    };

    return (
        <div className='modalbg'>
            <ToastContainer />
            <div className='modal'>
                <p className='twargaform_title'>Silahkan Isi Data Warga</p>
                <form className='twargaform_form' onSubmit={submit}>
                    <div className='twargaform_formitems'>
                        <label className='twargaform_itemlabel' htmlFor='namabansos'>
                            Nama Kepala Keluarga :
                        </label>
                        <input
                            onChange={updateData}
                            className='twargaform_iteminput'
                            type='text'
                            id='nama'
                            name='nama'
                        />
                    </div>
                    <div className='twargaform_formitems'>
                        <label className='twargaform_itemlabel' htmlFor='namabansos'>
                            No Kartu Keluarga :
                        </label>
                        <input onChange={updateData} className='twargaform_iteminput' type='text' id='nkk' name='nkk' />
                    </div>

                    <div className='twargaform_formitems'>
                        <label className='twargaform_itemlabel' htmlFor='idbansos'>
                            Alamat :
                        </label>
                        <input
                            onChange={updateData}
                            className='twargaform_iteminput'
                            type='text'
                            id='alamat'
                            name='alamat'
                            required
                        />
                    </div>

                    <div className='twargaform_buttons'>
                        <button type='submit' className='twargaform_button1'>
                            Input Warga
                        </button>
                        <button onClick={handleToggle} type='reset' className='twargaform_button2'>
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TambahWarga;
