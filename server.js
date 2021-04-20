const express = require('express'); //pulls in express backend frame work
const mongoose = require('mongoose');
const cors = require("cors");

const app = express() //asigning express to a variable

// links to static files
app.use(express.static('resources'));

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.options('*', cors()) 


//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });


// uses .env file for server hookup
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//DB Config
const db = require('./config/keys').mongoURI;


// Connect to Mongo
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('The mongoose is on the loose'))
    .catch(err => console.log(err));

// routes
app.use('/api/message', require('./routes/api/message'));



const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));