import React, { useState } from "react";
import "./Produtos.css";

export default function Produtos({ produtos = [], setProdutos, buscarProdutos }) {

  const [busca, setBusca] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null -> adicionando; id -> editando
  const [form, setForm] = useState({ nome: "", preco: "", estoque: "", categoria: "" });

  // abrir modal para adicionar (limpa o form)
  function abrirAdicionar() {
    setEditingId(null);
    setForm({ nome: "", preco: "", estoque: "", categoria: "" });
    setModalOpen(true);
  }

  // abrir modal para editar (preenche o form)
  function abrirEdicao(prod) {
    setEditingId(prod.id);
    setForm({
      nome: prod.nome,
      preco: String(prod.preco),
      estoque: String(prod.estoque),
      categoria: prod.categoria || ""
    });
    setModalOpen(true);
  }

  function fecharPopup() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ nome: "", preco: "", estoque: "", categoria: "" });
  }

  function salvar() {
    if (!form.nome.trim()) {
      alert("Informe o nome do produto.");
      return;
    }

    const precoNum = Number(form.preco) || 0;
    const estoqueNum = Number(form.estoque) || 0;

    //verifica se é uma edicao ou novo produto
    if (editingId === null) {
      // adicionar
      const nextId = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
      const novo = {
        id: nextId,
        nome: form.nome.trim(),
        preco: precoNum,
        estoque: estoqueNum,
        categoria: form.categoria.trim() || "Sem categoria"
      };
      setProdutos([novo, ...produtos]);
    } else {
      // editar
      setProdutos(produtos.map(p =>
        p.id === editingId
          ? { ...p, nome: form.nome.trim(), preco: precoNum, estoque: estoqueNum, categoria: form.categoria.trim() || "Sem categoria" }
          : p
      ));
    }

    fecharPopup();
  }

  function excluir(id) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  }

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (p.categoria && p.categoria.toLowerCase().includes(busca.toLowerCase())) ||
    String(p.id) === busca.trim()
  );

  return (
    <div className="produtos-container">
      {/* Top bar */}
      <div className="top-bar">
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-add" onClick={abrirAdicionar}>+ Adicionar Produto</button>
        </div>

        <input
          className="input-busca"
          type="text"
          placeholder="Pesquisar por nome, categoria ou id..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Lista de produtos */}
      <div className="lista-produtos">
        {produtosFiltrados.length === 0 && (
          <div className="vazio">Nenhum produto encontrado.</div>
        )}

        {produtosFiltrados.map((prod) => (
          <div key={prod.id} className="item-produto">
            <div className="info-produto">
              <div className="linha-titulo">
                <strong className="nome-prod">{prod.nome}</strong>
                <span className="categoria-badge">{prod.categoria}</span>
              </div>

              <div className="detalhes">
                <span>ID: <strong>{prod.id}</strong></span>
                <span>Preço: <strong>R$ {Number(prod.preco).toFixed(2)}</strong></span>
                <span>Estoque: <strong>{prod.estoque}</strong></span>
              </div>
            </div>

            <div className="acoes">
              <button className="btn-editar" onClick={() => abrirEdicao(prod)}>Editar</button>
              <button className="btn-deletar" onClick={() => excluir(prod.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (Adicionar / Editar) */}
      {modalOpen && (
        <div className="popup-overlay" onClick={fecharPopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId === null ? "Adicionar Produto" : "Editar Produto"}</h3>

            <input
              type="text"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <input
              type="number"
              placeholder="Preço"
              value={form.preco}
              onChange={(e) => setForm({ ...form, preco: e.target.value })}
            />

            <input
              type="number"
              placeholder="Estoque"
              value={form.estoque}
              onChange={(e) => setForm({ ...form, estoque: e.target.value })}
            />

            <input
              type="text"
              placeholder="Categoria"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            />

            <div className="popup-buttons">
              <button className="btn-salvar" onClick={salvar}>Salvar</button>
              <button className="btn-cancelar" onClick={fecharPopup}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}