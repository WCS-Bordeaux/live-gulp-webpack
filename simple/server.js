const express = require('express'),
    app = express()

app.use(express.static(__dirname + '/public/'))

app.get('/hello', function (req, res) {
    res.send('world!!!')
})

app.listen(3435, () => {
    console.log('server up at http://localhost:3435')
})
