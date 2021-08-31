//studentserver.js
//basic RESTful web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');//web server uses this to manage files on a local computer


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'));

//POST,GET,PUT,DELETE methods 
app.post('/students', function(req,res){
    var record_id = new Date().getTime();

    var obj = {};
    obj.record_id = record_id;
    obj.first_name = req.body.first_name;
    obj.last_name = req.body.last_name;
    obj.gpa_name = req.body.gpa;
    obj.enrolled = req.body.enrolled;

    var str = JSON.stringify(obj,null, 2);

    fs.writeFile("students/" + record_id + ".json", str, function(err) {
        var rsp_obj = {};
        if(err) {
            rsp_obj.record_id = -1;
            rsp_obj.message = 'error - unable to create resource';
            return res.status(200).send(rsp_obj);
        } else{
            rsp_obj.record_id = record_id;
            rsp_obj.message = 'successfully created';
            return res.status(201).send(rsp_obj);
        }
    });//end of writeFile method
});//end of post method

app.listen(5678);//start server 
console.log('Server is running...');


