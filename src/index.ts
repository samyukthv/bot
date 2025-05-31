import app from "./app.js";
import { connectToDB } from "./db/connection.js";

const PORT = 5000

connectToDB().then(()=>{
    app.listen(PORT, ()=> console.log(`Express server running at ${PORT} and DB connected`))  
}).catch(err => console.log(err))
