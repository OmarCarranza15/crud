import express from "express";
import cors from "cors";
import mysql from 'mysql2';
import myconn from 'express-myconnection';
import path from 'path';

// Importamos la conexión a la DB
import db from "./database/db.js";
// Importamos nuestro enrutador 
import usuarioRoutes from "./routes/UsuarioRoutes.js";
import proyectosRealizados from "./routes/ProyectosRealizadoRoutes.js";
import serviciosOfrecidos from "./routes/ServiciosOfrecidosRoutes.js";
import ProyeHasImagenes from "./routes/ProyeHasImagenRoutes.js";
import Imagenes from './routes/ImagenesRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con el URL de tu frontend local
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
}));

app.use(express.json());
app.use('/usuarios', usuarioRoutes);
app.use('/proyectosrealizados', proyectosRealizados);
app.use('/ServiciosOfrecidos', serviciosOfrecidos);
app.use('/proyehasimage', ProyeHasImagenes);
app.use('/imagenes', Imagenes);

app.use(myconn(mysql, {
  host: 'incarranza13.mysql.database.azure.com',
  port: 3306,
  user: 'InCarranza',
  password: 'Sashaloka13',
  database: 'db_incarranza'
}));

app.use(express.static(path.join(__dirname, '../../bdimages')));

import routes from './routes/ImagenRoutes.js';
app.use(routes);

try {
  await db.authenticate();
  console.log('Conexion exitosa a la DB');
} catch (error) {
  console.log(`El error de conexion es: ${error}`);
}

// nodemon app, ahora iniciamos aqui la base de datos
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
