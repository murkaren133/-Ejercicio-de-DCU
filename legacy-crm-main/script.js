const $ = (q) => document.querySelector(q);

// Carga de datos original
function seedTables() {
    const activity = [["Cliente creado", "admin", "OK", "Completado"], ["Oportunidad editada", "ventas1", "OK", "Guardado"], ["Login", "admin", "OK", "Sesión activa"]];
    $("#activityTbody").innerHTML = activity.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><span class="tag ok">${r[2]}</span></td><td>${r[3]}</td></tr>`).join('');

    const opps = [["Acme S.A.", "$12,000", "30%", "Prospección"], ["NovaRetail", "$1,500", "80%", "Negociación"]];
    $("#oppsTbody").innerHTML = opps.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('');
}

// Navegación funcional
function showView(route) {
    document.querySelectorAll(".view").forEach(v => v.style.display = "none");
    const el = $("#view-" + route);
    if (el) el.style.display = "block";
    document.querySelectorAll(".menu a").forEach(a => a.classList.toggle("active", a.dataset.route === route));
}

// Toast
function toast(msg) {
    $("#toastMsg").textContent = msg;
    $("#toast").style.display = "block";
    setTimeout(() => $("#toast").style.display = "none", 3000);
}

// Validación de Email (Mejora solicitada)
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function init() {
    seedTables();
    
    // Links del menú
    document.querySelectorAll(".menu a").forEach(a => {
        a.addEventListener("click", (e) => {
            e.preventDefault();
            showView(a.dataset.route);
        });
    });

    // Validación email en tiempo real
    $("#c_email").addEventListener("input", (e) => {
        const val = e.target.value;
        if (val === "") e.target.style.borderColor = "var(--border)";
        else e.target.style.borderColor = validarEmail(val) ? "var(--ok)" : "var(--danger)";
    });

    // Botón Enviar Cliente
    $("#btnSubmitClient").addEventListener("click", () => {
        const emailVal = $("#c_email").value;
        const nameVal = $("#c_name").value;

        if (nameVal.length < 3) { toast("Error: Nombre demasiado corto."); return; }
        if (!validarEmail(emailVal)) { toast("Error: Formato de correo inválido."); return; }

        toast("Cliente guardado con éxito.");
        // Mostrar encuesta tras éxito (DCU)
        setTimeout(() => $("#modalBackdrop").style.display = "flex", 800);
    });

    // Botones del Modal Moderno
    $("#modalX").addEventListener("click", () => $("#modalBackdrop").style.display = "none");
    $("#btnModalLater").addEventListener("click", () => $("#modalBackdrop").style.display = "none");
    $("#btnModalSubmit").addEventListener("click", () => {
        $("#modalBackdrop").style.display = "none";
        toast("¡Gracias por tu opinión!");
    });

    // Botones del Header
    $("#btnSync").addEventListener("click", () => toast("Sincronización exitosa."));
    $("#btnHelp").addEventListener("click", () => toast("Manual de ayuda abierto."));
    $("#btnLogout").addEventListener("click", () => alert("Saliendo..."));
}

document.addEventListener("DOMContentLoaded", init);