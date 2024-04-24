const express = require("express");
const app = express();
const path = require("path");
const { collection, postcreate, menuItemModel } = require("./mongodb");
const multer = require('multer');

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' directory

app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  next();
});


// --------------------------------------------------------------------------------------------------------
// Routing part here
app.get("/", function (req, res) {
  res.render("homepage");
});

app.get("/blog", function (req, res) {
  res.render("blog");
});

app.get("/logging", function (req, res) {
  res.render("logging");
});

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/aboutus", function (req, res) {
  res.render("aboutus");
});

app.get("/Menu", function (req, res) {
  res.render("menu");
});

app.get("/showpost", function (req, res) {
  res.render("create blog");
});

app.get("/userprofle", function (req, res) {
  res.render("userpannel");
});


app.get("/profile/:username", function (req, res) {
  res.send(`Hello from ${req.params.username}`);
});

// --------------------------------------------------------------------------------------------------

// Handle signup POST request
app.post("/signup", async (req, res) => {
  try {
    console.log(req.body); // Add this line to inspect the request body

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const userData = await collection.create(data);
    console.log(userData);
    res.render("logging");
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send("Internal server error");
  }
});

// Handle login POST request
app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await collection.findOne({ name, password });

    if (user) {
      res.render("userpannel", { username: user.name }); // Pass the username to the view
    } else {
      res.send("Invalid name or password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal server error");
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public', 'uploads');
    cb(null, uploadDir); // Set the upload directory
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFileName); // Use a unique filename
  }
});

const upload = multer({ storage: storage });

// Handle post submission with image upload
app.post("/Submit_Post", upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePath = req.file ? '/uploads/' + req.file.filename : '';

    const postData = {
      title: title,
      content: content,
      image: imagePath // Save the image path in the database
    };

    const newPost = await postcreate.create(postData);
    console.log(newPost);

    res.redirect("/blog"); // Redirect to the blog page after successful submission
  } catch (error) {
    console.error("Error submitting post:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/Submit_MenuItem", async (req, res) => {
  try {
    console.log(req.body); // Debugging: Check if request body is properly parsed

    // Extract data from request body
    const menuItemData = {
      name: req.body.name,
      description: req.body.description,
    };

    // Create a new menu item using Mongoose model
    const newMenuItem = await menuItemModel.create(menuItemData);
    console.log(newMenuItem); // Debugging: Check if menu item is successfully created

    // Redirect the user back to the menu page
    res.redirect("/menu");
  } catch (error) {
    console.error("Error submitting menu item:", error);
    res.status(500).send("Internal server error");
  }
});

// Running the server part
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
