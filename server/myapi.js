import express from 'express'
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors());

// http://localhost:300/
app.get('/', (req, res) => {
    res.send('Hi, my name is Wachirawit.');
});

// http://localhost:300/api/myprofile
app.get('/api/myprofile', (req, res) => {
    let myhtml = '<h1>MY Profile </h1>' ;
    myhtml+= '<p>Name: Wachirawit <br />';
    myhtml+= 'Email: <a href="Wachirawit.cho@rmutto.ac.th">Wachirawit.cho@rmutto.ac.th</a></p>';
    res.set('content-Type', 'text/html');
    res.end(myhtml);
});

//http://localhost:3000/api/getprofile/u100/o200
app.get('/api/getprofile/:userId/:orderId',(req, res) => {
    let {userId, orderId} = req.params;
    res.send(req.params);

});

//http://localhost:3000/api/getprofiles
app.get('/api/getprofiles', (req, res) => {
    let myProf = {
        '_id' : '1000',
        'fname' : 'Wachirawit',
        'lname' : 'Chotachuang',
        'major' : 'Information Technology',
        'img' : 'https://dragonball.guru/wp-content/uploads/2021/03/jiren-profile-pic-1.png',
        'email' : 'wachirawit@rmutto.ac.th'
    };
    res.json(myProf);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}.`);
});
