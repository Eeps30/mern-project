const express = require('express');
const cors = require('cors');
const { resolve } = require('path');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors());

app.use(express.static(resolve(__dirname, 'client', 'dist')));

function log(req, res, next){
    console.log('This is middleware');
    next();
}

app.use(log);

app.get('/api/get-stuff', (req, res) => {
    res.send({success: true, message: 'Here is some stuff from the back end'})
});

app.post('/api/get-user', (req, res) => {
    res.send({success: true, user: {name: 'Jim Bob', age: 44}});
})

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server running on PORT: ' + PORT);
});