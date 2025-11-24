README – Guia de Execução do Projeto
1. Identificação
  - Guilherme Soares da Silva - Matricula: 25173253

2. Instruções de Execução do Back-End 
-  Siga os passos abaixo para configurar e executar o servidor:
  2.1. Clonando o repositório
  -  Execute:
    -git clone https://github.com/GuiiSoaress/app_frontProdutos
  
  2.2. Configuração do Banco de Dados
  - Abra o MySQL Workbench.
  - Importe o arquivo BancoDeDados.sql localizado na pasta produtosback.
  - Execute o script para criar o banco e as tabelas.
    
  2.3. Ajustando credenciais do MySQL
  No arquivo src/util/connectionFactory.java:
  - Altere a senha do usuário root do MySQL conforme a senha da sua máquina.
    
  2.4. Instalando dependências e executando
  - Para executar o back-end execute o arquivo APIProduto na pasta produtosback/src/api/APIProduto
  - A Api ficara ativa na porta 4567 do localhost (localhost:4567)
    
3. Instruções de Execução do Front-End
  3.1. Acesse a pasta do front:
    cd produtosfront
  3.2. Instale dependências:
    npm install
  3.3. Execute o projeto:
    npm start
  3.4. Acesse pelo navegador:
    http://localhost:3000
    O sistema estará em funcionamento com a integração completa entre Front-End e Back-End.
   (em caso de erro do router use npm install react-router-dom)
    
