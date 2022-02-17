import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth } from './pages';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Route path="/" component={Home}/>
    </div>
  );
}

export default App;
