const express = require('express');

const router = express.Router();

router.get('/imoveiscs', (req, res) => {
  res.status(200).send({
    Success: 'true',
    Message: 'Seja bem-vindo(a) a API da CS Imóveis.',
    Version: '1.0.0',
  });
});

module.exports = router;
