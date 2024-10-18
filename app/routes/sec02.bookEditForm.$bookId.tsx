import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";

export default function BookEditForm(){
    const navigate = useNavigate();
    const myParams = useParams();
    const bookId = myParams.dookId;

    const [bookData, setBookData] = useState({
       bookCode : '',
       bookTitle : '',
       bookDesc : '',
       bookCate : '',
    });
    const [categoryOption, setCategoryOption] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
          ...bookData,
          [name]: value
        });
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await fetch(`http://localhost:3002/api/getBookById/${bookId}`);
                if (data.ok) {
                    const json = await data.json();
                    setBookData(json);
                    setCategoryOption(json.bookCate);
                    console.log(json);
                    alert(json);
                } else {
                    alert('Failed to loaded data.');
                }
            }

            // call the function
            fetchData().catch(console.error);
        } catch (error) {
            alert('An error occurred while loading the data.');
        }
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(confirm('ยืนยันการแก้ไขข้อมูล?')){
        const form = e.target;
        const formData = new FormData(form);  
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        
        try {
            const response = await fetch('http://localhost:3002/api/updateBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formJson),
            });
    
     // -- (1) --
     if(response.ok){
        const myJson = await response.json();
        alert(`${myJson.message}`);
        navigate('/sec02/bookLists');
     }else{
        alert('[ERR] Failed to update the form');
     }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updatting the form');
        }
        return true;
      }
    };

    //-- Form Components --
    return (
        <div className="m-3">
            <h1 className="font-bold">แก้ไขหนังสือ</h1>
            <form method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="bookId" value={bookId} />
            <label>ชื่อหนังสือ</label>:<br />
            <input type="text" name="bookTitle" id="bookTitle" 
            onChange={handleChange} value={bookData.bookTitle} required /><br />
            <label>รายละเอียด</label>:<br />
            <textarea rows={3} cols={50} name="bookDesc" id="bookDesc"
                className="p-2" onChange={handleChange} 
                value={bookData.bookDesc}
            /><br />
            <label>หมวดหมู่</label>:<br />
            <select name="bookCate" id="bookCate" 
            value={bookData.bookCate} onChange={handleChange} required>
                <option value="">-เลือกหมวดหมู่-</option>
                <option value={10}>เทคโนโลยี</option>
                <option value={20}>คอมพิวเตอร์</option>
                <option value={30}>ทั่วไป</option>
            </select><br />
            <div className="p-3">
                <button type="submit">[ ยืนยัน ]</button>
                <button type="reset">[ เคลียร์ ]</button>
            </div>
            </form>
        </div>
    );
}