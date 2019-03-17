const express = require('express')
const app = express()
const mysql = require('mysql');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');

const database = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'tracking'
})

app.use(cors());
app.use(express.static(__dirname + '/dist/ITS'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/ITS'))



database.connect((err) => {
  if(err) throw err;
  console.log('db works!');  
})

app.post('/insert', (req, res) => {
  const lat = req.body['lat'];
  const lng = req.body['lng'];

  const sql = `INSERT INTO coordinates(latitude, longitude) VALUES(${lat}, ${lng})`;
  database.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
  });
});

app.get('/total', (req, res) => {
  for(let i = 4.00000; i <= 14.00000; i+= 0.00010) {
    const sql = `INSERT INTO coordinates(latitude, longitude) VALUES(5, ${i})`;
    database.query(sql, (err, result) => {
      if(err) throw err;
    })
  }
  res.send('asd');

})

app.get('/coordinates', (req, res) => {
  const sql = "SELECT * FROM coordinates LIMIT 100000";
  database.query(sql, (err, result) => {
    res.json(result);
  })
});

app.get('/insert', function(req, res) {
  res.sendFile(__dirname+ '/public/index.html');
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/ITS/index.html');
});

io.on('connection', function (socket) { 
  socket.on('insert', (data) => {
    const lat = data['latitude'] || 1;
    const lng = data['longitude'] || 1;
    const sql = `INSERT INTO coordinates(latitude, longitude) VALUES(${lat}, ${lng})`;
    database.query(sql, (err, result) => {
      if(err) throw err
      io.emit('receive', data)
    })
  })
})



server.listen(3000, () => {
  console.log('App is running')
});