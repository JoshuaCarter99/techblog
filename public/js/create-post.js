const createPostHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.getElementById('new-post').value.trim();
    const postBody = document.querySelector('textarea').value.trim();

    if (postTitle && postBody) {
        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({ 
                postTitle,
                postBody
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blogpost.');
        }
    } else {
        alert('Please enter the post title and body.');
    }
}

document.querySelector('.submit-post').addEventListener('submit', createPostHandler);