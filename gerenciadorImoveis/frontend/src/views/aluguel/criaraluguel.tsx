import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Input, Row } from "reactstrap";
import Select from 'react-select';
import { criarAluguelController, listarClientesController, listarCorretoresController } from '../../controllers/usuarioController';
import { Imovel } from '../../types/types';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import './criaraluguel.scss'

interface option {
  value: number;
  field: string;
}

function CriarAluguel(props: any) {

  window.onunload = () => {
    sessionStorage.clear();
    history.push('/');
  }

  const [Corretores, setCorretores] = useState<any[]>([]);
  const [Clientes, setClientes] = useState<any[]>([]);
  const [Imovel, setImovel] = useState<Imovel>(props.location.state);
  const [ClienteSelecionado, setClienteSelecionado] = useState<option>();
  const [CorretorSelecionado, setCorretorSelecionado] = useState<option>();
  const [ValorAluguel, setValorAluguel] = useState('');

  let history = useHistory();

  useEffect(() => {
    listarCorretores();
    listarClientes();
  }, []);

  const listarCorretores = async () => {
    const resp = await listarCorretoresController();
    if (resp && resp.Success) {
      const opcoes = _.map(resp.Data, corretor => {
        return { label: corretor.nome, value: corretor.id }
      });
      setCorretores(opcoes);
    }
  };

  const listarClientes = async () => {
    const resp = await listarClientesController();
    if (resp && resp.Success) {
      const opcoes = _.map(resp.Data, cliente => {
        return { label: cliente.nome, value: cliente.id }
      });
      setClientes(opcoes);
    }
  };

  const CriarAluguel = async () => {
    const obj = {
      idImovel: Imovel.id,
      idCliente: ClienteSelecionado?.value || 0,
      valorAluguel: parseFloat(ValorAluguel),
      idCorretor: CorretorSelecionado?.value || 0
    };

    const resp = await criarAluguelController(obj);
    if (resp && resp.Success) {
      toast.success(resp.Message[0]);
      history.push('/listarimoveis');
    } else {
      toast.error(resp?.Message[0]);
    }
  }

  return (
    <Card style={{ width: '80vw', marginTop: '10px' }} className="container">
      <CardBody>
        <Row>
          <h3>Dados do imóvel</h3>
          <Col><strong>Tipo de imóvel</strong><p>{Imovel.tipoimovel}</p></Col>
          <Col><strong>Status</strong><p>{Imovel.status}</p></Col>
        </Row>
        <Row>
          <Col><strong>Descrição</strong><p>{Imovel.descricao}</p></Col>
        </Row>
        <Row>
          <Col><strong>Endereço</strong><p>{Imovel.endereco}</p></Col>
        </Row>
        <Row>
          <Col>
            <strong>Corretor</strong>
            <Select
              value={CorretorSelecionado}
              noResultsText="Nenhum resultado encontrado."
              onChange={(selected: any) => setCorretorSelecionado(selected)}
              options={Corretores}
              isSearchable
              placeholder=""
            />
          </Col>
          <Col>
            <strong>Cliente</strong>
            <Select
              noResultsText="Nenhum resultado encontrado."
              value={ClienteSelecionado}
              onChange={(selected: any) => setClienteSelecionado(selected)}
              options={Clientes}
              isSearchable
              placeholder=""
            />
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <strong>Valor aluguel R$</strong>
            <Input type="text" value={ValorAluguel} onChange={(e) => setValorAluguel(e.target.value)} />
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <Button title="voltar" color="success" outline onClick={() => history.push('/listarimoveis')}>Voltar</Button>
        <Button title="Criar Aluguel" color="success" onClick={() => CriarAluguel()}>Criar Aluguel</Button>
      </CardFooter>
    </Card>
  );
}

export default CriarAluguel;