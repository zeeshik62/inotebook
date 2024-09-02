import React from 'react'
import { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

function Addnotes() {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [notess, setNotess] = useState({ title: "", description: "", tag: "" });

    const handleChange = (e) => {
        setNotess({ ...notess, [e.target.name]: e.target.value });
        // console.log(e.target.name, e.target.value); // This will help you debug whether the correct values are being captured
    };

    const handleClick = (e) => {
        e.preventDefault();
        addNote(notess.title, notess.description, notess.tag);
        setNotess({ title: "", description: "", tag: "" }); // Reset the form fields after adding the note
    };

    return (
        <div>
            <section>
                <div className="container mt-3">
                    <h2>Add a Note:</h2>
                    <hr />
                    <form>
                        <div className="form-group my-2">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="Enter title of 5 character atleast"
                                onChange={handleChange}
                                value={notess.title} // Add this line
                            />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                placeholder="Enter Description of 5 character atleast"
                                onChange={handleChange}
                                value={notess.description} // Add this line
                            />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="tag">Tag:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tag"
                                name="tag"
                                placeholder="Enter tag"
                                onChange={handleChange}
                                value={notess.tag} // Add this line
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button disabled={notess.title.length<5 || notess.description.length<5}
                                type="submit"
                                className="btn btn-secondary"
                                style={{ width: '400px', backgroundColor: 'rgb(45 97 150)' }}
                                onClick={handleClick}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Addnotes;