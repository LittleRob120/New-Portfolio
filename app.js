const express = require('express');
const app = express();
const path = require('path');

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

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
