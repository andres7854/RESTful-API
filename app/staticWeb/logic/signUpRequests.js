async function signUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!username || !email || !password) {
        alert('Por favor complete todos los campos');
        return;
    }
    const response = await fetch(`/createUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username, 
            email, 
            password 
        })
    });
    const responseText = await response.text();
    if (responseText == 'usuario creado exitosamente') {
        alert('Usuario creado exitosamente. Por favor inicie sesión.');
        window.location.href = './login';
    } else {
        alert('Usuario no creado');
    }
}

document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    signUp();
});