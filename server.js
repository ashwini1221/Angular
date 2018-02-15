 const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const Author = require('./db/appdb');
const cors = require('cors');
const port= 3000;

const authors =[
    {_id:1,fName:'Ashwini',lName:'Yeleti'},
    {_id:2,fName:'Ashu',lName:'Reddy'},
    {_id:3,fName:'Ashhhh',lName:'Yeleti'}
];
app.use(bodyParser());
app.use(cors());

app.get('/',(req,resp)=>{
    resp.send('Hello World');
});
 app.get('/sayHello',(req,resp)=>{
     resp.send('Hello to express');
 });
 app.get('/authors',function (req,resp) {
     Author.find(function (err,docs) {
         console.log(docs);
         if(err){
             resp.status(500).send(err);
         }
         resp.status(200).send(docs);
     });
 });

 app.get('/authors/:id',function (req,resp) {
     let id = req.params.id;
     Author.findOne({_id:id},function (err,docs) {
         console.log(docs);
         if(err){
             resp.status(500).send(err);
         }
         resp.status(200).send(docs);
     });
 });

 app.post('/Authors',(req,resp) => {
     let au = req.body;
     var query = Author.find({});
 query.select('_id');
 query.sort({'_id': -1});
 query.limit(1);
 query.exec((err, docs) => {
     //au._id = docs[0]._id + 1;
     au._id = docs[0]._id + 1;
 let author = new Author({_id: au._id, fName: au.fName, lName: au.lName, mName: au.mName});
 author.save((err, doc) => {
     if(err) {
         resp.status(500).send(doc);
     }
     resp.status(201).send(doc);
 })
 });
 });

 app.put('/authors/:id',(req,resp)=>{
     let author=req.body;
     let id= parseInt(req.params.id);
     let index = authors.findIndex(a=>a._id === id);
     authors[index] = author;
     resp.send(authors);
 });

 app.delete('/authors/:id',(req,resp)=>{
     Author.remove({_id:req.params.id},function (err) {
     if(err){
         resp.status(500).send(err);
     }
     let response={
         message:'Author delete succesfull',
         id:req.params.id
     }
     resp.send(response);
 });
 });

/* app.delete('/authors/:id',(req,resp)=>{
     let id = parseInt(req.params.id);
     let index=authors.findIndex(a=>a._id === id);
     authors.splice(index,1);
     resp.send(authors);
 });*/

app.listen(port,()=>console.log('server started on port '+port));