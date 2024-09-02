import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar'
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
function App() {
  return (
    <div className="App">
      
      <NoteState>
      <Router>
      <Navbar/>
      <Alert msg={'Alert!'}/>
      <div className="conatiner ">
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;




//concurrently  
// "both":"concurrently \"npm start\" \"nodemon ../backend/index.js\""