const express = require('express'),
    app = express()

app.use(express.static(__dirname + '/../dist/'))
app.use('/node_modules', express.static(__dirname + '/../public/node_modules/'))
app.use('/mocks', express.static(__dirname + '/../mocks/'))

app.get('/hello', function (req, res) {
    res.send('world!!!')
})

app.listen(3434, () => {
    console.log('server up at http://localhost:3434')
})
