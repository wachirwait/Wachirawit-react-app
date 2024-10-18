import { useNavigate } from "@remix-run/react";
import { useState } from "react";

export default function BookForm() {
    const navigate = useNavigate();
    const [stock, setStock] = useState('In-stock');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        console.log('Form data being submitted:', formJson);
        try {
            const response = await fetch(
                'http://localhost:3002/api/addBook',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formJson)
                });

            if (response.ok) {
                const data = await response.json();
                alert('[INFO] บันทึกหนังสือใหม่เสร็จสิ้น');
                navigate('/sec02/bookLists');
            } else {
                const errorData = await response.json();
                alert(`[ERR] ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('[ERR] แจ้งข้อผิดพลาดระหว่างการ Submit form');
        }
    };
    return (
        <div className="container mx-auto m-6 p-5">
            <h1 className="font-bold text-3xl">เพิ่มหนังสือใหม่</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <label className="text-2xl ">ชื่อหนังสือ*:</label><br />
                <input type="text" name="bookTitle"required className="border border-green-700 shadow"/><br />
                <label className="text-2xl">รายละเอียด</label><br />
                <textarea rows={3} cols={50} name="bookDesc" className="border border-green-700 shadow " /><br />
                <label className="text-2xl">หมวดหมู่</label><br />
                <select name="bookCate" required className="shadow border border-green-700 text-xl"> 
                    <option value="">-เลือกหมวดหมู่-</option>
                    <option value={10}>วิทยาศาสตร์</option>
                    <option value={20}>เทคโนโลยี</option>
                    <option value={30}>คอมพิวเตอร์</option>
                </select><br />
                <label className="text-2xl">สถานะหนังสือในคลัง</label>
                <div className="p-3">
                    <input type="radio" name="bookStock" value="In-stock" defaultChecked={stock === 'In-stock'} />
                    <label className="text-2xl"> In-stock</label>
                </div>
                <div className="p-3">
                    <input type="radio" name="bookStock" value="out-of-stock" defaultChecked={stock === 'out-of-stock'} />
                    <label className="text-2xl"> Out-of-stock</label>
                </div>
                <button type="submit">บันทึก</button>
                <button type="reset">เคลียร์</button>    
            </form>
        </div>
    );
}
