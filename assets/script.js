const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
  setupBootScreen();
  setupMenu();
  setupTheme();
  setupChatbot();
  setupEasterEgg();
  setupContactForm();
});

function setupBootScreen() {
  const bootScreen = $("#boot-screen");
  const recoverBtn = $("#recover-btn");

  if (!bootScreen || !recoverBtn) return;

  recoverBtn.addEventListener("click", () => {
    bootScreen.classList.add("hidden");
    localStorage.setItem("siteRecovered", "true");
  });

  const siteRecovered = localStorage.getItem("siteRecovered") === "true";
  if (siteRecovered) {
    bootScreen.style.display = "none";
  }
}

function setupMenu() {
  const toggle = $("#menu-toggle");
  const nav = $("#main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

function setupTheme() {
  const themeToggle = $("#theme-toggle");
  if (!themeToggle) return;

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "Modo oscuro";
  } else {
    themeToggle.textContent = "Modo claro";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "Modo oscuro" : "Modo claro";
  });
}

function setupChatbot() {
  const toggle = $("#chatbot-toggle");
  const panel = document.querySelector(".chatbot-panel");
  const form = $("#chatbot-form");
  const input = $("#chatbot-input");
  const messages = $("#chatbot-messages");

  if (!toggle || !panel || !form || !input || !messages) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user-msg", messages);
    const reply = getBotReply(text.toLowerCase());
    window.setTimeout(() => addMessage(reply, "bot-msg", messages), 300);
    input.value = "";
  });
}

function addMessage(text, className, container) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.textContent = text;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function getBotReply(text) {
  if (text.includes("servicio") || text.includes("servicios")) {
    return "Los servicios reinventados incluyen identidad visual, atención inteligente, resiliencia web y experiencia interactiva.";
  }

  if (text.includes("seguridad") || text.includes("protección")) {
    return "La nueva empresa usa respaldos, monitoreo y mejores prácticas de acceso para reducir el riesgo de otro borrado digital.";
  }

  if (text.includes("contacto") || text.includes("correo")) {
    return "Puedes usar el formulario de contacto en la página final para enviar una señal directa a la empresa.";
  }

  if (text.includes("incidente") || text.includes("prueba")) {
    return "En la sección de contacto verás el mensaje del USB, el registro del fallo y el plan de recuperación.";
  }

  if (text.includes("mapa") || text.includes("ubicación")) {
    return "La ubicación está integrada con un mapa para que el cliente vuelva a encontrar a la empresa en el mundo real y digital.";
  }

  return "Estoy aprendiendo con esta nueva versión de la empresa. Prueba palabras clave como servicios, seguridad, contacto, mapa o incidente.";
}

function setupEasterEgg() {
  const secret = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a"
  ];

  let userInput = [];

  document.addEventListener("keydown", (event) => {
    userInput.push(event.key);
    userInput = userInput.slice(-secret.length);

    const matches = secret.every((key, index) => key === userInput[index]);
    if (matches) {
      showSecretBanner();
    }
  });
}

function showSecretBanner() {
  if (document.querySelector(".konami-banner")) return;

  const banner = document.createElement("div");
  banner.className = "konami-banner";
  banner.textContent = "Modo supervivencia activado: ningún ataque podrá borrar esta historia otra vez.";
  document.body.appendChild(banner);

  setTimeout(() => banner.remove(), 4500);
}

function setupContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Señal enviada. La empresa ha recibido tu mensaje desde su nueva dimensión digital.");
    form.reset();
  });
}
function obtenerUbicacion() {

    const output = document.getElementById("ubicacionUsuario");

    if (!navigator.geolocation) {
        output.textContent = "La geolocalización no es compatible con tu navegador.";
        return;
    }

    output.textContent = "Detectando ubicación...";

    navigator.geolocation.getCurrentPosition(
        function (posicion) {

            const lat = posicion.coords.latitude;
            const lon = posicion.coords.longitude;

            output.innerHTML =
                "Ubicación detectada:<br>" +
                "Latitud: " + lat.toFixed(5) + "<br>" +
                "Longitud: " + lon.toFixed(5);

        },
        function () {
            output.textContent = "No se pudo obtener tu ubicación.";
        }
    );
}
const geoButton = document.getElementById("geoButton");
const geoStatus = document.getElementById("geoStatus");
const ubicacionUsuario = document.getElementById("ubicacionUsuario");

if (geoButton) {
    geoButton.addEventListener("click", iniciarRastreoSeguro);
}

function iniciarRastreoSeguro() {

    if (!navigator.geolocation) {
        geoStatus.textContent = "Error: este navegador no soporta geolocalización.";
        geoStatus.classList.add("glitch-text");
        return;
    }

    geoStatus.classList.remove("glitch-text", "success-text");
    ubicacionUsuario.classList.add("hidden");
    ubicacionUsuario.classList.remove("glitch-box");

    escribirSecuencia([
        "Sistema recuperado.",
        "Reconectando módulos de rastreo...",
        "Detectando al Hacker..."
    ], geoStatus, 700, () => {

        navigator.geolocation.getCurrentPosition(
            mostrarUbicacion,
            manejarErrorUbicacion,
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );

    });

}

function escribirSecuencia(mensajes, elemento, delay, callback) {

    let index = 0;

    function mostrarSiguiente() {

        if (index < mensajes.length) {

            elemento.textContent = mensajes[index];
            elemento.classList.add("glitch-text");

            setTimeout(() => {

                elemento.classList.remove("glitch-text");
                index++;
                setTimeout(mostrarSiguiente, delay);

            }, 500);

        } else if (callback) {
            callback();
        }
    }

    mostrarSiguiente();
}

function mostrarUbicacion(posicion) {

    const lat = posicion.coords.latitude.toFixed(5);
    const lon = posicion.coords.longitude.toFixed(5);
    const precision = Math.round(posicion.coords.accuracy);

    geoStatus.textContent = "Hacker localizado correctamente.";
    geoStatus.classList.add("success-text");

    ubicacionUsuario.innerHTML =
        "<strong>Señal recuperada</strong><br>" +
        "Latitud: " + lat + "<br>" +
        "Longitud: " + lon + "<br>" +
        "Precisión aproximada: " + precision + " metros";

    ubicacionUsuario.classList.remove("hidden");
    ubicacionUsuario.classList.add("glitch-box");

}

function manejarErrorUbicacion(error) {

    geoStatus.classList.add("glitch-text");

    switch (error.code) {

        case error.PERMISSION_DENIED:
            geoStatus.textContent = "Acceso denegado: el usuario bloqueó la ubicación.";
            break;

        case error.POSITION_UNAVAILABLE:
            geoStatus.textContent = "Señal perdida: no fue posible determinar la ubicación.";
            break;

        case error.TIMEOUT:
            geoStatus.textContent = "Tiempo agotado: el sistema no respondió a tiempo.";
            break;

        default:
            geoStatus.textContent = "Fallo desconocido en el módulo de rastreo.";
            break;
    }
}