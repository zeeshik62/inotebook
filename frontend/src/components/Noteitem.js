import React from 'react'
import NoteContext from '../context/notes/noteContext'
import { useContext } from 'react'

const Noteitem =(props)=> {
  const context=useContext(NoteContext)
  const {deleteNote} = context;
    const {note, updateNote}=props;
    return (
   <>
      <div className="card h-100" style={{ marginBottom: '20px'}}>
  <div className="card-body" style={{ height: '150px', overflowY: 'auto' }}>
  <span style={{ fontWeight: 'bold' }}>Title: </span>
  <span>{note.title}</span><br/><br/> 
  <hr className='mt-0 border-1 border-info'/>
    {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
    <span style={{ fontWeight: 'bold' }}>Description: </span>
    <span>{note.description}</span><br/><br/>   
    <span style={{ fontWeight: 'bold' }}>Tag: </span>
    <span>{note.tag}</span><br/><br/> 
  </div>
  <hr className='mt-0 border-2 border-info'/>
  <div className="d-flex align-items-center mx-2 mb-2">
          <i className="fa-solid fa-trash-can-arrow-up mx-2" onClick={() => deleteNote(note._id)}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
</div>

   </>
        
  )
}

export default Noteitem
