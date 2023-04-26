const mongoose = require('mongoose');

const dbConnection = async()=>{

  try{
   await mongoose.connect(process.env.BD_CNN, {
    useNewUrlParser:true,
    useUnifiedTopology:true
   });
  }
  catch(err){
 
       console.log(err)
       throw new Error('Error al inicializar DB')
  }

  console.log('BD Connected :)')
}



module.exports = {
  dbConnection
}