import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { cards } from "./data";
import { act, useState } from "react";
import { useParams } from "@remix-run/react";



function IsMember({ active }: { active: boolean }) {

}


function Profile({ id, name, bio, bgp, img, username, create, active }
    : {
        id: number,
        name: string,
        bio: any,
        bgp: string,
        img: string,
        username: string,
        create: string,
        active: boolean,
    }) {
    return (
        <div className="max-w-sm w-full lg:max-w-full lg:flex">

            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                style={{
                    backgroundImage: (`url(${img})`),
                    color: "green"
                }}
                title="Woman holding a mug">
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">

                    <div className="text-gray-900 font-bold text-xl mb-2">{username}</div>
                    <p className="text-gray-700 text-base">{bio}</p>
                </div>
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src={bgp}
                        title="Wachirawit Chotchuang" />
                    <div className="text-sm">
                        <p className="text-gray-900 leading-none">{username}</p>
                        <p className="text-gray-600">{create}</p>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default function Mycards() {
    const [active, setActive] = useState(true);
    const myParams = useParams();

    const cardId = Number(myParams.cardId);
    

    const name = "Wachirawit Chotchuang";
    const note = "Web Programming #softwereengineer0ing";
    const note2 = "ddawdadadawwd ";
    const chk = true;

    const items = cards.filter(cardItem =>
        cardItem.id == cardId

    );

    const cardItems = items.map(cardItem =>
        <Profile
            id={cardItem.id}
            name={cardItem.name}
            bio={cardItem.biog}
            bgp={cardItem.bgProf}
            img={cardItem.userIcon}
            username={cardItem.userName}
            create={cardItem.createdat}
            active={cardItem.active}
        />
        // <>
        //     {cardItem.name} พูดไว้ว่า: {cardItem.biog}<br />

        // </>

    );
    function handlelickActive(){
        setActive(true);
        // alert("handlelickActive -->" +active);
        console.log("true");
        

    };

    function handlelicknonActive(){
        setActive(false);
        // alert("handlelicknonActive -->"+active);
        console.log("flase");
        
    };



    return (
        <>

                <h1 className="text-6xl font-black ">My Cards: Wachirawit Chotchuang</h1>
                <div className="flex flex-row">
                    <div className=" m-2 p-3 bg-green-200 rounded-full text-red-800 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 0 1 .672 0 41.059 41.059 0 0 1 8.198 5.424.75.75 0 0 1-.254 1.285 31.372 31.372 0 0 0-7.86 3.83.75.75 0 0 1-.84 0 31.508 31.508 0 0 0-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 0 1 3.305-2.033.75.75 0 0 0-.714-1.319 37 37 0 0 0-3.446 2.12A2.216 2.216 0 0 0 6 9.393v.38a31.293 31.293 0 0 0-4.28-1.746.75.75 0 0 1-.254-1.285 41.059 41.059 0 0 1 8.198-5.424ZM6 11.459a29.848 29.848 0 0 0-2.455-1.158 41.029 41.029 0 0 0-.39 3.114.75.75 0 0 0 .419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 1 0 1.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 0 1 3.095 2.348.75.75 0 0 0 .992 0 26.547 26.547 0 0 1 5.93-3.95.75.75 0 0 0 .42-.739 41.053 41.053 0 0 0-.39-3.114 29.925 29.925 0 0 0-5.199 2.801 2.25 2.25 0 0 1-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 0 1-1.084 3.45 26.503 26.503 0 0 0-1.281-.78A5.487 5.487 0 0 0 6 12v-.54Z" clipRule="evenodd" />
                        </svg>
                        {note}</div>
                    <div className="m-2 p-3 bg-green-200 rounded-full text-purple-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v4.59L7.3 9.24a.75.75 0 0 0-1.1 1.02l3.25 3.5a.75.75 0 0 0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02l-1.95 2.1V6.75Z" clipRule="evenodd" />
                        </svg>
                        {note2}</div>
                </div>
                {/* {Profile} */}
                {cardItems}
                <button className="m-3   bg-green-700 text-green-100 rounded-3xl" onClick={handlelickActive}>Activn</button>
                <button className="bg-red-700 text-red-100 rounded-3xl " onClick={handlelicknonActive} >nonAction </button>
        
        </>
    );

}