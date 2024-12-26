(async () => {
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const userToken = localStorage.getItem('token');

    if (!userId || !userEmail || !userToken) {
        alert('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
        window.location.href = './';
    }
    const response = await fetch(`http://localhost:3000/validateTokenExpiration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            userToken
        })
    });
    const responseText = await response.text();
    if (responseText == 'TokenExpired') {
        alert('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
        window.location.href = '/';
    }
    alert('Bienvenido '+userEmail);
})();