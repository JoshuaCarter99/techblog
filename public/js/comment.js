const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.getElementById('comment').value.trim();
    const postID = document.getElementById('post-id').value.trim();

    if (comment) {
        const response = await fetch(`/api/posts/${postID}/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            if (response.redirected) {
                alert('You must be logged in to leave a comment.');
                document.location.replace('/login');
            } else {
                document.location.reload();
            }
        } else {
            alert('Failed to submit comment.');
        }
    } else {
        alert('Please enter a comment.');
    }
}

document.querySelector('form').addEventListener('submit', commentFormHandler);