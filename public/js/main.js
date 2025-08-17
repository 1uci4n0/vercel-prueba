/*----------  Funcionalidad para contact  ----------*/
// document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("contact-form");
console.log(form);
if (form) {
    const nombreInput = document.getElementById("nombre");
    const mensajeTextarea = document.getElementById("mensaje");
    const nombreError = document.getElementById("nombre-error");
    const mensajeError = document.getElementById("mensaje-error");
    const submitBtn = document.getElementById("submit-btn");

    form.addEventListener("submit", (event) => {
        // Prevén el envío por defecto del formulario
        event.preventDefault();
        console.log("hellllllllllo");
        // Reinicia los mensajes de error
        nombreError.textContent = "";
        mensajeError.textContent = "";

        let isValid = true;

        if (nombreInput.value.trim() === "") {
            nombreError.textContent = "El nombre no puede estar vacío.";
            isValid = false;
        }

        if (mensajeTextarea.value.trim().length < 10) {
            mensajeError.textContent =
                "El mensaje debe tener al menos 10 caracteres.";
            isValid = false;
        }

        if (isValid) {
            // Si todo es válido, muestra el estado de carga y envía el formulario
            submitBtn.textContent = "Enviando...";
            submitBtn.disabled = true;
            form.submit();
        }
    });
}
// });
