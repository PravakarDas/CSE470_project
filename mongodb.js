const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost:27017/loggingsinup')

.then(()=>{
    console.log("mongodb connected");

})

.catch(()=>{
    console.log("finding error on Database");

})

const loggingsinupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {  // Changed from Email to email
        type:String,
        require: true
    },
    password: {
        type: String,
        required: true
    }
});

const postSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    content: {
        type:String,
        require:true
    }

})

//........................ post part

const loadblog = async(res, req) => {

    try{
        const posts = await postSchema.find({});
        res.render('showpost',{posts:posts});

    } catch(error){ 
        console.log(error.massage);
    }
}



//.......................

const collection = new mongoose.model("usercolleaction",loggingsinupSchema )
const postcreate = new mongoose.model('post', postSchema)
module.exports = collection
module.exports = postcreate


