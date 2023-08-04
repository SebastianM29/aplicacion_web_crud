const notelist = document.querySelector('#notes');


const noteUI = (notes) => {
   const div = document.createElement('div')
   div.innerHTML = `
    <div class="card card-body rounded-5 mb-4"> 
        <div class="d-flex justify-content-between">  
           <div> 
              <h1 class = "h3 card-title">${notes.title} </h1>
           </div>  
           <div>
              <button  data-id="${notes.id}" class="update btn btn-danger rounded-5">editar</button>
              <button data-id="${notes.id}" class="borrar btn btn-primary rounded-5">borrar</button>
           </div>
        </div>   
           <p> ${notes.description} </p>
    </div>
    
    `;


    return div
   
   
}


const renderNotes = (notes) => {
savedId = ''
limpiar()

 notes.forEach(notes => {
   notelist.append(noteUI(notes))
 });
}


const appendNote = (note) => {
   notelist.append(noteUI(note))
}




notelist.addEventListener('click', (e) => {
   if (e.target.classList.contains('borrar')) {
      const valor = e.target.parentNode.parentNode.parentNode
      const valorId = valor.querySelector('.borrar[data-id]')
      valorIdAttr = valorId.getAttribute('data-id');
      console.log(valorIdAttr)
     
      deleteS(valorIdAttr)
   }

   if (e.target.classList.contains('update')) {
      console.log('aca estamos haciendo click sobre el boton editar',e.target)
      const value = e.target
      const idEdit = value.dataset.id
      
      
      
      update(idEdit);

      
   }

})

function upd (note) {
   const title = document.querySelector('#title');
   const description = document.querySelector('#description')
   
   title.value = note.title;
   description.value = note.description;

   savedId = note.id
}




function limpiar ()  {
   while (notelist.firstChild) {
      notelist.removeChild(notelist.firstChild)
      
   }

}