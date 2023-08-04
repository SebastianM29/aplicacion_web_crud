






const noteForm = document.querySelector('#formulario');




noteForm.addEventListener('submit', (e) => {
const title = document.querySelector('#title').value;
const description = document.querySelector('#description').value;

    e.preventDefault()

    if (savedId) {
        console.log('actualizando')

    updateNote(title,description,savedId)

    } else {
 
    savedNotes(title,description)
    }

    noteForm.reset()




})