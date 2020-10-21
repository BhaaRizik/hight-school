const express = require('express')
const cor = require('cors')
const mysql = require('mysql')

const app = express()
//app.use(cor) ;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

const port = 4000

const sellect_All = 'SELECT * FROM student'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'highschool'
})

connection.connect(err => {
  if (err) {
    console.log('---------')
    return console.error('error: ' + err.message)
  }
  console.log('Connected to the MySQL server.')
})
//console.log(connection)

app.get('/login', (req, res) => {
  const { id, password } = req.query
  console.log('email: bhaa ' + id)
  console.log('password: ' + password)

  const loginQuery =
    "SELECT name FROM student where id='" +
    id +
    "' AND password='" +
    password +
    "';"
  connection.query(loginQuery, (err, results) => {
    if (err) {
      return res.send('notMatch')
    } else {
      return res.json({
        data: results
      })
      // return res.send("Successfully");
    }
  })
})

app.get('/items/add', (req, res) => {
  const { id, name } = req.query
  const insertQuery = `INSERT INTO student (id, name) VALUES ('${id}','${name}')`
  connection.query(insertQuery, (err, results) => {
    if (err) {
      return res.send(err.message)
    } else {
      return res.send('Successfuly added user')
    }
  })
})

app.get('/items', (req, res) => {
  connection.query(sellect_All, (err, results) => {
    if (err) {
      res.send('user not found')
      return res.send('user not found')
    } else {
      return res.json({
        data: results
      })
    }
  })
})

//app.use(cor());

app.get('/', function (req, res) {
  res.send('Hello')
})

app.listen(port, function () {
  console.log('server started in port: ' + port)
})
