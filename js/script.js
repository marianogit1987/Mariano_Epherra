// Esperar a que el HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // 1. CONSTANTES: Selección de elementos del DOM
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("#nav-menu a");
    const contactForm = document.querySelector("#contacto form");

    // 2. EVENTO CLICK: Abrir/Cerrar menú hamburguesa
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Cerrar menú al hacer clic en cualquier enlace
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // 3. EVENTO SUBMIT: Notificación temporal al enviar el formulario
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            // Evitamos que la página se recargue
            event.preventDefault();

            // Verificar si ya existe una notificación previa y eliminarla para reiniciar la cuenta
            const notificacionExistente = document.getElementById("form-notificacion");
            if (notificacionExistente) {
                notificacionExistente.remove();
            }
            // ==================================================================
            // DEMOSTRACIÓN EN CONSOLA (console.log)
            // ==================================================================
            console.log("--------------------------------------------------");
            console.log("✅ ¡Datos cargados correctamente! Mensaje enviado.");
            console.log("📋 Datos del formulario:", {
                nombre: nombre,
                email: email,
                asunto: asunto,
                mensaje: mensaje,
                fechaEnvio: new Date().toLocaleString()
            });
            console.log("--------------------------------------------------")

            // Crear el elemento de notificación
            const notificacion = document.createElement("div");
            notificacion.id = "form-notificacion";
            
            // Estilos visuales estilo anime/cel-shading
            notificacion.style.marginTop = "15px";
            notificacion.style.padding = "12px 20px";
            notificacion.style.backgroundColor = "#00f0ff"; // Cían neón
            notificacion.style.color = "#000000";            // Texto negro
            notificacion.style.fontWeight = "bold";
            notificacion.style.border = "3px solid #000000";
            notificacion.style.borderRadius = "8px";
            notificacion.style.boxShadow = "4px 4px 0px #000000";
            notificacion.style.textAlign = "center";
            notificacion.style.transition = "opacity 0.5s ease"; // Transición suave para ocultar
            
            // Asignar el mensaje de éxito
            notificacion.textContent = "✅ ¡Datos cargados correctamente! Mensaje enviado.";

            // Insertar la notificación en la página
            contactForm.appendChild(notificacion);

            // Limpiar los campos del formulario
            contactForm.reset();

            // Temporizador para borrar la notificación de la pantalla
            setTimeout(() => {
                notificacion.style.opacity = "0"; // Efecto de desvanecimiento
                
                // Remover el elemento del DOM tras completar la animación
                setTimeout(() => {
                    notificacion.remove();
                }, 500);
            }, 4000); // 4000 ms = 4 segundos en pantalla
        });
    }

});
