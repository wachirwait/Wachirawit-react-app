import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { useState, useEffect } from "react"

export default function GetProfile() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/api/getprofiles');
            if (!response.ok) {
                console.log('Network response was not ok.')
            }
            const result = await response.json();
            setData(result);
            setLoading(false);
        }
        fetchData();
    }, []);
    if (loading) {
        return <p className="m-5 p-5">Loding....</p>;
    }
    return (
        <div className="m-5 p-5">
            <h1 className="text-2xl font-bold">
                Hi, user profile:
            </h1>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 "> <center>{data.fname} {data.lname} </center></div>
                    <img src={data.img} alt={data.im} />
                    <p className="text-gray-700 text-base" >
                        <center>
                            เรียนแผนก<br / >
                            {data.major}
                            </center>
                    </p>
                    <center>
                    <div className="text-gray-700 text-base"><a href={data.email}>wachirawit@rmutto.ac.th</a></div>
                    </center>
                </div>
            </div>
            <p>
                {/*{JSON.stringify(data)}*/}
            </p>
        </div>
    );
}