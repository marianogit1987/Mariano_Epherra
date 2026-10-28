// Esperar a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================================
    // 1. CONSTANTES Y SELECCIÓN DE ELEMENTOS DEL DOM
    // ==========================================================================
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("#nav-menu a");
    const contactForm = document.querySelector("#contacto form");
    const formProyecto = document.getElementById("form-proyecto");
    const contenedorProyectos = document.querySelector(".proyectos-grid");

    const URL_API = "http://localhost:3000/api/proyectos";

    // Proyectos estáticos iniciales por defecto (por si la base de datos está vacía)
    const proyectosIniciales = [
        {
            id: 'demo1',
            nombre: "Proyecto 1: Sitio Web VitalHome",
            descripcion: "Una página web promocional construida con JavaScript y React.",
            tecnologias: "JavaScript, React, Tailwind CSS",
            imagen: "img/VitalHome.png",
            estado: "Publicado"
        },
        {
            id: 'demo2',
            nombre: "Proyecto 2: Software para empresa yerbatera",
            descripcion: "Interfaz pública y aislada para consulta de entregas de productores de yerba mate.",
            tecnologias: "PHP, Laravel, MySQL",
            imagen: "img/software-yerbatero.png",
            estado: "Publicado"
        }
    ];

    // ==========================================================================
    // 2. EVENTO CLICK: MENÚ HAMBURGUESA
    // ==========================================================================
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // ==========================================================================
    // 3. EVENTO SUBMIT: FORMULARIO DE CONTACTO
    // ==========================================================================
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nombre = document.getElementById("nombre") ? document.getElementById("nombre").value : "";
            const email = document.getElementById("email") ? document.getElementById("email").value : "";
            const asunto = document.getElementById("asunto") ? document.getElementById("asunto").value : "";
            const mensaje = document.getElementById("mensaje") ? document.getElementById("mensaje").value : "";

            console.log("--------------------------------------------------");
            console.log("✅ ¡Datos cargados correctamente! Mensaje enviado.");
            console.log("📋 Datos del formulario:", {
                nombre: nombre,
                email: email,
                asunto: asunto,
                mensaje: mensaje,
                fechaEnvio: new Date().toLocaleString()
            });
            console.log("--------------------------------------------------");

            const notificacionExistente = document.getElementById("form-notificacion");
            if (notificacionExistente) {
                notificacionExistente.remove();
            }

            const notificacion = document.createElement("div");
            notificacion.id = "form-notificacion";
            notificacion.textContent = "✅ ¡Datos cargados correctamente! Mensaje enviado.";

            contactForm.appendChild(notificacion);
            contactForm.reset();

            setTimeout(() => {
                notificacion.classList.add("oculto");
                setTimeout(() => {
                    notificacion.remove();
                }, 500);
            }, 4000);
        });
    }

    // ==========================================================================
    // 4. CRUD: CARGAR Y RENDERIZAR PROYECTOS (GET)
    // ==========================================================================
    async function cargarProyectos() {
        if (!contenedorProyectos) return;

        try {
            const respuesta = await fetch(URL_API);
            let proyectos = await respuesta.json();

            // Si la base de datos no devuelve proyectos, mostramos los proyectos de demostración
            if (!proyectos || proyectos.length === 0) {
                proyectos = proyectosIniciales;
            }

            renderizarTarjetas(proyectos);
        } catch (error) {
            console.warn("⚠️ No se pudo conectar con la API. Mostrando proyectos por defecto.", error);
            renderizarTarjetas(proyectosIniciales);
        }
    }

    // Función auxiliar para renderizar el HTML de las tarjetas
    function renderizarTarjetas(listaProyectos) {
        contenedorProyectos.innerHTML = "";

        listaProyectos.forEach(proyecto => {
            const article = document.createElement("article");
            article.className = "proyecto-card";
            article.innerHTML = `
                <h3>${proyecto.nombre}</h3>
                <img src="${proyecto.imagen}" alt="${proyecto.nombre}" onerror="this.src='img/foto-perfil.jpg'">
                <p>${proyecto.descripcion}</p>
                <p><strong>Tecnologías:</strong> ${proyecto.tecnologias}</p>
                <a href="https://github.com/marianogit1987" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display:inline-block; margin-top:10px; text-decoration:none; padding: 6px 12px; font-size: 0.9rem;">Ver en GitHub</a>
            `;
            contenedorProyectos.appendChild(article);
        });
    }

    // ==========================================================================
    // 5. CRUD: CREAR UN NUEVO PROYECTO (POST)
    // ==========================================================================
    if (formProyecto) {
        formProyecto.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nuevoProyecto = {
                nombre: document.getElementById("nuevo-nombre").value,
                descripcion: document.getElementById("nueva-descripcion").value,
                tecnologias: document.getElementById("nuevas-tecnologias").value,
                imagen: document.getElementById("nueva-imagen").value || "img/VitalHome.png",
                estado: "Publicado"
            };

            try {
                const respuesta = await fetch(URL_API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(nuevoProyecto)
                });

                if (respuesta.ok) {
                    console.log("✅ Proyecto agregado exitosamente a la base de datos MySQL.");
                    formProyecto.reset();
                    cargarProyectos();
                }
            } catch (error) {
                console.error("❌ Error al guardar el proyecto:", error);
            }
        });
    }

    // Cargar los proyectos al iniciar
    cargarProyectos();
});