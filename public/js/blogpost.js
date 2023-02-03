const blogpostHandler = (event) => {
    event.preventDefault();

    const id = event.target.closest('.card').id.split('-')[1];

    let page = window.location.href.split('/');
    page = page[page.length-1]; 

    if (page === 'home') {
        document.location.replace(`/home/posts/${id}`);
    } else if (page === 'dashboard') {
        document.location.replace(`/dashboard/posts/${id}`);
    }
}

document.querySelectorAll('.clickable-card').forEach(card => card.addEventListener('click', blogpostHandler));