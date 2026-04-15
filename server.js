import app from './app.js'
import { dbconn } from './config/db.config.js'

const PORT = process.env.PORT || 4000

await dbconn()
app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`)
})
