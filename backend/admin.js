const loadMessages = async () => {
    const res = await fetch("http://localhost:3000/api/contacto");
    const mensajes = await res.json();
  
    const tbody = document.getElementById("contact-table-body");
    tbody.innerHTML = "";
  
    mensajes.forEach(msg => {
      tbody.innerHTML += `
        <tr>
          <td>${msg.nombre}</td>
          <td>${msg.email}</td>
          <td>${msg.mensaje}</td>
          <td>${new Date(msg.fecha).toLocaleString("es-CL")}</td>
        </tr>
      `;
    });
  };
  
  loadMessages();
  