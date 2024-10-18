import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function BookLists() {
    const navigate = useNavigate();
    const [loadStatus, setLoadStatus] = useState(true);
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        if (loadStatus) {
            const fetchData = async () => { 
                try {
                    const response = await fetch('http://localhost:3002/getBooks');
                    if (response.ok) {
                        const bookJson = await response.json();
                        setBookData(bookJson);
                    } else {
                        alert('[ERR] ไม่สามารถอ่านข้อมูลได้สำเร็จ');
                    }
                } catch (error) {
                    alert('[ERR] เกิดข้อผิดพลาดในระหว่างการอ่านข้อมูลหนังสือ');
                } finally {
                    setLoadStatus(false); // เปลี่ยนสถานะหลังจากพยายามโหลดข้อมูล
                }
            }
            fetchData();
        }
    }, [loadStatus]);

    const handleDelete = async (bookCode) => {
        if (confirm(`คุณแน่ใจว่าต้องการลบหนังสือ: ${bookCode}?`)) {
            try {
                const response = await fetch(`http://localhost:3002/api/deleteBook/${bookCode}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    const myJson = await response.json();
                    alert(myJson.message);
                    setLoadStatus(true); // ตั้งค่า loadStatus เพื่อรีเฟรชรายการ
                } else {
                    alert(`[ERR] การลบข้อมูลไม่สำเร็จ`);
                }
            } catch (error) {
                alert(`[ERR] เกิดข้อผิดพลาดในระหว่างการลบข้อมูล: ${error}`);
            }
        }
    }

    return (
        <div className="m-3 p-3">
            <a href="/sec02/bookForm">[ เพิ่มหนังสือ ]</a>
            <h1 className="font-bold">รายการหนังสือ</h1>
            {
                bookData.map((item) => (
                    <div key={item.id} className="font-bold p-2 border">
                        {item.bookTitle}
                        <br />
                        <div>
                            <a href={`/sec02/bookDetail/${item.id}`}>[ รายละเอียด ]</a>
                            <a href={`/sec02/bookEditForm/${item.id}`}>[ แก้ไข ]</a>
                            <button onClick={() => handleDelete(item.id)}>[ ลบ ]</button>
                        </div>
                    </div>
                ))
            }
            <a href="/sec02/bookForm">[ ย้อนกลับ ]</a>
        </div>
    );
}
