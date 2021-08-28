import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { criarUsuarioController } from "../controllers/usuarioController";
import { apenasNumeros } from "../utils";
import _ from 'lodash';
import './novoUsuario.css';

interface NovoUsuario {
  toggleForm: Function;
}

function NovoUsuario({ toggleForm }: NovoUsuario) {
  const [nome, setNome] = useState('');
  const [email, setemail] = useState('');
  const [cpf, setcpf] = useState('');
  const [endereco, setendereco] = useState('');
  const [perfil, setperfil] = useState([] as Array<number>);
  const [cpfInvalid, setcpfInvalid] = useState(false);
  const [perfilInvalido, setperfilInvalido] = useState(false);

  const validarFormulario = () => {
    let ehValido = true;
    if (cpf === '' || cpf === null) {
      setcpfInvalid(true);
      ehValido = false;
    }

    if (perfil.length === 0) {
      setperfilInvalido(true);
      ehValido = false;
    }

    return ehValido;
  }

  const criarNovoUsuario = async () => {
    if (validarFormulario()) {
      const usuario = {
        nome,
        email,
        cpf: apenasNumeros(cpf),
        endereco,
        perfil
      }

      const resp = await criarUsuarioController(usuario);
      if (resp && resp.Success) {
        toast.success(resp.Mensagem[0]);
      } else {
        toast.error(resp.Mensagem[0]);
      }
    }
  }

  const toggle = (id: number) => {
    const tempPerfil = perfil;
    if (tempPerfil.includes(id)) {
      const index = tempPerfil.findIndex(elemento => elemento === id);
      tempPerfil.splice(index, 1);
    } else {
      tempPerfil.push(id);
      if (perfilInvalido) {
        setperfilInvalido(false);
      }
    }
    setperfil(tempPerfil);
  }

  const atualizaCPF = (event: ChangeEvent<HTMLInputElement>) => {
    // COrrigir bug do backspace

    let value = event.target.value;
    if (value.length === 3 || value.length === 7) value += ".";
    if (value.length === 11) value += "-";
    setcpf(value);
  }

  return (
    <Form className="novoUsuario">
      <FormGroup>
        <Label for="nome">Nome</Label>
        <Input type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" value={email} onChange={(e) => setemail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="cpf">CPF</Label>
        <Input
          maxLength={14}
          placeholder="___.___.___-__"
          invalid={cpfInvalid}
          onFocus={() => setcpfInvalid(false)}
          type="text" name="cpf" id="cpf"
          value={cpf}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizaCPF(e)} />
        {cpfInvalid && <FormText color="danger">CPF é obrigatório.</FormText>}
      </FormGroup>
      <FormGroup>
        <Label for="endereco">Endereço</Label>
        <Input type="text" name="endereco" id="endereco" value={endereco} onChange={(e) => setendereco(e.target.value)} />
      </FormGroup>
      <FormGroup check className="d-flex flex-column align-items-baseline">
        <Label for="perfil">Perfil</Label>
        {perfilInvalido && <FormText color="danger">Selecione pelo menos um perfil.</FormText>}
        <Label check>
          <Input type="checkbox" onChange={() => toggle(0)} />{' '}
          Gerenciador
        </Label>
        <Label check>
          <Input type="checkbox" onChange={() => toggle(1)} />{' '}
          Cliente
        </Label>
        <Label check>
          <Input type="checkbox" id="2" onChange={() => toggle(2)} />{' '}
          Corretor
        </Label>
      </FormGroup>
      <footer>
        <Button type="button" className="btn" onClick={() => toggleForm(false)}>Voltar</Button>
        <Button type="button" className="btn" onClick={() => criarNovoUsuario()}>Criar usuário</Button>
      </footer>


    </Form>
  );
}

export default NovoUsuario;