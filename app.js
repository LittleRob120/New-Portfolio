const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { readJson, writeJson } = require('./utils/jsonDb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
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

// ===================== PROJETOS =====================

app.get('/projetos', (req, res) => {
    const projetos = readJson('projetos.json');
    res.json(projetos);
});

app.get('/projetos/:id', (req, res) => {
    const projetos = readJson('projetos.json');
    const projeto = projetos.find(p => p.id == req.params.id);
    if (!projeto) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(projeto);
});

app.post('/projetos', (req, res) => {
    const projetos = readJson('projetos.json');
    const novoProjeto = { id: Date.now().toString(), ...req.body };
    projetos.push(novoProjeto);
    writeJson('projetos.json', projetos);
    res.status(201).json(novoProjeto);
});

app.put('/projetos/:id', (req, res) => {
    const projetos = readJson('projetos.json');
    const idx = projetos.findIndex(p => p.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Projeto não encontrado' });
    projetos[idx] = { ...projetos[idx], ...req.body };
    writeJson('projetos.json', projetos);
    res.json(projetos[idx]);
});

app.delete('/projetos/:id', (req, res) => {
    let projetos = readJson('projetos.json');
    const idx = projetos.findIndex(p => p.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Projeto não encontrado' });
    const excluido = projetos.splice(idx, 1)[0];
    writeJson('projetos.json', projetos);
    res.json(excluido);
});

// ===================== COMPETENCIAS =====================

app.get('/competencias', (req, res) => {
    const competencias = readJson('competencias.json');
    res.json(competencias);
});

app.get('/competencias/:id', (req, res) => {
    const competencias = readJson('competencias.json');
    const competencia = competencias.find(c => c.id == req.params.id);
    if (!competencia) return res.status(404).json({ error: 'Competência não encontrada' });
    res.json(competencia);
});

app.post('/competencias', (req, res) => {
    const competencias = readJson('competencias.json');
    const novaCompetencia = { id: Date.now().toString(), ...req.body };
    competencias.push(novaCompetencia);
    writeJson('competencias.json', competencias);
    res.status(201).json(novaCompetencia);
});

app.put('/competencias/:id', (req, res) => {
    const competencias = readJson('competencias.json');
    const idx = competencias.findIndex(c => c.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Competência não encontrada' });
    competencias[idx] = { ...competencias[idx], ...req.body };
    writeJson('competencias.json', competencias);
    res.json(competencias[idx]);
});

app.delete('/competencias/:id', (req, res) => {
    let competencias = readJson('competencias.json');
    const idx = competencias.findIndex(c => c.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Competência não encontrada' });
    const excluida = competencias.splice(idx, 1)[0];
    writeJson('competencias.json', competencias);
    res.json(excluida);
});

// ===================== CONTATOS =====================

app.get('/contatos', (req, res) => {
    const contatos = readJson('contatos.json');
    res.json(contatos);
});

app.get('/contatos/:id', (req, res) => {
    const contatos = readJson('contatos.json');
    const contato = contatos.find(c => c.id == req.params.id);
    if (!contato) return res.status(404).json({ error: 'Contato não encontrado' });
    res.json(contato);
});

app.post('/contatos', (req, res) => {
    const contatos = readJson('contatos.json');
    const novoContato = { id: Date.now().toString(), ...req.body };
    contatos.push(novoContato);
    writeJson('contatos.json', contatos);
    res.status(201).json(novoContato);
});

app.put('/contatos/:id', (req, res) => {
    const contatos = readJson('contatos.json');
    const idx = contatos.findIndex(c => c.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Contato não encontrado' });
    contatos[idx] = { ...contatos[idx], ...req.body };
    writeJson('contatos.json', contatos);
    res.json(contatos[idx]);
});

app.delete('/contatos/:id', (req, res) => {
    let contatos = readJson('contatos.json');
    const idx = contatos.findIndex(c => c.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Contato não encontrado' });
    const excluido = contatos.splice(idx, 1)[0];
    writeJson('contatos.json', contatos);
    res.json(excluido);
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
