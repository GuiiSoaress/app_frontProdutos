import React, { useState } from "react";
import "./Produtos.css";

export default function Produtos({
  produtos,
  setProdutos,
  buscarProdutos,
  categorias,
}) {
  const [busca, setBusca] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null -> adicionando; id -> editando
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    estoque: "",
    categoriaId: "",
  });

  // abrir modal para adicionar (limpa o form)
  function abrirAdicionar() {
    setEditingId(null);
    setForm({ nome: "", preco: "", estoque: "", categoriaId: "" }); // categoriaId em vez de categoria
    setModalOpen(true);
  }

  // abrir modal para editar (preenche o form)
  function abrirEdicao(prod) {
    console.log("Produto para editar:", prod);
    console.log("Categoria do produto:", prod.categoria);
    console.log("ID da categoria:", prod.categoria?.id);

    setEditingId(prod.id);
    setForm({
      nome: prod.nome,
      preco: String(prod.preco),
      estoque: String(prod.estoque),
      categoriaId: prod.categoria?.id || "",
    });
    setModalOpen(true);
  }

  function fecharPopup() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ nome: "", preco: "", estoque: "", categoriaId: "" }); // categoriaId em vez de categoria
  }

  const salvarProduto = async (novo) => {
    try {
      const response = await fetch("http://localhost:4567/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });

      if (!response.ok) {
        alert("Erro ao criar o produto!");
        console.error("Erro:", response.status, response.statusText);
        return;
      }

      const data = await response.json();

      if (data && data.id) {
        alert("Produto Criado com Sucesso!");
      } else {
        alert("Produto criado, mas resposta inválida do servidor.");
      }
    } catch (error) {
      console.error("ERROR: Erro ao adicionar", error);
    }

    //atualiza o array
    buscarProdutos();
  };

  // Função para editar produto
  async function editarProduto(id, produto) {
    try {
      const response = await fetch(`http://localhost:4567/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });

      const data = await response.json();
      console.log("Produto atualizado!", data);
    } catch (error) {
      console.error("ERROR: Erro ao adicionar", error);
    }

    // Recarrega a lista de produtos
    buscarProdutos();
  }

  function salvar() {
    // validações
    if (!form.nome.trim()) {
      alert("Informe o nome do produto.");
      return;
    }

    if (!form.preco || Number(form.preco) <= 0) {
      alert("Informe um preço válido.");
      return;
    }

    if (!form.estoque || Number(form.estoque) < 0) {
      alert("Informe uma quantidade de estoque válida.");
      return;
    }

    if (!form.categoriaId) {
      alert("Selecione uma categoria.");
      return;
    }

    const precoNum = Number(form.preco) || 0;
    const estoqueNum = Number(form.estoque) || 0;

    //verifica se é uma edicao ou novo produto
    if (editingId === null) {
      // adicionar
      const nextId = produtos.length
        ? Math.max(...produtos.map((p) => p.id)) + 1
        : 1;
      const novo = {
        id: nextId,
        nome: form.nome.trim(),
        preco: precoNum,
        estoque: estoqueNum,
        categoria: {
          id: Number(form.categoriaId), // Envia o ID da categoria selecionada
        },
      };
      console.log(novo);
      salvarProduto(novo);
      //setProdutos([novo, ...produtos]);
    } else {
      // editar
      const novo = {
        nome: form.nome.trim(),
        preco: precoNum,
        estoque: estoqueNum,
        categoria: {
          id: Number(form.categoriaId), // Envia o ID da categoria selecionada
        },
      };
      editarProduto(editingId, novo);
    }

    fecharPopup();
  }

  const excluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const response = await fetch(`http://localhost:4567/produtos/${id}`, {
          method: "DELETE",
        });

        alert(response.status !== 404 ? "Registro deletado!" : "ERRO");
      } catch (error) {
        console.log("ERROR: Erro ao deletar o registro!");
      }
      buscarProdutos();
    }
  };

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      (p.categoria?.nome &&
        p.categoria.nome.toLowerCase().includes(busca.toLowerCase())) ||
      String(p.id) === busca.trim()
  );

  return (
    <div className="produtos-container">
      <div className="top-bar">
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-add" onClick={abrirAdicionar}>
            + Adicionar Produto
          </button>
        </div>

        <input
          className="input-busca"
          type="text"
          placeholder="Pesquisar por nome, categoria ou id..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="lista-produtos">
        {produtosFiltrados.length === 0 && (
          <div className="vazio">Nenhum produto encontrado.</div>
        )}

        {produtosFiltrados.map((prod) => (
          <div key={prod.id} className="item-produto">
            <div className="info-produto">
              <div className="linha-titulo">
                <strong className="nome-prod">{prod.nome}</strong>
                <span className="categoria-badge">{prod.categoria.nome}</span>
              </div>

              <div className="detalhes">
                <span>
                  ID: <strong>{prod.id}</strong>
                </span>
                <span>
                  Preço: <strong>R$ {Number(prod.preco).toFixed(2)}</strong>
                </span>
                <span>
                  Estoque: <strong>{prod.estoque}</strong>
                </span>
              </div>
            </div>

            <div className="acoes">
              <button className="btn-editar" onClick={() => abrirEdicao(prod)}>
                Editar
              </button>
              <button className="btn-deletar" onClick={() => excluir(prod.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="popup-overlay" onClick={fecharPopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>
              {editingId === null ? "Adicionar Produto" : "Editar Produto"}
            </h3>

            <input
              type="text"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
            />

            <input
              type="number"
              placeholder="Preço"
              value={form.preco}
              onChange={(e) => setForm({ ...form, preco: e.target.value })}
              required
            />

            <input
              type="number"
              placeholder="Estoque"
              value={form.estoque}
              onChange={(e) => setForm({ ...form, estoque: e.target.value })}
            />

            <select
              value={form.categoriaId}
              onChange={(e) =>
                setForm({ ...form, categoriaId: e.target.value })
              }
              required
            >
              <option value="" required>
                Selecione uma categoria
              </option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>

            <div className="popup-buttons">
              <button className="btn-salvar" onClick={salvar}>
                Salvar
              </button>
              <button className="btn-cancelar" onClick={fecharPopup}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
