import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Configura la conexión con PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "psicologia",
  password: "Mialana1234",
  port: 5432
});

// 🔹 Ruta para insertar un mensaje
app.post("/api/contacto", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    await pool.query(
      "INSERT INTO contactos (nombre, email, mensaje) VALUES ($1, $2, $3)",
      [nombre, email, mensaje]
    );

    res.json({ success: true, message: "Mensaje guardado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al guardar" });
  }
});

// 🔹 Ruta para ver todos los mensajes
app.get("/api/contactos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contactos ORDER BY fecha DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Servidor backend corriendo en puerto " + PORT);
});
