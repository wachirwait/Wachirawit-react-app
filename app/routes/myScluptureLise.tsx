import { useState } from "react";
import { sculptureList } from "./SculptureLise";

export default function EProject() {
    const [index, setIndex] = useState(0);
    const [sctList, setSctList] = useState(sculptureList);

    function handleClickNext() {
        if (index < sculptureList.length - 1) {
            setIndex(index + 1);
        }
    }
    function handleClickback() {
        if (index > 0) {
            setIndex(index - 1);
        }
    }


    let sculpture = sculptureList[index];

    return (
        <>
        <center>
            <button className="p-3 bg-green-700 text-white rounded-full " onClick={handleClickNext}>
                Next
            </button>
            <button className="p-3 m-3  bg-red-700 text-white rounded-full " onClick={handleClickback} >
                Back
            </button>
            <h2>
                <i>{sculpture.name}</i> โดย {sculpture.author}
            </h2>
            <h3>
                ({index + 1} จาก {sculptureList.length})
            </h3>
            <img 
                src={sculpture.URL}
                title={sculpture.name}
                style={{ maxWidth: '20%', height: 'auto' }}
            />
            <p>
                {sculpture.description}
            </p>
            <a href={sculpture.refer}
                target="_blank"
                className="text-blue-500"> คลิกเลยๆ</a>
            </center>
        </>
    );
    
}