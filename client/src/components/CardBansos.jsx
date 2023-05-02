import { useEffect } from "react";
import "./CardBansos.css";

function CardBansos(data) {
    // const [bansosdata, setBansosdata] = useState(data);
    useEffect(() => {
        console.log(data, "CARDBANSOS INITIALIZED");
    });

    return (
        <>
            <div className='bgcard'>
                {/* for every item in data */}
                {data.data.map((item) => {
                    return <Cards key={item.idbansos} {...item} />;
                })}
            </div>
        </>
    );
}

function Cards(item) {
    return (
        <>
            <div className='card'>
                <div className='cardtitle'>
                    <h1>{item.namabansos}</h1>
                </div>
                <div className='cardbody'>
                    <p>
                        <b>ID : {item.idbansos}</b>
                    </p>
                    <p>
                        <b>{item.tglbansos1}</b> s.d <b>{item.tglbansos2}</b>
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
