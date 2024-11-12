// Importación de módulos
const path = require('path');   // Para ejecutar desde index.html

const express = require('express');
const connection = require('./conexion');
const { error } = require('console');

// Inicialización de la aplicación Express
const app = express();
//parsear
app.use(express.json()); 


app.use(express.urlencoded({ extended: true }));
// Servir el archivo index.html
app.use(express.static(path.join(__dirname, 'template')));





// Ruta GET para verificar el estado de la API
app.get('/api/prueba', (req, res) => {
    res.send("La Api esta funcionando bien chachos locos....");
});

app.get('/api/prueba1', (req, res) => {  
    const PORT = 3000;  // Definición del puerto utilizado para referenciarlo en la respuesta
    res.status(200).json({
        message: 'La API responde bien..',
        port: PORT,
        status: 'success'
    });
});
// api obtener registros
app.get('/api/obtener', (req, res) => {
    const query = "SELECT * FROM  webfoodDB.clientes";
    connection.query(query, (error, result) => {

        if (error) {
            res.status(500).json({
                success: false,
                message: "Error de recuperacion datos",
                datails: error.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Datos de la tabla",
                data: result
            });
        
        }
    })
});
/* Crear api POST */
// Ruta POST para guardar un registro en la base de datos

app.post('/api/guardar', (req, res) => { 
    const { cedula, nombre,correo } = req.body;

    // Consulta SQL para insertar una nueva persona en la tabla 'persona'
    const sql = 'INSERT INTO clientes(cedula, nombre,correo) VALUES(?,?,?)';
    connection.query(sql, [cedula, nombre,correo], (error, result) => {  // Corrección de sintaxis al pasar parámetros a connection.query()

        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(201).json({ id: result.insertId, cedula, nombre, correo });
        }
    });
});

app.post('/api/guardarPedido', (req, res) => { 
    const {nombre,precio } = req.body;

    // Consulta SQL para insertar una nueva persona en la tabla 'persona'
    const sql = 'INSERT INTO productos(nombre,precio) VALUES(?,?)';
    connection.query(sql, [nombre,precio], (error, result) => {  // Corrección de sintaxis al pasar parámetros a connection.query()

        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(201).json({ id: result.insertId,nombre,precio });
        }
    });
});













// Configuración del puerto y mensaje de conexión
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});