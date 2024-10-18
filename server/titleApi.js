import admin from "firebase-admin";
import bodyParser from "body-parser";
import cors from 'cors';
import express, { json } from "express"

import serviceAccount from "" with
{
  type: "json"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const prot = 3002;

app.use(bodyParser.json());
app.use(cors());

app.listen(prot, () => {
  console.log(`Web application listening on port ${prot}.`);
});

function addBook() {
  const bookRef = db.collection('Books').doc();
  const docRef = db.collection('Books').doc(bookRef.id);
  docRef.set(
    // Json Document
    {
      bookCode: bookRef.id,
      id: 'B1004',
      title: 'Test B1004'
    }
  );
  console.log('Book added.');
};

app.get('/addBook', (req, res) => {
  addBook(); //call function
  res.end('Add new book.');
})

async function addBookNew(tmpBookData) {
  const bookRef = db.collection('Books').doc();
  const docRef = db.collection('Books').doc(bookRef.id);
  let myData = {
    bookCode: bookRef.id,
    bookTitle: tmpBookData.bookTitle,
    bookDesc: tmpBookData.bookDesc,
    bookCate: tmpBookData.bookCate,
  }
  try {
    await docRef.set(myData);
    console.log('Book added.');
  } catch (error) {
    console.error('Error adding book:', error);
    throw error; // เพื่อให้สามารถจับได้ใน catch ของ app.post
  }
}

app.post('/api/addBook', async (req, res) => {
  const { bookTitle, bookDesc, bookCate } = req.body;
  const tmpData = { bookTitle, bookDesc, bookCate };

  try {
    await addBookNew(tmpData);
    res.status(200).json({ message: 'บันทึกข้อมูลสำเร็จ' });
  } catch (error) {
    console.error('Error in POST /api/addBook:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
});

// async function addBookNew(tmpDataBook){
//   const bookRef = db.collection('Books').doc();
//   const docRef = db.collection('Books').doc(bookRef.id);
//   await docRef.set(tmpDataBook);
//   console.log('Book added.');
// };

// app.post('/api/addBook', (req, res) => {
//   const {bookTitle , bookDesc, bookCate} = req.body;
//   const tmpData = {bookTitle , bookDesc, bookCate};
//   addBookNew(tmpData);
//   res.sendStatus(200).json({message: 'บันทึกข้อมูลสำเร็จ'});
// });
async function deleteBook(bookCode) {
  const docRef= db.collection("Books").doc(bookCode);
  await docRef.delete();
  console.log('Book deleted.');
}

app.delete('/api/deleteBook/:bookCode', (req, res) =>{
  const { bookCode } = req.params;
  deleteBook (bookCode);
  res.status(200).json({message: `[INFO] ลบข้อมูลหนังสือสำเร็จ`});
});

async function fetchBook() {
  const result = [];
  const bookRef = db.collection('Books');
  const docRef = await bookRef.get();
  docRef.forEach(doc => {
    result.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return JSON.stringify(result);
}

app.get('/getBooks', (req, res) => {
  res.set('Content-type', 'application/json');
  fetchBook().then((jsonData) => {
    res.send(jsonData);
  }).catch((error) => {
    res.send(error);
  });
});

async function fetchBookById() {
  const result = [];
  const bookRef = db.collection('Books').where('bookCode', '==', bookId);
  const docRef = await bookRef.get();
  docRef.forEach(doc => {
    result.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return (result);
}

//http://localhost:3002/api/getBookById
app.get('/api/getBookById/:bookId', (req, res) => {
  const { bookId } = req.params;
  res.set ('Content-type', 'application/json');
  fetchBookById(bookId).then((jsonData) => {
    res.send(jsonData[0]);
  }).catch((error) =>{
    res.send(error);
  });
});

async function updateBook(bookId, bookData){
  const docRef = db.collection('Books').doc(bookId);
  await docRef.update(bookData);
  console.log ('Book update!');

}

//http://localhost:3002/api/updateBook
app.post('/api/updateBook',(req,res) => {
  const {bookId, bookTitle, bookDesc, bookCate} = req.body;
  updateBook (bookId, {bookTitle, bookDesc, bookCate});
  res.status(200).json({ message: '[INFO] Book updated successfully.'})
});