# 📘 Edupass Frontend - Plataforma de Oportunidades Educacionais

[![Status do Projeto](https://img.shields.io/badge/status-ativo-brightgreen.svg)](https://github.com/luismour/FrontEnd-Proleduca)
[![Construído com React](https://img.shields.io/badge/Built%20with-React%2019-61DAFB?logo=react)](https://react.dev/)
[![Estilo com TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS%204-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

O **Edupass Frontend** é a interface de usuário para a plataforma Edupass, um projeto inovador que visa **conectar estudantes a oportunidades educacionais transformadoras**, como bolsas de estudo e cursos de alta qualidade. Construído com tecnologias modernas e um foco na experiência do usuário, o frontend oferece uma navegação fluida e responsiva, tanto para alunos em busca de desenvolvimento quanto para administradores que gerenciam o ecossistema educacional.

Este projeto é parte integrante da iniciativa **Prol Educa** (`#AjudandoAEducar`), que tem a missão de impactar positivamente vidas através da educação.

## ✨ Visão Geral & Destaques

O Edupass é mais do que uma plataforma de bolsas; é um ecossistema que empodera:
* **Colaboradores:** Oferecendo acesso simplificado a oportunidades de desenvolvimento de carreira e pessoal.
* **Empresas:** Facilitando a gestão e o oferecimento de bolsas corporativas, promovendo o desenvolvimento e a retenção de talentos.
* **Instituições de Ensino:** Conectando-as a um público qualificado e engajado, otimizando seus processos de matrícula.

## 🚀 Principais Funcionalidades

O Edupass oferece um conjunto robusto de funcionalidades, tanto para o usuário final quanto para a administração da plataforma:

### **Para Alunos (Área do Usuário):**
* **Exploração de Oportunidades:** Visualização e filtragem avançada de milhares de bolsas de estudo e cursos.
    * Filtros por tipo de instituição (Superior, Escola, Técnico, Idiomas, Pós).
    * Filtros por curso desejado, instituição, cidade/estado.
    * Filtro de bolsas por porcentagem de desconto (até X%).
* **Autenticação Segura:** Cadastro e Login de usuários.
* **Inscrição Simplificada:** Fluxo de inscrição em bolsas e cursos, incluindo o cadastro de dados do bolsista.
* **Gestão de Bolsas:** Acompanhamento detalhado do status de suas inscrições ('Minhas Bolsas').
* **Gestão de Dependentes:** Cadastro e visualização dos cursos associados aos dependentes cadastrados.
* **Perfil do Usuário:** Visualização e edição das informações pessoais do perfil.

### **Painel Administrativo (`/admin`):**
* **Dashboard Abrangente:** Visão geral com estatísticas chave sobre instituições, cursos, usuários, bolsistas e inscrições, incluindo gráficos de distribuição de status e novas inscrições por mês.
* **Gestão de Entidades (CRUD):**
    * **Instituições:** Completo CRUD para escolas e universidades.
    * **Cursos:** Completo CRUD para cursos, com associação a instituições.
    * **Usuários (Clientes):** Gerenciamento de usuários, incluindo busca por nome, email ou CPF.
    * **Bolsistas:** Gestão de beneficiários de bolsas, com associação a clientes e validação de CPF.
* **Gerenciamento de Inscrições:** Visualização de detalhes e atualização do status das inscrições (Pendente, Confirmado, Cancelado, Inativo, Técnico).
* **Rotas Protegidas:** Acesso ao painel administrativo restrito a usuários com a `ROLE_ADMIN`.


## 💻 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e bibliotecas, garantindo uma base sólida e moderna:

* **Frontend Core:**
    * [**React 19**](https://react.dev/): Biblioteca JavaScript para construir interfaces de usuário eficientes e reativas.
    * [**Vite**](https://vitejs.dev/): Ferramenta de build de nova geração, proporcionando um ambiente de desenvolvimento rápido e otimizado para produção.
* **Estilização:**
    * [**Tailwind CSS v4**](https://tailwindcss.com/): Framework CSS utility-first para estilização rápida e responsiva, focando em um design limpo e modular.
* **Roteamento:**
    * [**React Router DOM v7**](https://reactrouter.com/): Para roteamento declarativo e navegação na aplicação.
* **Gerenciamento de Formulários & Validação:**
    * [**Formik**](https://formik.org/): Solução robusta para gerenciar o estado de formulários, validação e submissão.
    * [**Yup**](https://github.com/jquense/yup): Biblioteca de validação de esquemas de objetos, integrada ao Formik para validações eficientes.
* **Requisições API:**
    * [**Axios**](https://axios-http.com/): Cliente HTTP baseado em Promises, configurado com uma instância global (`axiosInstance`) para requisições autenticadas à API do backend.
* **Estado Global:**
    * **React Context API:** Para gerenciamento de estado global de funcionalidades como favoritos e oportunidades.
* **Visualização de Dados:**
    * [**Chart.js**](https://www.chartjs.org/) & [**React Chart.js 2**](https://react-chartjs-2.js.org/): Para criar gráficos interativos no Dashboard administrativo.
* **Ícones:**
    * [**React Icons**](https://react-icons.github.io/react-icons/): Coleção de ícones SVG para uso em componentes.

## ⚙️ Pré-requisitos e Instalação

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18.x ou superior recomendada) e o [npm](https://www.npmjs.com/) (ou [Yarn](https://yarnpkg.com/)) instalados na sua máquina.

### **Passos para Configuração:**

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/luismour/FrontEnd-Proleduca.git](https://github.com/luismour/FrontEnd-Proleduca.git)
    cd FrontEnd-Proleduca
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração do Backend (API):**
    Este frontend se conecta a um backend para buscar e enviar dados. Certifique-se de que a API do Edupass está rodando e acessível.
    * A URL base da API está configurada em `src/api/axiosInstance.js`. Por padrão, ela aponta para `https://proleduca-edupass-latest.onrender.com`.
    * Se você estiver utilizando uma instância local do backend ou uma URL diferente, **crie um arquivo `.env`** na raiz do projeto com a seguinte variável:
        ```env
        VITE_API_BASE_URL=http://localhost:8080 # Ou a URL da sua API
        ```
        E certifique-se de que `axiosInstance.js` esteja configurado para usar esta variável (ex: `baseURL: import.meta.env.VITE_API_BASE_URL || "https://proleduca-edupass-latest.onrender.com"`).

## 💻 Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes scripts:

* **`npm run dev`**
    Inicia o servidor de desenvolvimento Vite. Abra `http://localhost:5173` (ou a porta indicada no seu terminal) para visualizar a aplicação no navegador. A página será recarregada automaticamente a cada edição.

* **`npm run build`**
    Compila a aplicação para produção na pasta `dist/`. Este script otimiza o código para a melhor performance e prepara os arquivos para deploy.

* **`npm run lint`**
    Executa o ESLint para analisar o código JavaScript/JSX em busca de problemas, conforme as regras definidas em `eslint.config.js`.

* **`npm run preview`**
    Inicia um servidor local estático para pré-visualizar o build de produção da pasta `dist/`.

## 🔒 Autenticação e Autorização

O Edupass utiliza um sistema de autenticação baseado em tokens JWT (JSON Web Tokens).
* Após o login, o `accessToken` e as `roles` do usuário (`ROLE_USER`, `ROLE_ADMIN`) são armazenados no `localStorage`.
* As requisições para a API utilizam um interceptor no `axiosInstance` para anexar o token de autorização automaticamente.
* O Painel Administrativo (`/admin`) é protegido por uma `PrivateRoute`, que verifica a presença do token e se o usuário possui a `ROLE_ADMIN` antes de permitir o acesso.