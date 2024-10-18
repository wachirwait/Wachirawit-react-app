import { useState } from "react";
import { useNavigate } from 'react-router-dom';

let nextId = 1;

export default function CreateCard() {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [num, setNum] = useState('');
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const handleClickadd = (na: string, no: string, nu: string) => {
    setCards([
      ...cards,
      {
        id: nextId++,
        name: na,
        note: no,
        num: nu
      }
    ]);
    setName('');
    setNote('');
    setNum('');
  }

  const handleViewClick = (card: any) => {
    navigate(`/cards/${card.id}/${card.name}/${card.note}/${card.num}`);
  };

  return (
    <div className="grid justify-center">
      <center><h1 className="text-bold">เพิ่มข้อมูล</h1></center>
      <label className="text-left">ชื่อ-สกุล</label>
      <input
        name="cName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: '400px',
          border: '2px solid rgba(0, 123, 255, 0.5)',
          borderRadius: '5px',
        }}
      />
      <label>ที่อยู่ปัจจุบัน</label>
      <textarea
        name="cNote"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{
          width: '400px',
          border: '2px solid rgba(0, 123, 255, 0.5)',
          borderRadius: '5px',
        }}
      />
      <label>เบอร์โทร</label>
      <input
        type="number"
        name="cNum"
        value={num}
        onChange={(e) => setNum(e.target.value)}
        style={{
          width: '400px',
          border: '2px solid rgba(0, 123, 255, 0.5)',
          borderRadius: '5px',
        }}
      /><br />
      <button
        className="add-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => handleClickadd(name, note, num)}
      >
        เพิ่มนามบัตร
      </button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">ชื่อ-สกุล</th>
            <th className="px-4 py-2">ที่อยู่ปัจจุบัน</th>
            <th className="px-4 py-2">เบอร์โทร</th>
            <th className="px-4 py-2">ดู</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td className="border px-4 py-2">{card.id}</td>
              <td className="border px-4 py-2">{card.name}</td>
              <td className="border px-4 py-2">{card.note}</td>
              <td className="border px-4 py-2">{card.num}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleViewClick(card)}>ดู</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
