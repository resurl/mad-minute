const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 2011;

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.render(__dirname + '/public/index')
});

app.get('/test/:num', (req,res) => {
    res.render(__dirname + '/public/test', {num: parseInt(req.params.num)})
})

app.get('/test', (req,res) => {
    res.render(__dirname + '/public/ask-test')
});

app.get('/learn/:num', (req,res) => {
    res.render(__dirname + '/public/flash', {num: parseInt(req.params.num)})
})

app.get('/learn', (req,res) => {
    res.render(__dirname + '/public/ask-flash')
});

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
