const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log('Signed up successfully!');
            document.location.replace('/');
        } else {
            if (response.status === 400) {
                alert('Username already exists.');
            } else {
                alert('Failed to sign up.');
            }
        }
    } else {
        alert('Please provide both the username and password.');
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);