import { useEffect } from "react";
import "./CardBansos.css";
import { useNavigate } from "react-router-dom";

function CardBansos(props) {
    const handleToggle = () => {
        props.formtoggle();
    };

    return (
        <>
            <div onClick={handleToggle} className='tombolcard'>
                Buat Bansos
            </div>
            <div className='bgcard'>
                {/* for every item in data */}
                {props.data.map((item) => {
                    return <Cards key={item.bansos_id} {...item} />;
                })}
            </div>
        </>
    );
}

function Cards(item) {
    const navigate = useNavigate();

    return (
        <>
            <div
                onClick={() => {
                    navigate(`/bansos/${item.bansos_id}`);
                }}
                className='card'>
                <div className='cardtitle'>
                    <h1>{item.nama_bansos}</h1>
                </div>
                <div className='cardbody'>
                    <p>
                        <b>ID : {item.bansos_id}</b>
                    </p>
                    <p>
                        <b>{item.tgl1.slice(0, 10)}</b> s.d <b>{item.tgl2.slice(0, 10)}</b>
                    </p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p>Count : </p>
                </div>
            </div>
        </>
    );
}

export default CardBansos;
