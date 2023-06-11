const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

// Banco de dados
let lista_produtos = [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
];

// Rota de teste
app.get('/', (req, res) => {
  res.send('Olá, estou ONLINE');
});

// Rota para obter todos os produtos
app.get('/produtos', (req, res) => {
  res.json(lista_produtos);
});

// Rota para obter um produto especifico por ID
app.get('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const produto = lista_produtos.find((produto) => produto.id === id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado!!' });
  }
});

// Rota para criar um produto
app.post('/produtos/', (req, res) => {
  const produto = req.body;
  lista_produtos.push(produto);
  res.status(201).json(produto);
});

// Rota para atualizar um produto
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const atualizarProduto = req.body;
  const index = lista_produtos.findIndex((produto) => produto.id === id);
  if (index !== -1) {
    lista_produtos[index] = { ...lista_produtos[index], ...atualizarProduto };
    res.json(lista_produtos[index]);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado!!' });
  }
});

// Rota para deletar um produto
app.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = lista_produtos.findIndex((produto) => produto.id === id);
  if (index !== -1) {
    const deleteProduto = lista_produtos.splice(index, 1);
    res.json(deleteProduto[0]);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado!!' });
  }
});

app.listen(port, () => {
  console.log(`SERVIDOR ONLINE NA PORTA: ${port}`);
});
