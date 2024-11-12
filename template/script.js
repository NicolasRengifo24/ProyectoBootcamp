

// para incrementar el contador
function incrementarContador(selector) {
            let contadorSpan = document.querySelector(selector);
            let contador = parseInt(contadorSpan.innerText);
            contador += 1;
            contadorSpan.innerText = contador;
        }






////////////////////////////////////////////////////////////////////////////////////
/////formulario//////
// Variables para contar y almacenar productos
let cantidadTotal = 0;
let totalPrecio = 0;
let productosSeleccionados =[];

// Obtiene el formulario

const form = document.getElementById("pedidoForm");

// Función que se ejecuta al hacer clic en un producto
function selectProduct(nombre, precio) {

   // Crea el producto con la nombre y el precio
   const producto =  { nombre, precio };
   productosSeleccionados.push(producto); // Lo añade al arreglo
   const objProduct = JSON.stringify(producto)

    // Actualizamos los campos de cantidad, producto y precio en el formulario
    
    document.getElementById('producto').value = nombre;
    document.getElementById('precio').value = precio;

    // Muestra la lista visual de productos seleccionados
    actualizarListaProductos();
   
};

// Función para actualizar la lista de productos seleccionados
function actualizarListaProductos() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';

    productosSeleccionados.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${producto.precio} -Cantidad ${producto.cantidad}`;
        listaProductos.appendChild(li);
    });
} 
//convertir la lista de productos en un objeto json para luego mandarlo al servidor





// Maneja el evento de envío del formulario.
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario.

    // Obtiene los datos ingresados en el formulario.
    const cedula = document.getElementById("idCli").value;
    const nombre = document.getElementById("nombreCli").value;
    const correo = document.getElementById("correoCli").value;
    const nombreP = document.getElementById("producto").value;
    const precioP = document.getElementById("precio").value;
    
    /* Calcula el total de la compra sumando el precio de todos los productos seleccionados.
   const totalCompra = productosSeleccionados.reduce((total, producto) => {
        const precioNumerico = parseInt(producto.precio.replace("$", "").replace(",", ""));
        return total + (precioNumerico * producto.cantidad);
    }, 0);
   */
   
    // Datos de la persona en un objeto.
    const personaData = { 
        cedula, 
        nombre,
        correo,
    };
    const producData ={
      nombre :nombreP,
       precio: precioP,
          
    };

    // Convierte el objeto a JSON para mostrarlo en la consola.
    const JsonData = JSON.stringify(personaData, null, 2);
    const ProducObj = JSON.stringify(producData, null,2);
   
    console.log(JsonData)
    console.log(ProducObj)
    crearpedido(producData)
    createcliente(personaData)
});
/* Crear api POST */
// Ruta POST para guardar un registro en la base de datos

// Función para Agregar un nuvo registro a Persona.
function createcliente(cliente) {
    fetch('/api/guardar', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    })
        
        .catch((error) => console.error("Error creating persona:", error));
}

function crearpedido(pedido){
    fetch('/api/guardarPedido', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:  JSON.stringify(pedido),
    })
}








 