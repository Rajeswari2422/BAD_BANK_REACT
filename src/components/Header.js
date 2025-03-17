import React from 'react';
import './styles/Header.css';
import './styles/styles.css';

const Header = () => (
  <header className="header">
    
    <h1>Bank of Demo</h1>
  </header>
);
const App = () => (
  <div>
    <Header />
    <main className="container">
      {/* Main content goes here */}
    </main>
  </div>
);

export default App;
