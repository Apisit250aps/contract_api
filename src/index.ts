import app from "./app"
import { port } from "./configs"
import { connectToDatabase } from "./models"

app.listen(port, async () => {
  connectToDatabase()
  console.log(`Server listening on http://localhost:${port}/`)
})
