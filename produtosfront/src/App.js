import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Produtos from "./pages/Produtos/Produtos";

function App() {
  const [produtos, setProdutos] = useState([]);

  const buscarProdutos = async () => {
    try {
      const response = await fetch("http://localhost:4567/produtos");
      const data = await response.json();

      //mapeia os registros json para objetos e armazena no estado produtos
      setProdutos(
        data.map((item) => ({
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          estoque: item.estoque,
          categoria: item.categoria?.nome || "Sem categoria", // Extrai apenas o nome
        }))
      );
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };


  // Pega os produtos da api quando o app e montado
  useEffect(() => {
    buscarProdutos();
  }, []);

  useEffect(() => {
    console.log("Produtos atualizados:", produtos);
  }, [produtos]);

  return (
    <div className="App">
      <Header />
      <Produtos
        produtos={produtos}
        setProdutos={setProdutos}
        buscarProdutos={buscarProdutos}
      />
    </div>
  );
}

export default App;
