var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/appdb', { useMongoClient: true });
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error: '))

var authorSchema = new Schema({
    _id:  {type:Number, required:true},
    fName: {type:String, required:true},
    lName:   String
},{collection:'author'});
var Author = mongoose.model('Author', authorSchema);

module.exports= Author;


