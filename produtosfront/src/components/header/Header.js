import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">Painel de Controle - Produtos</div>
      <nav className="nav">
        <ul>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/categorias">Categorias</Link></li>
        </ul>
      </nav>
    </header>
  );
}