const { v4 } = require('uuid');



let chat = []


const socketsControllers = (socket,io) => {
    console.log('cliente conectado' , socket.id) 
    
    socket.emit('server:loadNotes',chat)
    
    socket.on('disconnect' , () => {
       console.log('cliente desconectado' , socket.id)
    })
    
    
    socket.on('client:newNote',(newnote) => {
       
       
       const id = v4();
       console.log('este debe ser el id',id)
       newnote.id = id

       chat.push({...newnote});
       io.emit('client:newNote' , newnote)
    })

    socket.on('fromClient:delete', deleteId => {
      chat = chat.filter((chat)=>{ return chat.id != deleteId})
      console.log('deberia ver los que quedan',chat)
      io.emit('server:loadNotes',chat)
    })

    socket.on('fromClient:update', (id) => {
     console.log('llega el id', id);
     const datesFind = chat.find((chat) => {
     return chat.id === id;
     })
     console.log('datos encontrados', datesFind)
     socket.emit('fromServer:updating',datesFind)
    })

    socket.on('fromClient:savingNotes',(data)=>{
      chat = chat.map((chat) => {
         if (chat.id === data.saveId) {
            chat.title = data.title
            chat.description = data.description
         }
         
       return chat
      })

      io.emit('server:loadNotes',chat)
      console.log('con los datos actualizados',chat)
    })


    

  
   }


   module.exports = socketsControllers