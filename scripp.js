function validarTexto(elemento) {
    // Filtra letras mayúsculas, acentos y caracteres especiales en tiempo real
    elemento.value = elemento.value
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z\s]/g, '');

    // Actualiza la visibilidad de los elementos basándose en el texto
    actualizarVisibilidad(elemento.value.trim());
}

function actualizarVisibilidad(texto) {
    const copiarBtn = document.querySelector('.right-column button');
    const resultImage = document.getElementById('resultImage');
    const resultText1 = document.getElementById('resultText1');
    const resultText2 = document.getElementById('resultText2');
    const outputText = document.getElementById('outputText');

    // Ajusta la visibilidad según el tamaño de la pantalla
    if (window.innerWidth <= 1028) {
        resultImage.style.display = 'none'; // Oculta la imagen en pantallas menores o iguales a 1028px
    } else {
        resultImage.style.display = texto ? 'none' : 'block'; // Muestra la imagen si el texto está vacío en pantallas mayores a 1028px
    }

    // Actualiza la visibilidad de los párrafos y el botón de copiar
    if (texto) {
        resultText1.style.display = 'none';
        resultText2.style.display = 'none';
        copiarBtn.style.display = 'block';
    } else {
        resultText1.style.display = 'block';
        resultText2.style.display = 'block';
        copiarBtn.style.display = 'none';
        outputText.value = ''; // Limpia el área de resultado
    }
}

function encriptar() {
    let inputText = document.getElementById('inputText').value;

    if (inputText.trim() === '') {
        actualizarVisibilidad(''); // Restablece la visibilidad si el campo está vacío
        return;
    }

    let encryptedText = inputText
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    document.getElementById('outputText').value = encryptedText;
    actualizarVisibilidad(encryptedText);
}

function desencriptar() {
    let inputText = document.getElementById('inputText').value;

    if (inputText.trim() === '') {
        actualizarVisibilidad(''); // Restablece la visibilidad si el campo está vacío
        return;
    }

    let decryptedText = inputText
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');

    document.getElementById('outputText').value = decryptedText;
    actualizarVisibilidad(decryptedText);
}

function copiarTexto() {
    let outputText = document.getElementById('outputText');
    outputText.select();
    outputText.setSelectionRange(0, 99999); // Para dispositivos móviles

    navigator.clipboard.writeText(outputText.value)
        .then(() => {
            console.log('Texto copiado al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
}

// Maneja el redimensionamiento de la pantalla
window.addEventListener('resize', function () {
    actualizarVisibilidad(document.getElementById('inputText').value.trim()); // Actualiza la visibilidad en función del tamaño de la pantalla
});

// Restablece el estado inicial cuando el usuario borra todo el texto
document.getElementById('inputText').addEventListener('input', function() {
    if (this.value.trim() === '') {
        actualizarVisibilidad(''); // Muestra los párrafos y el estado inicial si no hay texto
    }
});
