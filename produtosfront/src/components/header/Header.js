import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">Painel de Controle - Produtos</div>
      <nav className="nav">
        <ul>
          <li><a href="/produtos">Produtos</a></li>
          <li><a href="/categorias">Categorias</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
      </nav>
    </header>
  );
}