import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Produtos from "./pages/Produtos/Produtos";
import Categorias from "./pages/Categorias/Categorias";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

    const buscarCategorias = async () => {
    try {
      const response = await fetch("http://localhost:4567/categorias");
      const data = await response.json();

      //mapeia os registros json para objetos e armazena no estado categorias
      setCategorias(
        data.map((item) => ({
          id: item.id,
          nome: item.nome
        }))
      );
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };


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
        categoria: item.categoria  // Mantenha o objeto completo {id, nome}
      }))
      );
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };


  // Pega os produtos da api quando o app e montado
  useEffect(() => {
    buscarCategorias();
    buscarProdutos();
  }, []);

  useEffect(() => {
    console.log("Produtos atualizados:", produtos);
  }, [produtos]);

    useEffect(() => {
    console.log("Categorias atualizadas:", categorias);
  }, [categorias]);


  return (
    <div className="App">
      <Header />

      <Categorias categorias={categorias} buscarCategorias={buscarCategorias} />


      {/* <Produtos
        produtos={produtos}
        setProdutos={setProdutos}
        buscarProdutos={buscarProdutos}
        categorias={categorias}
      /> */}
    </div>
  );
}

export default App;
