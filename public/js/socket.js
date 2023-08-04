
    const socket = io()
    let savedId = ''

    const online = document.querySelector('#online');
    const offline = document.querySelector('#offline');
    
    
        socket.on('connect', () => {
            offline.style.display = 'none';
            online.style.display = '';
        } );
        
        socket.on('disconnect', () => {
            online.style.display = 'none';
            offline.style.display = '';
        } )
        
        socket.on('client:newNote' , (newNote) => {
       
         appendNote(newNote)
        })

        socket.on('server:loadNotes',(array) => {
         renderNotes(array)
        })
        
        socket.on('fromServer:updating',(datesFind) => {
          upd(datesFind)
        })
        






const savedNotes = (title , description) => {

    socket.emit('client:newNote' , {
        title,
        description
    },
    /*(id) =>{
       console.log ('recbibiendo desde el servidor al cliente solamente',id)
      
    }^**/
    )
}

function deleteS (id) {
    socket.emit('fromClient:delete',id)
}

//capturando el id para enviarlo y traer el dato 
function update (id) {
    socket.emit('fromClient:update', id)
}
//una vez teniendo el id en el front con los nuevos datos se los envia de vuelta
function updateNote(title,description,saveId) {
    const data = {
        title,
        description,
        saveId
    }
    socket.emit('fromClient:savingNotes',data)
}

