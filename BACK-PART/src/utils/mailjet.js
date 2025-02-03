const {mailjet} = require("../config/mailjet");

const welcomeEmail = async (to, name) => {
    try {
        const request = mailjet.post("send", { version: "v3.1" }).request({
            Messages: [
              {
                From: {
                  Email: "zonadeventos10@gmail.com", 
                  Name: "Zona de Eventos",
                },
                To: [
                  {
                    Email: to,
                    Name: `${name}`,
                  },
                ],
                Subject: "¡Bienvenido a Zona de Eventos!",
                HTMLPart: `<h1>¡Hola ${name}!,</h1>
                <br>
                <p>¡Gracias por registrarte en nuestra página web con los mejores eventos! Estamos encantados de que organices y crees tus eventos con nosotros. Esperamos que disfrutes de la experiencia.</p>
                <br>
                <p>Saludos,<br>desde Zona de Eventos</p>`,
              },
            ],
          });
          await request;
          console.log("Correo de bienvenida enviado");       
    } catch (error) {
        console.log("No se ha enviado el correo de bienvenida");
    }
};

module.exports = {welcomeEmail};