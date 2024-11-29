const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
    'nome'| "João",
    "email"| "joao@teste.com",
    "senha"| "1234",
    "esportes"| ["Futebol", "Basquete"],
];


app.post('/register', (req, res) => {
    const { nome, email, senha, esportes } = req.body;
    if (!nome || !email || !senha || !esportes) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }
    users.push({ nome, email, senha, esportes });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});


app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const user = users.find(u => u.email === email && u.senha === senha);
    if (!user) {
        return res.status(401).json({ message: 'E-mail ou senha incorretos!' });
    }
    res.status(200).json({ nome: user.nome, esportes: user.esportes });
});


app.get('/sports', (req, res) => {
    res.json([
        'Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Natação', 'Boxe', 'Ciclismo', 'Atletismo'
    ]);
});


app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Cadastro e Login!');
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
