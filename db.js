const express = require('express');
const router = express.Router();
const db = require('./database'); // Usa a conexão centralizada

function handleQuery(res, err, results, successMessage = null) {
    if (err) return res.status(500).json({ erro: err.message || err });
    if (successMessage) return res.status(200).json({ mensagem: successMessage, resultado: results });
    res.status(200).json(results);
}

router.post('/pessoa', (req, res) => {
    const { nome, curso } = req.body;
    db.query('INSERT INTO pessoa (nome, curso) VALUES (?, ?)', [nome, curso], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Pessoa criada com sucesso', id: result.insertId });
    });
});

router.get('/pessoa', (req, res) => {
    db.query('SELECT * FROM pessoa', (err, results) => handleQuery(res, err, results));
});

router.put('/pessoa/:id', (req, res) => {
    const { nome, curso } = req.body;
    db.query('UPDATE pessoa SET nome = ?, curso = ? WHERE id = ?', [nome, curso, req.params.id], (err, result) => handleQuery(res, err, result, 'Pessoa atualizada com sucesso'));
});

router.delete('/pessoa/:id', (req, res) => {
    db.query('DELETE FROM pessoa WHERE id = ?', [req.params.id], (err, result) => handleQuery(res, err, result, 'Pessoa deletada com sucesso'));
});

router.post('/habilidade', (req, res) => {
    const { pessoa_id, descricao } = req.body;
    db.query('INSERT INTO habilidade (pessoa_id, descricao) VALUES (?, ?)', [pessoa_id, descricao], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Habilidade criada com sucesso', id: result.insertId });
    });
});

router.get('/habilidade', (req, res) => {
    db.query('SELECT * FROM habilidade', (err, results) => handleQuery(res, err, results));
});

router.put('/habilidade/:id', (req, res) => {
    const { descricao } = req.body;
    db.query('UPDATE habilidade SET descricao = ? WHERE id = ?', [descricao, req.params.id], (err, result) => handleQuery(res, err, result, 'Habilidade atualizada com sucesso'));
});

router.delete('/habilidade/:id', (req, res) => {
    db.query('DELETE FROM habilidade WHERE id = ?', [req.params.id], (err, result) => handleQuery(res, err, result, 'Habilidade deletada com sucesso'));
});

router.post('/competencia_tipo', (req, res) => {
    const { nome } = req.body;
    db.query('INSERT INTO competencia_tipo (nome) VALUES (?)', [nome], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Tipo de competência criado com sucesso', id: result.insertId });
    });
});

router.get('/competencia_tipo', (req, res) => {
    db.query('SELECT * FROM competencia_tipo', (err, results) => handleQuery(res, err, results));
});

router.put('/competencia_tipo/:id', (req, res) => {
    const { nome } = req.body;
    db.query('UPDATE competencia_tipo SET nome = ? WHERE id = ?', [nome, req.params.id], (err, result) => handleQuery(res, err, result, 'Tipo de competência atualizado com sucesso'));
});

router.delete('/competencia_tipo/:id', (req, res) => {
    db.query('DELETE FROM competencia_tipo WHERE id = ?', [req.params.id], (err, result) => handleQuery(res, err, result, 'Tipo de competência deletado com sucesso'));
});

router.post('/competencia', (req, res) => {
    const { nome, tipo_id } = req.body;
    db.query('INSERT INTO competencia (nome, tipo_id) VALUES (?, ?)', [nome, tipo_id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Competência criada com sucesso', id: result.insertId });
    });
});

router.get('/competencia', (req, res) => {
    db.query('SELECT * FROM competencia', (err, results) => handleQuery(res, err, results));
});

router.put('/competencia/:id', (req, res) => {
    const { nome, tipo_id } = req.body;
    db.query('UPDATE competencia SET nome = ?, tipo_id = ? WHERE id = ?', [nome, tipo_id, req.params.id], (err, result) => handleQuery(res, err, result, 'Competência atualizada com sucesso'));
});

router.delete('/competencia/:id', (req, res) => {
    db.query('DELETE FROM competencia WHERE id = ?', [req.params.id], (err, result) => handleQuery(res, err, result, 'Competência deletada com sucesso'));
});

router.post('/pessoa_competencia', (req, res) => {
    const { pessoa_id, competencia_id } = req.body;
    db.query('INSERT INTO pessoa_competencia (pessoa_id, competencia_id) VALUES (?, ?)', [pessoa_id, competencia_id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Relacionamento pessoa-competência criado com sucesso', id: result.insertId });
    });
});

router.get('/pessoa_competencia', (req, res) => {
    db.query('SELECT * FROM pessoa_competencia', (err, results) => handleQuery(res, err, results));
});

router.put('/pessoa_competencia/:id', (req, res) => {
    const { pessoa_id, competencia_id } = req.body;
    db.query('UPDATE pessoa_competencia SET pessoa_id = ?, competencia_id = ? WHERE id = ?', [pessoa_id, competencia_id, req.params.id], (err, result) => handleQuery(res, err, result, 'Relacionamento pessoa-competência atualizado com sucesso'));
});

router.delete('/pessoa_competencia/:id', (req, res) => {
    db.query('DELETE FROM pessoa_competencia WHERE id = ?', [req.params.id], (err, result) => handleQuery(res, err, result, 'Relacionamento pessoa-competência deletado com sucesso'));
});

router.post('/projetos', (req, res) => {
    const { pro_titulo, pro_descicao, pro_img, pro_link, id } = req.body;
    db.query('INSERT INTO projetos (pro_titulo, pro_descicao, pro_img, pro_link, id) VALUES (?, ?, ?, ?, ?)',
        [pro_titulo, pro_descicao, pro_img, pro_link, id],
        (err, result) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(201).json({ mensagem: 'Projeto criado com sucesso', id: result.insertId });
        });
});

router.get('/projetos', (req, res) => {
    db.query('SELECT * FROM projetos', (err, results) => handleQuery(res, err, results));
});

router.put('/projetos/:pro_id', (req, res) => {
    const { pro_titulo, pro_descicao, pro_img, pro_link } = req.body;
    db.query('UPDATE projetos SET pro_titulo = ?, pro_descicao = ?, pro_img = ?, pro_link = ? WHERE pro_id = ?',
        [pro_titulo, pro_descicao, pro_img, pro_link, req.params.pro_id],
        (err, result) => handleQuery(res, err, result, 'Projeto atualizado com sucesso'));
});

router.delete('/projetos/:pro_id', (req, res) => {
    db.query('DELETE FROM projetos WHERE pro_id = ?', [req.params.pro_id], (err, result) => handleQuery(res, err, result, 'Projeto deletado com sucesso'));
});

module.exports = router;
