const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//conexion con la bd
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'', 
    database: 'login'
});

//req es un objeto que contiene información sobre la solicitud HTTP que generó el evento. En respuesta a req, utiliza respara enviar la respuesta HTTP deseada.
app.get('/', (re, res) => {
    return res.json("Lado servidor");
})

//devuelve todos los usuarios
app.get('/alllogin', (req, res) => {
    const sql ="select * from login";
    db.query(sql, (err, data) => {
        if(err) return req.json(err);
        return res.json(data);
    })
})

//username id
app.get('/login/:id', (req, res) => {
    db.query('SELECT * FROM login WHERE id = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
})

//Comprobar login, es exite devuelve true sino devuelve false
app.post('/login', (req,res)=>{
    //let data = { username: req.params.a, password: req.params.b }
    let username = req.body.username;
    //console.log(username)
    let sql = "SELECT COUNT(*) as contador FROM login WHERE username = ?"
    db.query(sql, [username], function(err, result){
            //coger el dato del contador
            //console.log(result)
            var str=JSON.stringify(result);
            //console.log(str);
            var v =  JSON.parse(str);

            if(err){
               throw err
            }else{       
                //console.log(v[0].contador)  
                //console.log(username)
            if (v[0].contador==1){     
                //res.send("paso1") 
                res.send(true)
            }else{
                res.send(false) 
            }
        }
    })
})

app.listen(3000, () =>{
    console.log("escuchando puerto 3000");
})