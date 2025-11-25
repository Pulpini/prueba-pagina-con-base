document.getElementById("form-contacto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  const status = document.getElementById("status");

  status.innerHTML = "Enviando...";

  try {
    const response = await fetch("http://localhost:4000/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, mensaje })
    });

    const result = await response.json();

    if (result.success) {
      status.style.color = "green";
      status.innerHTML = "Mensaje enviado correctamente ✔";
      document.getElementById("form-contacto").reset();
    } else {
      status.style.color = "red";
      status.innerHTML = "Hubo un error al enviar ";
    }

  } catch (err) {
    status.style.color = "red";
    status.innerHTML = "Error al conectar con el servidor ";
  }
});
import pg from 'pg';
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

await client.connect();

client.query('LISTEN nuevo_contacto');

client.on('notification', (msg) => {
  const [name, email] = msg.payload.split("|");
  console.log("Nuevo contacto:", name, email);

  // Aquí puedes avisar al frontend
  io.emit("nuevo_contacto", { name, email });
});

