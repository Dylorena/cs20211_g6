import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { loginController } from "../../controllers/usuarioController";
import { toast } from "react-toastify";
import md5 from "md5";

function Login() {
  let history = useHistory();
  const [email, setemail] = useState('');
  const [senha, setsenha] = useState('');

  const logar = async () => {
    const user = {
      email,
      senha: md5(senha)
    }

    const result = await loginController(user);

    if (result && result.Success) {
      sessionStorage.setItem('isLogged', 'true')
      sessionStorage.setItem('idUsuario', String(result.idUser));
      history.push('/');
    } else {
      toast.warn(result?.Message.toString());
    }

  }

  return (
    <Form inline>
      <Label for="Email">
        E-mail
      </Label>
      <FormGroup>
        <Input
          id="Email"
          name="email"
          placeholder="E-mail"
          type="email"
          onChange={(e) => setemail(e.target.value)}
        />

      </FormGroup>

      <FormGroup className="mt-2">
        <Label for="Password">
          Senha
        </Label>
        <Input
          id="Password"
          name="password"
          placeholder="Senha"
          type="password"
          onChange={(e) => setsenha(e.target.value)}
        />

      </FormGroup>

      <Button onClick={() => logar()} className="mt-3">
        Entrar
      </Button>
    </Form>
  );
}

export default Login;