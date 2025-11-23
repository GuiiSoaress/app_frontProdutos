import React, { useState } from "react";
import "./Categorias.css";

export default function Categorias({ categorias, buscarCategorias }) {
  const [busca, setBusca] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nome: "",
  });

  function abrirAdicionar() {
    setEditingId(null);
    setForm({ nome: "" });
    setModalOpen(true);
  }

  function abrirEdicao(cat) {
    setEditingId(cat.id);
    setForm({
      nome: cat.nome,
    });
    setModalOpen(true);
  }

  function fecharPopup() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ nome: "" });
  }

  const salvarCategoria = async (nova) => {
    try {
      const response = await fetch("http://localhost:4567/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nova),
      });

      if (!response.ok) {
        alert("Erro ao criar a categoria!");
        console.error("Erro:", response.status, response.statusText);
        return;
      }

      const data = await response.json();

      if (data && data.id) {
        alert("Categoria Criada com Sucesso!");
      } else {
        alert("Categoria criada, mas resposta inválida do servidor.");
      }
    } catch (error) {
      console.error("ERROR: Erro ao adicionar", error);
    }

    buscarCategorias();
  };

  async function editarCategoria(id, categoria) {
    try {
      const response = await fetch(`http://localhost:4567/categorias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria),
      });

      const data = await response.json();
      console.log("Categoria atualizada!", data);
      alert("Categoria atualizada com sucesso!");
    } catch (error) {
      console.error("ERROR: Erro ao editar", error);
    }

    buscarCategorias();
  }

  function salvar() {
    if (!form.nome.trim()) {
      alert("Informe o nome da categoria.");
      return;
    }

    if (editingId === null) {
      const nextId = categorias.length
        ? Math.max(...categorias.map((c) => c.id)) + 1
        : 1;
      const nova = {
        id: nextId,
        nome: form.nome.trim(),
      };
      salvarCategoria(nova);
    } else {
      const nova = {
        nome: form.nome.trim(),
      };
      editarCategoria(editingId, nova);
    }

    fecharPopup();
  }

  const excluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        const response = await fetch(`http://localhost:4567/categorias/${id}`, {
          method: "DELETE",
        });

        if (response.status === 409) {
          alert("Não é possível deletar esta categoria pois existem produtos associados a ela.");
        } else if (response.status === 200) {
          alert("Categoria deletada com sucesso!");
        } else if (response.status === 404) {
          alert("Categoria não encontrada!");
        } else {
          alert("Erro ao deletar categoria.");
        }
      } catch (error) {
        console.log("ERROR: Erro ao deletar o registro!");
        alert("Erro ao deletar categoria.");
      }
      buscarCategorias();
    }
  };

  const categoriasFiltradas = categorias.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      String(c.id) === busca.trim()
  );

  return (
    <div className="categorias-container">
      <div className="top-bar">
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-add" onClick={abrirAdicionar}>
            + Adicionar Categoria
          </button>
        </div>

        <input
          className="input-busca"
          type="text"
          placeholder="Pesquisar por nome ou id..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="lista-categorias">
        {categoriasFiltradas.length === 0 && (
          <div className="vazio">Nenhuma categoria encontrada.</div>
        )}

        {categoriasFiltradas.map((cat) => (
          <div key={cat.id} className="item-categoria">
            <div className="info-categoria">
              <div className="linha-titulo">
                <strong className="nome-cat">{cat.nome}</strong>
              </div>

              <div className="detalhes">
                <span>
                  ID: <strong>{cat.id}</strong>
                </span>
              </div>
            </div>

            <div className="acoes">
              <button className="btn-editar" onClick={() => abrirEdicao(cat)}>
                Editar
              </button>
              <button className="btn-deletar" onClick={() => excluir(cat.id)}>
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
              {editingId === null ? "Adicionar Categoria" : "Editar Categoria"}
            </h3>

            <input
              type="text"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
            />

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