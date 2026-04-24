// ../js/scripts-index-carro.js

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarCarrito(boton) {
    const productoItem = boton.closest(".producto-item");

    const nombre = productoItem.querySelector(".nombre-producto").textContent;
    const imagen = productoItem.querySelector(".imagen-producto").src;
    const precioTexto = productoItem.querySelector("span.precio").textContent;
    const precio = parseInt(precioTexto.replace(".", ""));

    const cantidadInput = productoItem.querySelector(".inpt-numero");
    const cantidad = parseInt(cantidadInput.value);

    const existe = carrito.find(producto => producto.nombre === nombre);

    if (existe) {
        // Si existe, suma cantidad
        existe.cantidad += cantidad;
    } else {
        // Si no existe, lo agrega nuevo
        carrito.push({
            nombre: nombre,
            imagen: imagen,
            precio: precio,
            cantidad: cantidad
        });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito");

    const contador = document.querySelector(".cantidad-articulos");
    if (contador) {
        contador.textContent = carrito.reduce((total, p) => total + p.cantidad, 0);
    }
}

function cargarCarrito() {
    const contenedor = document.querySelector(".cart-items");
    const totalTexto = document.querySelector(".total");
    const totalspan = document.querySelector(".total-span");
    if (!contenedor) return;

    const productosGuardados = JSON.parse(localStorage.getItem("carrito")) || [];

    contenedor.innerHTML = "<h2>Productos en tu Carrito</h2>";

    let total = 0;

    productosGuardados.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        contenedor.innerHTML += `

        <article class="producto-carro">

            <div class="producto-carro-img">
                <img class="img-carro" src="${producto.imagen}" alt="${producto.nombre}">
            </div>


            <div class="producto-carro-info">
                <div class="producto-carro-nombre">
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="producto-carro-precio">
                    <p>Precio: </p>
                    <p class="producto-precio">$${producto.precio.toLocaleString("es-CL")}</p>
                </div>
                <div class="producto-carro-cantidad">
                    <p class="producto-cantidad">Cantidad: </p>
                    <button onclick="this.nextElementSibling.value = Math.max(1, parseInt(this.nextElementSibling.value) - 1); modificarSubtotal(${index})">-</button>
                    <input class="inpt-numero" type="text" value="${producto.cantidad}" readonly>
                    <button onclick="this.previousElementSibling.value = parseInt(this.previousElementSibling.value) + 1; modificarSubtotal(${index})">+</button>
                </div>
                <div class="producto-carro-subtotal">
                <p class="producto-subtotal">Subtotal: $${subtotal.toLocaleString("es-CL")}</p>
                </div>
            </div>

            <div class="producto-carro-acciones">
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </div>
        </article>
        `;
    });

    if (totalTexto) {
        totalTexto.textContent = "Total: "; 
        totalspan.textContent = "$" + total.toLocaleString("es-CL");

    }
}

function modificarSubtotal(index) {
    const cantidadInput = document.querySelectorAll(".inpt-numero")[index];

    carrito[index].cantidad = parseInt(cantidadInput.value);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    cargarCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

function aumentar_cantidad() {
    cambiarCantidad("cantidad", 1);
}

function disminuir_cantidad() {
    cambiarCantidad("cantidad", -1);
}

function cambiarCantidad(id, cambio) {
    const input = document.getElementById(id);
    let valor = parseInt(input.value);

    valor += cambio;

    if (valor < 1) {
        valor = 1;
    }

    input.value = valor;
}

document.addEventListener("DOMContentLoaded", cargarCarrito);