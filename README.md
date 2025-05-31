# 📘 Edupass Frontend - Plataforma de Oportunidades Educacionais

O **Edupass Frontend** é a interface de usuário para a plataforma Edupass, um projeto que visa conectar estudantes a oportunidades educacionais, bolsas de estudo e cursos. Construído com tecnologias modernas, o frontend oferece uma experiência de usuário fluida e responsiva para alunos e administradores.

Este projeto é parte da iniciativa **Prol Educa** (#AjudandoAEducar), focada em transformar vidas através da educação.

## ✨ Principais Funcionalidades

* **Para Alunos:**
    * Visualização e filtragem de oportunidades de bolsas de estudo.
    * Cadastro e Login de usuários.
    * Inscrição em bolsas e cursos.
    * Gerenciamento de bolsas adquiridas ("Minhas Bolsas").
    * Lista de cursos favoritos.
* **Painel Administrativo:**
    * Dashboard com visão geral do sistema.
    * CRUD (Criar, Ler, Editar, Excluir) para Instituições.
    * CRUD para Cursos, com associação a instituições.
    * CRUD para Usuários (Clientes).
    * CRUD para Bolsistas, com associação a clientes.
    * Gerenciamento de Inscrições (visualização de detalhes e atualização de status).
    * Modo escuro para melhor usabilidade.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

* **Frontend:**
    * [React 19](https://react.dev/) - Biblioteca JavaScript para construir interfaces de usuário.
    * [Vite](https://vitejs.dev/) - Ferramenta de build moderna e rápida para desenvolvimento frontend.
    * [Tailwind CSS v4](https://tailwindcss.com/) - Framework CSS utility-first para estilização rápida e responsiva.
    * [React Router DOM v7](https://reactrouter.com/) - Para roteamento declarativo.
    * [Formik](https://formik.org/) - Para gerenciamento de formulários.
    * [Yup](https://github.com/jquense/yup) - Para validação de esquemas de formulário.
    * [Axios](https://axios-http.com/) - Cliente HTTP baseado em Promises para requisições API.
    * React Context API - Para gerenciamento de estado global (ex: tema, oportunidades).
    * [React Icons](https://react-icons.github.io/react-icons/) - Para ícones SVG.
* **Ferramentas de Desenvolvimento:**
    * [ESLint](https://eslint.org/) - Para linting de código JavaScript/JSX.
    * [PostCSS](https://postcss.org/) - Ferramenta para transformar CSS com JavaScript (usada pelo Tailwind).
    * [Autoprefixer](https://github.com/postcss/autoprefixer) - Plugin PostCSS para adicionar prefixos de fornecedores.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18.x ou superior recomendada) e o [npm](https://www.npmjs.com/) (ou [Yarn](https://yarnpkg.com/)) instalados na sua máquina.

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/luismour/FrontEnd-Proleduca.git](https://github.com/luismour/FrontEnd-Proleduca.git)
    cd FrontEnd-Proleduca
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

3.  **Configuração do Backend:**
    Este frontend se conecta a um backend para buscar e enviar dados. Certifique-se de que o backend do Edupass está rodando e acessível. A URL base da API está configurada em `src/api/axiosInstance.js`. Por padrão, ela aponta para `https://proleduca-edupass-latest.onrender.com`. Se você tiver uma instância local do backend, pode ser necessário ajustar esta URL.

    _Se houver variáveis de ambiente necessárias (ex: `.env` para a URL da API), adicione instruções aqui._

## 💻 Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes scripts:

* **`npm run dev`**
    Inicia o servidor de desenvolvimento Vite. Abra [http://localhost:5173](http://localhost:5173) (ou a porta indicada no seu terminal) para visualizar no navegador. A página será recarregada automaticamente se você fizer edições.

* **`npm run build`**
    Compila a aplicação para produção na pasta `dist/`. Ele agrupa o React corretamente no modo de produção e otimiza o build para a melhor performance.

* **`npm run lint`**
    Executa o ESLint para analisar o código em busca de problemas e aplicar correções (se configurado).

* **`npm run preview`**
    Inicia um servidor local estático para pré-visualizar o build de produção da pasta `dist/`.

## 📂 Estrutura de Pastas Recomendada

A estrutura de pastas do projeto visa manter a organização e modularidade:

src/
├── api/          # Configuração do Axios e chamadas de API.
├── assets/       # Imagens, fontes e outros recursos estáticos.
├── components/   # Componentes React reutilizáveis (globais ou específicos de UI).
│   └── admin/    # Componentes específicos do painel de administração.
├── contexts/     # Context API do React para gerenciamento de estado global.
├── data/         # Dados mockados ou estáticos (se houver).
├── hooks/        # Hooks React personalizados.
├── pages/        # Componentes de página (renderizados pelas rotas).
│   └── admin/    # Páginas específicas do painel de administração.
├── utils/        # Funções utilitárias (ex: validações, formatação).
├── App.jsx       # Componente raiz da aplicação.
├── main.jsx      # Ponto de entrada do React e configuração do Router.
└── index.css     # Estilos globais e importação do Tailwind CSS.


## 🤝 Como Contribuir

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

Se você tem uma sugestão para melhorar este projeto, por favor, faça um fork do repositório e crie uma pull request. Você também pode simplesmente abrir uma issue com a tag "enhancement".
Não se esqueça de dar uma estrela ao projeto! Obrigado novamente!

1.  Faça um Fork do projeto
2.  Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4.  Faça Push para a Branch (`git push origin feature/AmazingFeature`)
5.  Abra uma Pull Request

## 📜 Licença

Este projeto está sob a Licença MIT. Veja o arquivo `LICENSE` (você precisará criar um se não existir) para mais detalhes.

---