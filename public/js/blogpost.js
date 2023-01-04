const blogpostHandler = (event) => {
    event.preventDefault();

    // Find closest parent element with 'card' class
    // Grab ID of the blogpost that was clicked on
    const id = event.target.closest('.card').id.split('-')[1];

    let page = window.location.href.split('/');
    page = page[page.length-1]; 

    if (page === 'home') {
        // Bring user to home/posts/id# (leave/view comments)
        document.location.replace(`/home/posts/${id}`);
    } else if (page === 'dashboard') {
        // Bring user to /dashboard/posts/id# (update/delete blogpost)
        document.location.replace(`/dashboard/posts/${id}`);
    }
}

document.querySelectorAll('.clickable-card').forEach(card => card.addEventListener('click', blogpostHandler));