import mongoose from "mongoose";

const dbConnection = async (
  connection: any,
  host: any,
  user: any,
  password: any,
  db: any
) => {
  try {
    const URI = `${connection}://${host}`;
    await mongoose.connect(URI, {
      user,
      pass: password,
      dbName: db,
    });
    console.log("Conexion exitosa a la Base de datos");
  } catch (error) {
    console.log("Conexion fallida a la Base de datos");
  }
};

export default dbConnection;
