import express from 'express';
const router = express.Router();
import fetchuser from '../middleware/fetchuser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
//ROUTE:1 Get user notes using:GET "/api/auth/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes);

  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})




//ROUTE:2 Add a note :POST "/api/auth/addnote". Login Required
router.post('/addnotes', fetchuser, [
  body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long')

], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id
    });

    // Save the user to the database
    await note.save();
    res.json(note);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



//ROUTE:3 Update a note :PUT"/api/auth/updatenotes". Login Required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid Note ID");
  }

  // Create an object to hold the updated fields
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    // Send the updated note as a response
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//ROUTE:4 Delete an existing note :DELETE "/api/auth/updatenotes". Login Required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid Note ID");
  }
  try {
    // Find the note to delete
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    // Update the note
    note = await Notes.findByIdAndDelete(req.params.id);

    // Send the updated note as a response
    res.json({
      "Success": "Note Deleted",
      note: note
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
export default router;