const db = require('../config/database');

exports.listarTodosImoveis = async (req, res) => {
  const Data = await db.query(
    `select 
      i.id Id,
      i.tipoImovel TipoImovel, 
      i.descricao Descricao, 
      i.endereco Endereco, 
      s.nome Status,
      s.id idstatus
    from imovel i 
      inner join statusImovel s on i.statusImovel = s.id`,
  );

  const objReturn = {
    Success: true,
    Message: [],
    Data: Data.rows
  }
  res.status(200).send(objReturn);
};

exports.listarTodosClientes = async (req, res) => {
  const Data = await db.query(
    `select 
      u.id, 
      u.nome
    from usuario u
      inner join usuariotipo ut on u.id = ut.idusuario
    where idtipousuario = 2`,
  );

  const objReturn = {
    Success: true,
    Message: [],
    Data: Data.rows
  }
  res.status(200).send(objReturn);
};

exports.listarTodosCorretores = async (req, res) => {
  const Data = await db.query(
    `select 
      u.id, 
      u.nome
    from usuario u
      inner join usuariotipo ut on u.id = ut.idusuario
    where idtipousuario = 2`,
  );

  const objReturn = {
    Success: true,
    Message: [],
    Data: Data.rows
  }
  res.status(200).send(objReturn);
};

exports.listarTodosStatusImoveis = async (req, res) => {
  const response = await db.query('select * from statusImovel');
  res.status(200).send(response);
};

exports.deletarImovelPorId = async (req, res) => {
  const { idImovel, idUser } = req.body;
  let Success = true;
  let Message = [];

  const validacaoTipoUsuario = await db.query(`select idusuario from usuariotipo where idusuario = $1 and idtipousuario = 1`, [idUser]);
  const validacaoImovelExistente = await db.query(`select id from imovel where id = $1 `, [idImovel]);

  if (validacaoImovelExistente.rowCount === 0) {
    Message.push('Esse imóvel não existe. Verifique!');
    Success = false;

    return res.status(200).send({
      Message,
      Success,
    });
  }

  if (validacaoTipoUsuario.rowCount === 0) {
    Message.push('Você não tem permissão de perfil para exclusão de imóveis.');
    Success = false;

    return res.status(200).send({
      Message,
      Success,
    });
  }

  const validacaoImovelDisponivel = await db.query(`select id from imovel where id = $1 and statusImovel = 2`, [idImovel]);

  if (validacaoImovelDisponivel.rowCount > 0) {
    await db.query('DELETE FROM imovel WHERE id = $1', [
      parseInt(idImovel),
    ]);

    Message.push('Imóvel excluído com sucesso!.');
  } else {
    Message.push('Não é possível excluir este imóvel pois encontra-se em negociação.');
    Success = false;
  }

  res.status(200).send({
    Message,
    Success,
  });
};

exports.alterarStatusImovel = async (req, res) => {
  const { idImovel, idUser, novoStatus } = req.body;
  let Success = true;
  let Mensagem = [];

  const validacaoTipoUsuario = await db.query(`select id from usuario where id = $1 and tipoUsuario = 1`, [idUser]);
  const validacaoImovelExistente = await db.query(`select id from imovel where id = $1 `, [idImovel]);

  if (validacaoImovelExistente.rowCount === 0) {
    Mensagem.push('Esse imóvel não existe. Verifique!');
    Success = false;

    return res.status(200).send({
      Mensagem,
      Success,
    });
  }

  if (validacaoTipoUsuario.rowCount === 0) {
    Mensagem.push('Você não tem permissão de perfil para alteração de imóveis.');
    Success = false;

    return res.status(200).send({
      Mensagem,
      Success,
    });
  }

  const validacaoImovelDisponivel = await db.query(`select id from imovel where id = $1 and statusImovel = 2`, [idImovel]);

  if (validacaoImovelDisponivel.rowCount > 0) {
    await db.query('update imovel set statusimovel = $1 WHERE id = $2',
      [novoStatus, parseInt(idImovel)]);

    Mensagem.push('Imóvel alterado com sucesso!.');
  } else {
    Mensagem.push('Não é possível excluir este imóvel pois encontra-se em negociação.');
    Success = false;
  }

  res.status(200).send({
    Mensagem,
    Success,
  });
};

exports.criarAluguel = async (req, res) => {
  const { idImovel, idCliente, valorAluguel, idCorretor } = req.body;
  let Success = true;
  let Message = [];

  const validacaoQuantidadeImoveisUsuario = await db.query(
    'select * from aluguel where idCliente = $1',
    [idCliente],
  );

  if (validacaoQuantidadeImoveisUsuario.rowCount > 6) {
    Message.push('Não é possível vincular o CPF informado a este imóvel, pois o mesmo já consta vinculado a outros 6 aluguéis em vigência.');
    Success = false;

    return res.status(200).send({
      Message,
      Success,
    });
  }

  const validacaoImovelVinculadoCPF = await db.query(
    `select 
      statusimovel 
    from aluguel a 
      inner join imovel i on a.idimovel = i.id 
    where i.statusimovel = 1 
      and i.id = $1`,
    [idImovel],
  );

  if (validacaoImovelVinculadoCPF.rowCount > 0) {
    Message.push('Não é possível vincular outro CPF a um imóvel com status "Em negociação".');
    Success = false;

    return res.status(200).send({
      Message,
      Success,
    });
  }

  await db.query('insert into aluguel (idImovel, valorAluguel, idCliente, idCorretor) values ($1, $2, $3, $4)',
    [idImovel, valorAluguel, idCliente, idCorretor]);

  Message.push('Aluguel criado com sucesso!');

  res.status(200).send({
    Message,
    Success,
  });
};

// select distinct 
// s.nome,
// i.descricao,
// uc.nome Corretor,
// u.nome Cliente,
// i.tipoimovel,
// a.valoraluguel
// from usuario u
// inner join aluguel a on u.id = a.idCliente
// inner join usuario uc on uc.id = a.idcorretor
// inner join imovel i on a.idImovel = i.id
// inner join statusImovel s on s.id = i.statusimovel