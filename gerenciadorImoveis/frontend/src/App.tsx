import NovoUsuario from './views/novoUsuario';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import background from './key-2114455_1920.jpg'

function App() {
  const [showNovoUsuario, setshowNovoUsuario] = useState(false);

  return (
    <div className="App" >
      <ToastContainer position="top-center" autoClose={8000} />
      <header className="">
        <h2>CS Imóveis</h2>
      </header>
      <div className="main">
        <div className="image d-none d-sm-none d-md-block">
          <img src={background} alt="" />
        </div>
        <main className="content">
          {!showNovoUsuario ? (
            <Button type="button" className="btn" onClick={() => setshowNovoUsuario(true)}>Novo usuário</Button>
          ) : (
            <NovoUsuario toggleForm={setshowNovoUsuario} />
          )}

        </main>
      </div>
      <footer className="footer-app">
        <p>Desenvolvido por CS Imóveis</p>
      </footer>
    </div>
  );
}

export default App;
