const express = require('express')
const app = express()
const path = require("path")
const collection = require("./mongodb")
const postcreate = require("./mongodb")

app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}));
app.use(function(req, res, next){
    next();
})

// --------------------------------------------------------------------------------------------------------
//routing part here 
app.get('/', function (req, res) {
    res.render('homepage');
  })

app.get('/blog', function(req,res){
  res.render('blog');
})

app.get('/logging', function(req, res){
  res.render('logging');
})

app.get('/signup', function(req, res){
  res.render('signup')
})

// app.get('/', function (req, res) {
//   res.send('Hello aninda how are you')
// })

app.get('/aboutus', function(req,res) {
  res.render('aboutus')
})
app.get('/Menu', function (req, res) {
    res.render('index')
  }) 

app.get('/showpost', function(req, res){
  res.render('create blog')
})

app.get('/profile/:username', function (req, res) {
    res.send(`Hello form ${req.params.username}`)
})


// --------------------------------------------------------------------------------------------------

// Handle signup POST request

app.post('/signup', async (req, res) => {
  try {
    console.log(req.body); // Add this line to inspect the request body
    
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    const userData = await collection.create(data);
    console.log(userData);
    res.render("logging")
    res.send("Signup successful");
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Internal server error');
  }
})

// Handle login POST request
app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await collection.findOne({ name, password })
    if (user) {
      res.send('Login successful')
    } else {
      res.send('Invalid email or password')
    }
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).send('Internal server error')
  }
})


//blog part here : 

app.post('/Submit_Post', async (req, res) => {
  try {
    console.log(req.body); // Debugging: Check if request body is properly parsed

    // Extract data from request body
    const postData = {
      title: req.body.title,
      content: req.body.content
    };

    // Create a new post using Mongoose model
    const userData = await postcreate.create(postData);
    console.log(userData); // Debugging: Check if post is successfully created

    // Render the 'blog' template after successful post creation
    res.render("blog");

  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Internal server error');
  }
});


//

// Running the server part
app.listen(5000, () => {
  console.log('Server is running on port 3000');
});
