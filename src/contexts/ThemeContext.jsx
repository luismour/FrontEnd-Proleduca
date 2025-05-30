// src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crie o contexto com um valor inicial undefined para pegar erros se usado fora do provider
const ThemeContext = createContext(undefined);

// 2. Crie o componente Provedor do Tema
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Tenta obter o tema do localStorage; se não existir, usa 'light' como padrão.
    // Você pode adicionar lógica para verificar a preferência do sistema operacional aqui se desejar.
    const storedTheme = localStorage.getItem('adminPanelTheme'); // Use uma chave específica para o tema do painel admin
    return storedTheme || 'light'; // 'light' ou 'dark'
  });


  useEffect(() => {
    const root = window.document.documentElement; 
    

    root.classList.remove('light', 'dark');
    root.classList.add(theme)
    localStorage.setItem('adminPanelTheme', theme);
    console.log(`Tema aplicado: ${theme}. Classe '${theme}' adicionada ao <html>.`);

  }, [theme]); 


  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log(`Alternando tema de ${prevTheme} para ${newTheme}`);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Crie um hook personalizado para usar o contexto do tema facilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  // Se o contexto for undefined, significa que useTheme foi chamado fora de um ThemeProvider
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};