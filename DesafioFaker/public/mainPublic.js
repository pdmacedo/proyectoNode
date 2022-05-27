const socket = io.connect();
const { normalize, denormalize, schema } = require("normalizr");

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  const producto = {
    title: formAgregarProducto[0].value,
    price: formAgregarProducto[1].value,
    thumbnail: formAgregarProducto[2].value,
  };
  socket.emit("update", producto);
  formAgregarProducto.reset();
});

socket.on("productos", (productos) => {
  makeHtmlTable(productos).then((html) => {
    document.getElementById("productos").innerHTML = html;
  });
});

function makeHtmlTable(productos) {
  return fetch("plantillas/tabla-productos.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return html;
    });
}

// Mensajes

// Desnormalización de mensaje

// Definir un esquema de author
const authorSchema = new schema.Entity("authors");

// Definir un esquema de mensajes
const messageSchema = new schema.Entity("comments", {
  author: authorSchema,
});

//Definir un esquema de post
const postSchema = new schema.Entity("posts", {
  author: authorSchema,
  comments: [messageSchema],
});

const util = require("util");

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

const normalizrData = normalize("../DB/mensajes.json", postSchema);
console.log("-----MENSAJE DESNORMALIZADO-----");
const denormalizrData = denormalize(
  normalizrData.result,
  postSchema,
  normalizrData.entities
);
print(denormalizrData);

/* ----------------------------------------------------------------------------- */

const inputUsername = document.getElementById("username");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

const formPublicarMensaje = document.getElementById("formPublicarMensaje");
formPublicarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();

  const mensaje = {
    author: {
      email: inputUsername.value,
      nombre: document.getElementById("firstname").value,
      apellido: document.getElementById("lastname").value,
      edad: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: inputMensaje.value,
  };

  socket.emit("nuevoMensaje", mensaje);
  formPublicarMensaje.reset();
  inputMensaje.focus();
});

socket.on("mensajes", (mensajesN) => {
  const mensajesNsize = JSON.stringify(mensajesN).length;
  console.log(mensajesN, mensajesNsize);

  const mensDes = normalizr.denormalize(
    normalizrData.result,
    postSchema,
    normalizrData.entities
  );

  const mensDesSize = JSON.stringify(mensDes).length;
  const porcentajeC = parseInt((mensDesSize * 100) / mensDesSize);

  console.log(`Porcentaje de compresión ${porcentajeC}%`);
  document.getElementById("compresion-info").innerText = porcentajeC;

  console.log(mensDes.mensajes);
  const html = makeHtmlList(mensDes.mensajes);
  document.getElementById("mensajes").innerHTML = html;
});

function makeHtmlList(mensajes) {
  return mensajes
    .map((mensaje) => {
      return `
        <div>
            <b style="color:blue;">${mensaje.author.email}</b>
            [<span style="color:brown;">${mensaje.fyh}</span>] :
            <i style="color:green;">${mensaje.text}</i>
            <img width="50" src="${mensaje.author.avatar}" alt=" ">
        </div>
    `;
    })
    .join(" ");
}

inputUsername.addEventListener("input", () => {
  const hayEmail = inputUsername.value.length;
  const hayTexto = inputMensaje.value.length;
  inputMensaje.disabled = !hayEmail;
  btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener("input", () => {
  const hayTexto = inputMensaje.value.length;
  btnEnviar.disabled = !hayTexto;
});
