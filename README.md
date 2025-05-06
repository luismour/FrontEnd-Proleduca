# 📘 Edupass Frontend

Frontend da aplicação **Edupass**, desenvolvido com **React 19**, **Vite** e **Tailwind CSS**, estruturado de forma modular para facilitar o desenvolvimento e manutenção.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ React 19
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔁 React Router DOM v7
- ✅ Formik + Yup
- 🔗 Axios
- 🧠 React Context API
- 🎭 React Icons
- 🔤 React Input Mask

---

## 📁 Estrutura de Pastas

```bash
src/
├── assets/         # Imagens, ícones e recursos estáticos
├── components/     # Componentes reutilizáveis da UI
├── contexts/       # Contextos globais (ex: autenticação, tema)
├── data/           # Dados mockados ou estáticos
├── hooks/          # Hooks personalizados
├── pages/          # Páginas e rotas principais
├── App.jsx         # Componente principal da aplicação
├── main.jsx        # Ponto de entrada do React
├── index.css       # Estilos globais (Tailwind)
```

---

## 📦 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/luismour/FrontEnd-Proleduca.git
cd FrontEnd-Proleduca
```

2. **Instale as dependências:**
```bash
npm install
```

---

## 💻 Scripts Disponíveis

| Comando            | Ação                                     |
|--------------------|-------------------------------------------|
| `npm run dev`      | Inicia o servidor de desenvolvimento      |
| `npm run build`    | Cria a versão otimizada para produção     |
| `npm run preview`  | Executa um preview da build de produção   |
| `npm run lint`     | Executa o ESLint para análise de código   |

---

## 🧠 Gerenciamento de Estado

O projeto utiliza a **Context API do React** para gerenciar estados globais, mantendo a aplicação organizada e previsível.

---

## 🧪 Validação de Formulários

Validações feitas com:

- [`Formik`](https://formik.org/) — gerenciamento de formulários
- [`Yup`](https://github.com/jquense/yup) — esquemas de validação declarativa

---

## 🌐 Roteamento

A navegação é feita com [`react-router-dom`](https://reactrouter.com/) versão 7+, usando o sistema de rotas baseado em componentes.

---

## ✨ Estilo

- Estilização via **Tailwind CSS**
- Configurado via `tailwind.config.js` e `postcss.config.js`
- Totalmente responsivo

---

## 📄 Configurações do Projeto

- ESLint com plugins para React e Hooks
- Vite como bundler para desenvolvimento ultrarrápido
- Arquivo `.gitignore` configurado para excluir dependências e builds

---

## 🤝 Como Contribuir

1. Faça um fork
2. Crie sua branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova funcionalidade'`
4. Faça push: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📃 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.
