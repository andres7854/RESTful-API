async function logIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
        alert('Por favor complete todos los campos');
        return;
    }
    const response = await fetch('http://127.0.0.1:3000/validateUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const responseText = await response.text();
    if (responseText == 'usuario no encontrado' || responseText == 'contraseña incorrecta') {
        alert(responseText);
    } else {
        localStorage.setItem('token', JSON.parse(responseText).token);
        localStorage.setItem('userEmail', JSON.parse(responseText).email);
        localStorage.setItem('userId', JSON.parse(responseText).id);
        alert('Inicio de sesión exitoso');
        window.location.href = './app';
    }
}

document.getElementById('logInForm').addEventListener('submit', (e) => {
    e.preventDefault();
    logIn();
});