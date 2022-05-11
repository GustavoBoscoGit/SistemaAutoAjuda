const mysql = require("mysql2/promise");

async function conectarDB() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }

  const connection = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "PACproject",
  });

  global.connection = connection;
  return global.connection;
}

async function buscarUsuario(usuario){
    const conexao = await conectarDB();
    const sql = "select * from users where userName=? and userPassword=?;"
    const [user] = await conexao.query(sql,[usuario.usuario, usuario.senha]);
    return user[0];
}

async function insertPaciente(usuario){
  const conexao = await conectarDB();
  const sql = "insert into users (userName, userCPF, userBirth, userPassword, userEmail, userType) values (?,?,?,?,?,1);";

  return await conexao.query(sql, [usuario.name, usuario.cpf, usuario.birth, usuario.password, usuario.email])
}

async function insertProfissional(usuario){
  const conexao = await conectarDB();
  const sql = "insert into users (userName, userCPF, userCRP, userBirth, userPassword, userEmail, userType) values (?,?,?,?,?,?,2);";

  return await conexao.query(sql, [usuario.name, usuario.cpf, usuario.crp, usuario.birth, usuario.password, usuario.email])
}

  module.exports = { buscarUsuario, insertPaciente, insertProfissional };