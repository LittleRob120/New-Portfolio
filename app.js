const apiRouter = require('./db') 
const express = require('express');
const path = require('path');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/portfolio', apiRouter)
const port = 3000

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
    database: 'Portfolio'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL')
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const dados = {
        nome: "Gabriel Robert Sousa da Silva",
        curso: "Desenvolvimento de Software Multiplataforma",
        habilidades: [
            "Dinâmico e responsável",
            "Comunicativo",
            "Proativo",
            "Capacidade em trabalhar em equipe",
            "Bom em comunicação",
            "Conhecimento com Pacote Adobe"
        ],
        competencias: {
            linguagens: ["Python", "SQL", "HTML", "CSS", "JavaScript","Typescript", "C"],
            framework: ["Flask", "React", "Node.js"],
            ferramentas: ["Git", "MySQL", "VSCode Studio"]
        }
    };

    res.render('index', { dados });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
