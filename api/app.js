// app.js
require("dotenv").config();
// console.log(process.env.DB_HOST);

const express = require("express");
const exphbs = require("express-handlebars");
const pool = require("../config/db");
const path = require("path");
const app = express();
const port = 3000;

// Configuración de Handlebars
// Esta línea le dice a Express que, cuando encuentre un archivo con la extensión .hbs
// (que es la de Handlebars), debe renderizarlo usando el motor express-handlebars.
app.engine(
	".hbs",
	exphbs.engine({
		defaultLayout: "main", // Plantilla principal (el "esqueleto" de la UI)
		extname: ".hbs",
	}),
);
app.set("view engine", ".hbs"); // para no tener que escribir la extencion al renderizar
app.set("views", path.join(__dirname, "..", "views"));

// express.urlencoded(): Es una función integrada en Express que devuelve el middleware.
// Su nombre (url-encoded) se refiere al formato en el que se codifican los datos de un
// formulario antes de ser enviados por el navegador.
app.use(express.urlencoded({ extended: false }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

// Datos de ejemplo para el menú (parte de la UX)
const menu = [
	{ nombre: "Café Americano", precio: "$2.50" },
	{ nombre: "Espresso", precio: "$2.00" },
	{ nombre: "Latte", precio: "$3.00" },
	{ nombre: "Tarta de Chocolate", precio: "$4.50" },
];

// 1. Ruta principal (Inicio)
// UX: El usuario ve la información clave del café.
app.get("/", (req, res) => {
	res.render("home", {
		titulo: "Bienvenido a nuestro Café",
		descripcion: "El mejor café de la ciudad, hecho con pasión.",
	});
});

// 2. Ruta del menú
// UX: El usuario puede ver la lista de productos de manera organizada.
app.get("/menu", (req, res) => {
	res.render("menu", {
		titulo: "Nuestro Menú",
		productos: menu, // Enviamos los datos del menú a la vista
	});
});

// 3. Ruta de contacto
// UX: El usuario tiene un formulario simple para interactuar.
app.get("/contacto", (req, res) => {
	console.log(req.query.exito);
	let mensajeExito = "";
	if (req.query.exito) {
		mensajeExito = "Se registro con exito su mensaje, gracias";
	}

	res.render("contacto", {
		titulo: "Contáctanos",
		mensajeExito: mensajeExito,
	});
});

// NUEVA RUTA: Manejo del formulario de contacto
// UX: Procesar el formulario y redirigir con un mensaje de éxito.
// UI: La URL ahora indicará el éxito con un parámetro.
app.post("/enviar_mensaje", (req, res) => {
	// Aquí iría la lógica para guardar el mensaje en una base de datos o enviarlo por email.
	// Por ahora, solo simularemos que fue un éxito.
	console.log("Mensaje recibido:", req.body); // req.body estará disponible si usas body-parser

	// Redirige a la página de contacto, pero con un parámetro de éxito
	res.redirect("/contacto?exito=true");
});

app.get("/books", async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM books");
		// return rows;
		res.json(rows);
	} catch (err) {
		console.error("Error al obtener todos los libros:", err);
		throw new Error("No se pudieron obtener los libros"); // Lanza el error para que sea manejado por la ruta
	}
});

/*app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
});*/
// });

module.exports = app; //vercel
