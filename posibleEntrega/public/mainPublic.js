const socket = io.connect();

//PARA EL MENSAJE
function render(messages) {
  const html = messages
    .map((message, index) => {
      return `<div>
            <strong>${message.username}</strong>:&nbsp;<em>${message.text}</em>
            </div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

function addMessage(e) {
  const message = {
    autor: document.getElementById("username").value,
    text: document.getElementById("text").value,
  };

  socket.emit("new-message", message);
  return false;
}

socket.on("messages", (data) => {
  render(data);
});

//PARA PRODUCTOS

function renderProduct(productos) {
  return fetch("plantilla/tabla-productos.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return document.getElementById("productos").innerHTML = html;
    });
}

function addProduct(e) {
  const product = {
    nombre: document.getElementById("nombre").value,
    precio: document.getElementById("precio").value,
    url: document.getElementById("url").value,
  };

  socket.emit("new-product", product);
  return false;
}

socket.on("productos", (data) => {
  render(data);
});
