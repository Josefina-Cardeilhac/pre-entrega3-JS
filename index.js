function Productos(objeto) {
    this.nombre = objeto.nombre;
    this.precio = objeto.precio;
    this.id = objeto.id;
}
const producto1 = new Productos({
    nombre: "shampoo sólido de avena",
    precio: 1200,
    id: 1,
  });
  
  const producto2 = new Productos({
    nombre: "shampoo sólido de arcilla blanca",
    precio: 1200,
    id: 2,
  });
  
  const producto3 = new Productos({
    nombre: "shampoo sólido de carbón activado",
    precio: 1200,
    id: 3,
  });
  
  let Carrito = {
    lista: [],
    total: 0,
  };
  
  function AgregarItem(producto) {
    Carrito.lista.push(producto);
    Carrito.total += producto.precio;
  
    // Guardar el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(Carrito));
  
    return Carrito;
  }
  
  function EliminarItem(index) {
    if (index >= 0 && index < Carrito.lista.length) {
      const productoEliminado = Carrito.lista.splice(index, 1)[0];
      Carrito.total -= productoEliminado.precio;
      mostrarCarritoEnDOM();
    }
  }
  
  function mostrarCarritoEnDOM() {
    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = ""; // Limpiar el contenido previo
  
    if (Carrito.lista.length === 0) {
      carritoContainer.textContent = "El carrito de compras está vacío.";
    } else {
      const ul = document.createElement("ul");
      Carrito.lista.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
        const eliminarButton = document.createElement("button");
        eliminarButton.textContent = "Eliminar del carrito";
        eliminarButton.onclick = () => EliminarItem(index);
        li.appendChild(eliminarButton);
        ul.appendChild(li);
      });
      const totalElement = document.createElement("p");
      totalElement.textContent = `Total: $${Carrito.total}`;
      carritoContainer.appendChild(ul);
      carritoContainer.appendChild(totalElement);
    }
  }
  
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    Carrito = JSON.parse(carritoGuardado);
  }
  
  function agregarAlCarrito(producto) {
    AgregarItem(producto);
    //alert(`"${producto.nombre}" ha sido agregado al carrito.`);
    mostrarCarritoEnDOM();
  }
  
  mostrarCarritoEnDOM();