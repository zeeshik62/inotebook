import connectToMongo from './db.js';
import express from 'express';
import cors from 'cors';



const app = express();
const port = 5000;
app.use(cors());
connectToMongo();
app.use(express.json());

app.use('/api/auth', (await import('./routes/auth.js')).default)  
app.use('/api/notes', (await import('./routes/notes.js')).default) 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
