const express = require('express')
const app = express()
const port = 3000

app.use('/docs',express.static('docs'))
app.use('/docs',express.static('src'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))