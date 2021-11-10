const db = require('../config/database');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  let Success = true;
  let Message = [];
  let idUser = -1;

  if (email === '' || senha === '') {
    Message.push('E-mail e senha são obrigatórios');
    Success = false;

    return res.status(200).send({
      Message,
      Success,
    });
  }

  const validation = await db.query(`select id from usuario where email = '${email}' and senha = '${senha}'`);

  if (validation.rowCount === 0) {
    Message.push('E-mail ou senha incorreto. Verifique!');
    Success = false;
  } else {
    idUser = validation.rows[0].id;
  }

  res.status(200).send({
    Message,
    Success,
    idUser
  });
};

exports.criarUsuario = async (req, res) => {
  const { cpf, perfil, email, endereco, nome, senha } = req.body;
  let Success = true;
  let Mensagem = [];

  if (cpf === '') {
    Mensagem.push('CPF é obrigatório!');
    Success = false;
  };

  if (senha === '') {
    Mensagem.push('Senha é obrigatório!');
    Success = false;
  };

  if (perfil.length === 0) {
    Mensagem.push('Perfil é obrigatório!');
    Success = false;
  };

  if (Success) {
    const validation = await db.query(`select cpfUsuario from usuario where cpfUsuario = '${cpf}'`);

    if (validation.rowCount === 0) {
      try {
        let response = await db.query(
          `INSERT INTO 
            usuario (cpfUsuario, nome, email, endereco, senha) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, [cpf, nome, email, endereco, senha],
        );

        let idusuario = response.rows[0].id;

        perfil.map(async (p) => {
          let response = await db.query(
            `INSERT INTO 
              usuariotipo (idusuario, idtipousuario) 
              VALUES ($1, $2)`, [idusuario, p],
          );
        });

        Mensagem.push('Usuário cadastrado com sucesso!');
      } catch (error) {
        console.log(error);
        Mensagem.push('Erro ao inserir usuário, contate o suporte ou tente mais tarde.');
        Success = false;
      }

    } else {
      Mensagem.push('Não é permitido cadastrar usuário duplicado. Verifique!');
      Success = false;
    }
  }

  res.status(201).send({
    Mensagem,
    Success,
  });
};
