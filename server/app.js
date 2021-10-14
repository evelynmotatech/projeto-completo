//FAZER A REQUIÇÃO DOS MÓDULOS DO NODE
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;
const department_controller = require("./department_controller");

//CRIAR A EXPRESSÃO EXPRESS;
const app = express();

app.use(express.json()); //transportado através do formato json;
app.use(express.urlencoded({extended:true})); //permite que os dados passem de uma página pra outra;
app.use(cors());

// CONECTAR AO BANCO DE DADOS
mongoose.connect("mongodb+srv://evelyn_mota:evelyn_mota@cluster0.bor2v.mongodb.net/aplicacao?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/departments', department_controller)

// CHECAR EM QUE PORTA A APLICAÇÃO IRÁ RODAR;
app.listen(3000, ()=>{
  console.log("Rodando na porta " + port)
});