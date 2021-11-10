import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import md5 from 'md5'
import { criarUsuarioController } from "../../controllers/usuarioController";
import { apenasNumeros } from "../../utils";
import './novoUsuario.css';
import Lateral from "../../components/lateral/lateral";

function NovoUsuario() {
  const [nome, setNome] = useState('');
  const [email, setemail] = useState('');
  const [senha, setsenha] = useState('');
  const [cpf, setcpf] = useState('');
  const [endereco, setendereco] = useState('');
  const [perfil, setperfil] = useState([] as Array<number>);
  const [cpfInvalid, setcpfInvalid] = useState(false);
  const [senhaInvalid, setsenhaInvalid] = useState(false);
  const [emailInvalid, setemailInvalid] = useState(false);
  const [perfilInvalido, setperfilInvalido] = useState(false);

  let history = useHistory();

  const validarFormulario = () => {
    let ehValido = true;
    if (cpf === '' || cpf === null) {
      setcpfInvalid(true);
      ehValido = false;
    }

    if (senha === '' || senha === null) {
      setsenhaInvalid(true);
      ehValido = false;
    }

    if (email === '' || email === null) {
      setemailInvalid(true);
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
        perfil,
        senha: md5(senha),
      }

      const resp = await criarUsuarioController(usuario);
      if (resp && resp.Success) {
        toast.success(resp.Mensagem.toString());
      } else {
        toast.error(resp.Mensagem.toString());
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

  const voltarPagina = () => {
    history.push("/");
  }

  const atualizaCPF = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (value.length === 3 || value.length === 7) value += ".";
    if (value.length === 11) value += "-";
    setcpf(value);
  }

  return (
    <>
      <Lateral />
      <Form className="novoUsuario">
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={email} onChange={(e) => setemail(e.target.value)} />
          {emailInvalid && <FormText color="danger">Email é obrigatório.</FormText>}
        </FormGroup>
        <FormGroup>
          <Label for="email">Senha</Label>
          <Input type="password" name="senha" id="senha" value={senha} onChange={(e) => setsenha(e.target.value)} />
          {senhaInvalid && <FormText color="danger">Senha é obrigatório.</FormText>}
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
            <Input type="checkbox" onChange={() => toggle(1)} />{' '}
            Gerenciador
          </Label>
          <Label check>
            <Input type="checkbox" onChange={() => toggle(2)} />{' '}
            Cliente
          </Label>
          <Label check>
            <Input type="checkbox" id="2" onChange={() => toggle(3)} />{' '}
            Corretor
          </Label>
        </FormGroup>
        <footer>
          <Button type="button" className="btn" onClick={() => voltarPagina()}>Voltar</Button>
          <Button type="button" className="btn" onClick={() => criarNovoUsuario()}>Criar usuário</Button>
        </footer>
      </Form>
    </>
  );
}

export default NovoUsuario;