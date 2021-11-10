import { Button, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import Lateral from "../../components/lateral/lateral";
import Login from "../../components/login/login";

function MenuImoveis(props: any) {
  let history = useHistory();
  const isLogged = props.location.state || JSON.parse(sessionStorage.getItem('isLogged') || 'false')

  const setshowNovoUsuario = () => {
    history.push("/novousuario");
  }

  const setshowListarImoveis = () => {
    history.push("/listarimoveis");
  }

  return (
    <>
      <Lateral />
      <main className="content">
        {isLogged ? (
          <>
            <Row>
              <Button
                type="button"
                className="btn"
                onClick={() => setshowNovoUsuario()}>Novo usuário
              </Button>
            </Row>
            <Row>
              <Button
                type="button"
                className="btn mt-3"
                onClick={() => setshowListarImoveis()}>Listar imóveis
              </Button>
            </Row>
          </>
        )
          : (
            <Login />
          )}

      </main>
    </>

  );
}

export default MenuImoveis;