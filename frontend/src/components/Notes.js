import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';

function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [notess, setNotess] = useState({id: "", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNotess({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    // Implement update note functionality here
  };
  const ref = useRef(null)
  const refClose = useRef(null)

  const handleChange = (e) => {
    setNotess({ ...notess, [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value); // This will help you debug whether the correct values are being captured
};

const handleClick = (e) => {
   editNote(notess.id, notess.etitle, notess.edescription, notess.etag)
   
    ref.current.click();
};

  return (
    <>
      <Addnotes />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


              <form>
                <div className="form-group my-2">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Enter title"
                    onChange={handleChange}
                    value={notess.etitle} // Add this line
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter Description"
                    onChange={handleChange}
                    value={notess.edescription} // Add this line
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="tag">Tag:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter tag"
                    onChange={handleChange}
                    value={notess.etag} // Add this line
                  />
                </div>
               
              </form>


            </div>
            <div className="modal-footer">
              <button ref= {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row g-12 my-3'>
        <h2>Your notes:</h2>
        <div className='container mx-2'>
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => (
          <div className='col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mt-3' key={note._id}>
            <Noteitem updateNote={updateNote} note={note} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Notes;