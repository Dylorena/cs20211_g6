import { useEffect, useState } from "react";
import { deletarImovelController, listarImoveisController } from "../../controllers/usuarioController";
import { Imovel } from "../../types/types";
import _ from 'lodash';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import './listarimoveis.scss';
import { toast } from "react-toastify";
import { useHistory } from "react-router";

function ListarImoveis() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  let history = useHistory();

  useEffect(() => {
    listarTodosImoveis();
  }, []);

  const listarTodosImoveis = async () => {
    const resp = await listarImoveisController();
    if (resp && resp.Success) {
      setImoveis(resp.Data);
    }
  };

  const ExcluirImovel = async (Imovel: Imovel) => {
    if (Imovel.idstatus === 1) {
      toast.warn("Não é possível excluir este imóvel pois encontra-se em negociação.");
    } else {
      const idUsuario = Number(sessionStorage.getItem('idUsuario')) || -1
      const resp = await deletarImovelController(Imovel.id, idUsuario);
      if (resp && resp.Success) {
        toast.success(resp.Message.toString());
      } else {
        toast.warn(resp?.Message.toString())
      }
    }
  }

  const CriarAluguel = async (imovel: Imovel) => {
    history.push("/criaraluguel", imovel);
  }

  const getStatus = (id: number, status: string) => {
    let classStatus;

    if (id === 1) {
      classStatus = "text-warning";
    } else {
      classStatus = "text-success";
    }

    return <p className={`${classStatus}`}>{status}</p>
  }

  return (
    <Card className="Card-imoveis container" style={{ marginTop: '10px' }}>
      <CardBody>
        {_.map(imoveis, (imovel, index) => {
          return <Card key={`Card-Imovel-${index}`}>
            <div className="card-img d-flex justify-content-center">
              <CardImg top src="http://cursos.eldman.com.br/theme/image.php/adaptable/format_tiles/1607375441/home" alt="Card image cap" />
            </div>
            <CardBody>
              <CardTitle tag="h5">{imovel.tipoimovel}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">{getStatus(imovel.idstatus, imovel.status)}</CardSubtitle>
              <CardText>{imovel.descricao}</CardText>

            </CardBody>
            <CardFooter className="d-flex justify-content-between">
              <Button title="Excluir" color="danger" onClick={() => ExcluirImovel(imovel)}><i className="fas fa-trash-alt" /></Button>
              <Button title="Excluir" color="success" onClick={() => CriarAluguel(imovel)}><i className="fas fa-plus" /></Button>
            </CardFooter>
          </Card>
        })}
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <Button title="voltar" color="success" outline onClick={() => history.push('/')}>Voltar</Button>
      </CardFooter>
    </Card>
  );
}

export default ListarImoveis;