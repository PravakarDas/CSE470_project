const express = require('express')
const app = express()

app.set("view engine", "ejs")
app.use(express.static('./public'))
app.use(function(req, res, next){
    next();
})

app.get('/', function (req, res) {
    res.render('homepage');
  })

// app.get('/', function (req, res) {
//   res.send('Hello aninda how are you')
// })

app.get('/Menu', function (req, res) {
    res.render('index')
  })

app.get('/profile/:username', function (req, res) {
    res.send(`Hello form ${req.params.username}`)
})

app.listen(3000, ()=> { 
  console.log('server is open post is 3000');
});