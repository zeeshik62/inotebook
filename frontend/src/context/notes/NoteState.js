import { useState } from 'react'
import NoteContext from './noteContext'
const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)

  //=============GET all notes===========//
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZGRhYWJhZDgzOTFiZWU2NWVjYWFhIn0sImlhdCI6MTcyNDg0MTEyOX0.1JB9a-zarEz1rB-AKKvMXbICUA0LClRcpZLpA-MfmfQ' // Add your auth token here
      },
    })
    const json = await response.json()
    setNotes(json)

  }
  //===============ADD a note==============//
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZGRhYWJhZDgzOTFiZWU2NWVjYWFhIn0sImlhdCI6MTcyNDg0MTEyOX0.1JB9a-zarEz1rB-AKKvMXbICUA0LClRcpZLpA-MfmfQ' // Add your auth token here
      },
      body: JSON.stringify({ title, description, tag })
    })
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    const note = await response.json();
    setNotes(notes.concat(note))

  }
  //=========DELETE a note===========//
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZGRhYWJhZDgzOTFiZWU2NWVjYWFhIn0sImlhdCI6MTcyNDg0MTEyOX0.1JB9a-zarEz1rB-AKKvMXbICUA0LClRcpZLpA-MfmfQ' // Add your auth token here
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Update local state
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
  
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  //===============Edit a note===========//
  const editNote = async (id, title, description, tag) => {
    try {

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', // or 'POST', 'PUT', etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZGRhYWJhZDgzOTFiZWU2NWVjYWFhIn0sImlhdCI6MTcyNDg0MTEyOX0.1JB9a-zarEz1rB-AKKvMXbICUA0LClRcpZLpA-MfmfQ' // Add your auth token here
        },
        
        body: JSON.stringify({ title, description, tag })
      })
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        

    } catch (error) {
      console.error('Error updating note:', error);
    }
    
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
      break;

    }
    setNotes(newNotes)

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
