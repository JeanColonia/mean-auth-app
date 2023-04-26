const { validationResult } = require("express-validator");
const Usuario = require("./../model/Usuario");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");



const crearUsuario = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese email",
      });
    }

    const dbUser = new Usuario(req.body);

    //hashear passs

    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    //generar jwt

    const token = await generateJWT(dbUser._id, dbUser.name);

    // insertar en BD

    await dbUser.save();

    return res.status(201).json({
      ok: true,
      uid: dbUser._id,
      name,
      token,
      email: dbUser.email
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Call to Admin",
    });
  }
};

const login = async(req, res) => {
  const { email, password } = req.body;


  try {
    
    const dbUser = await Usuario.findOne({email});

    if(!dbUser){
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

  // compare passwords 

  const comparePasswords = bcrypt.compareSync(password, dbUser.password);

  if(!comparePasswords){
    return res.status(400).json({
      ok: false,
      msg: "El password no es válido",
    });
  }


  //return a success response

  const token = await generateJWT(dbUser._id, dbUser.name);

  return res.json({
    ok:true,
    uid: dbUser._id,
    name: dbUser.name,
    token,
    email: dbUser.email
  })



  } catch (error) {
    console.log(error);

    return res.json({
      ok: false,
      msg: "Call to Admin",
    });
  }
};

const reloadToken = async(req, res) => {
  
  const {uid, name} = req;
  const dbUser = await Usuario.findById(uid);
  const token = await generateJWT(uid, name);
  return res.json({
    ok: true,
    uid,
    name,
    token,
    email: dbUser.email
  });
};

module.exports = {
  crearUsuario,
  login,
  reloadToken,
};
