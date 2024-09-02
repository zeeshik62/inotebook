import { useState } from 'react'
import NoteContext from './noteContext'
const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)
  
  //GET all notes
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
      // .then(response => {
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }
      //   // const json = response.json();
      // })
    // .then(data => {
    //   setData(data); // Set the data to state
    // })
    // .catch(error => {
    //   setError(error); // Handle any errors
    // });
   
    }
  //ADD a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZGRhYWJhZDgzOTFiZWU2NWVjYWFhIn0sImlhdCI6MTcyNDg0MTEyOX0.1JB9a-zarEz1rB-AKKvMXbICUA0LClRcpZLpA-MfmfQ' // Add your auth token here
      },
      body: JSON.stringify({title, description, tag})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const json = response.json();
      })
    // .then(data => {
    //   setData(data); // Set the data to state
    // })
    // .catch(error => {
    //   setError(error); // Handle any errors
    // });
    const note = {
      "_id": "66cefcd798ac29d5b90e68f10",
      "user": "66cddaabad8391bee65ecaaa",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-08-28T10:32:55.586Z",
      "__v": 0
    };
    setNotes(notes.concat(note))

  }
  //DELETE a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZGRhYWJhZDgzOTFiZWU2NWVjYWFhIn0sImlhdCI6MTcyNDg0MTEyOX0.1JB9a-zarEz1rB-AKKvMXbICUA0LClRcpZLpA-MfmfQ' // Add your auth token here
      },
    
    })

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/66cefe0098ac29d5b90e63fb`, {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZGRhYWJhZDgzOTFiZWU2NWVjYWFhIn0sImlhdCI6MTcyNDg0MTEyOX0.1JB9a-zarEz1rB-AKKvMXbICUA0LClRcpZLpA-MfmfQ' // Add your auth token here
      },
      body: JSON.stringify({title, description, tag})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = response.json();
      })
    // .then(data => {
    //   setData(data); // Set the data to state
    // })
    // .catch(error => {
    //   setError(error); // Handle any errors
    // });
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
