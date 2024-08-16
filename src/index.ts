import app from "./app"

import { port } from "./configs"

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`)
})
