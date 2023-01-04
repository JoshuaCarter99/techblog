const newPostHandler = async (event) => {
    event.preventDefault();

    const creatingPost = true;

    document.location.replace('/dashboard?creatingPost=true');
}


document.querySelector('button').addEventListener('click', newPostHandler);