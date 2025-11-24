# Sistema de Gestão de Produtos

Sistema completo para gerenciamento de produtos com back-end em Java e front-end em React.

---

## 📋 Identificação

**Desenvolvedor:** Guilherme Soares da Silva  
**Matrícula:** 25173253

---

## 🚀 Configuração e Execução

### 1️⃣ Clonando o Repositório

```bash
git clone https://github.com/GuiiSoaress/app_frontProdutos__
cd app_frontProdutos__
```

---

## 🔧 Back-End (API Java)

#### 1. Configurar o Banco de Dados

1. Abra o **MySQL Workbench**
2. Localize o arquivo `BancoDeDados.sql` na pasta `produtosback`
3. Execute o script SQL para criar o banco de dados e as tabelas necessárias

#### 2. Configurar Credenciais do MySQL

Edite o arquivo de conexão com o banco:

```
📁 produtosback/src/util/connectionFactory.java
```

Altere a senha do usuário `root` para corresponder à configuração do MySQL na sua máquina:

```java
// Exemplo:
private static final String PASS = "sua_senha_aqui";
```

#### 3. Executar a API

1. Navegue até o arquivo principal:
   ```
   📁 produtosback/src/api/APIProduto.java
   ```

2. Execute o arquivo `ApiProduto.java` através da sua IDE ou terminal

3. A API estará disponível em:
   ```
   http://localhost:4567
   ```

---

## 💻 Front-End (React)

### Passo a Passo

#### 1. Acessar a pasta do front-end

```bash
cd produtosfront
```

#### 2. Instalar dependências

```bash
npm install
```

> **Nota:** Caso ocorra erro relacionado ao React Router, execute:
> ```bash
> npm install react-router-dom
> ```

#### 3. Executar o projeto

```bash
npm start
```

#### 4. Acessar no navegador

O sistema estará disponível em:
```
http://localhost:3000
```

---

## ✅ Verificação de Funcionamento

Após seguir todos os passos:

- ✔️ Back-end rodando em `http://localhost:4567`
- ✔️ Front-end rodando em `http://localhost:3000`
- ✔️ Banco de dados MySQL configurado e acessível
- ✔️ Integração completa entre front-end e back-end funcionando

---

## 🛠️ Solução de Problemas

### Erro de conexão com o banco
- Verifique se o MySQL está em execução
- Confirme se as credenciais no `connectionFactory.java` estão corretas
- Verifique se o banco de dados foi criado corretamente

### Erro no React Router
```bash
npm install react-router-dom
```

### Porta já em uso
- Back-end: Verifique se a porta 4567 está livre
- Front-end: Verifique se a porta 3000 está livre

---

## 📞 Suporte

Em caso de dúvidas ou problemas, entre em contato com o desenvolvedor através das informações fornecidas acima.
