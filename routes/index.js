const { resolveInclude } = require('ejs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const logedUser = global.usuarioLogin;

  res.render('index', {logedUser});

});

router.get('/sair', function(req, res){
  global.usuarioLogin = null;
  res.redirect('/')
})

router.get('/login', function(req, res){
  res.render('login')
})

router.get('/cadastroPaciente', function(req, res){
  res.render('cadastroPaciente')
})

router.get('/cadastroProfissional', function(req, res){
  res.render('cadastroProfissional')
})

router.post('/login', async function(req,res){
  const usuario = req.body.edtUserEmail
  const senha = req.body.edtPassword

  const user = await global.db.buscarUsuario({usuario, senha});

  global.usuarioLogin = user.userName;
  global.usuario = user.codUser;
  res.redirect('/')
})

router.post('/cadastroPaciente', async function(req,res){
  const email = req.body.edtCadUserEmail;
  const name = req.body.edtCadUserName;
  const cpf = req.body.edtCadUserCPF;
  const birth = req.body.edtCadUserBirth;
  const password = req.body.edtCadUserPassword;

  await global.db.insertPaciente({name, cpf, birth, password, email})
  res.redirect('/')
})

router.post('/cadastroProfissional', async function(req, res){
  const email = req.body.edtCadUserEmailProfissional;
  const name = req.body.edtCadUserNameProfissional;
  const cpf = req.body.edtCadUserCPFProfissional;
  const crp = req.body.edtCadUserCRPProfissional;
  const birth = req.body.edtCadUserBirthProfissional;
  const password = req.body.edtCadUserPasswordProfissional;

  await global.db.insertProfissional({name, cpf, crp, birth, password, email})
  res.redirect('/')
})


module.exports = router;
