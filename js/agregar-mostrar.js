function cargarCarrito() {
    const contenedor = document.querySelector(".cart-items");
    const totalTexto = document.querySelector(".total");

    if (!contenedor) return;

    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    contenedor.innerHTML = "<h2>Productos en tu Carrito</h2>";

    let total = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        contenedor.innerHTML += `
            <article class="carro-item">
                <figure class="carro-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
                </figure>

                <section class="carro-info">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio.toLocaleString("es-CL")}</p>
                    <p>Subtotal: $${subtotal.toLocaleString("es-CL")}</p>
                </section>

                <section class="carro-cantidad">
                    <button onclick="disminuirCantidadCarro(${index})">-</button>
                    <input type="text" value="${producto.cantidad}" readonly>
                    <button onclick="aumentarCantidadCarro(${index})">+</button>
                </section>

                <section class="carro-eliminar">
                    <button onclick="eliminarProducto(${index})">Eliminar</button>
                </section>
            </article>
        `;
    });

    if (totalTexto) {
        totalTexto.textContent = "Total: $" + total.toLocaleString("es-CL");
    }
}

function aumentarCantidadCarro(index) {
    carrito[index].cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

function disminuirCantidadCarro(index) {
    carrito[index].cantidad--;
}