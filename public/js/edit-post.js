const delPostHandler = async (event) => {
    event.preventDefault();

    const id = document.getElementById('post-id').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    // If response is ok, render dashboard with updated list of user's blogposts
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post.');
    }
};

// Update user's blogpost
const updatePostHandler = async (event) => {
    event.preventDefault();

    // Grab blogpost ID, and updated title and content from form
    const id = document.getElementById('post-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    // If response is ok, render dashboard with updated list of user's blogposts
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update post.');
    }
}

document.querySelector('#delete-post').addEventListener('click', delPostHandler);
document.querySelector('#update-post').addEventListener('click', updatePostHandler);