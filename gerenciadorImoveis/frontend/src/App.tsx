import NovoUsuario from './views/novoUsuario/novoUsuario';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuImoveis from './views/menu/menu';
import ListarImoveis from './views/listarimoveis/listarImoveis';
import CriarAluguel from './views/aluguel/criaraluguel';

function App() {

  window.onunload = () => {
    sessionStorage.clear();
  }

  return (

    <div className="App" >
      <ToastContainer position="top-center" autoClose={8000} />
      <header className="">
        <h2>CS Imóveis</h2>
      </header>
      <div className="main">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={MenuImoveis} />
            <Route path="/novousuario" component={NovoUsuario} />
            <Route path="/listarimoveis" component={ListarImoveis} />
            <Route path="/criaraluguel" render={(props) => <CriarAluguel {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
      <footer className="footer-app">
        <p>Desenvolvido por CS Imóveis</p>
      </footer>
    </div>

  );
}

export default App;
