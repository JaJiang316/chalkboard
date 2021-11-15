const express = require('express');
var path = require('path');
const app = express();

var ejs = require('ejs');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/src'));
app.set('views', path.join(__dirname, 'src/views'))


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/student_homepage', (req, res) => {
    res.render('student_homepage');
})

app.get('/login_professor', (req, res) => {
    res.render('professor_login');
})  

app.get('/login_admin', (req, res) => {
    res.render('admin_login');
})

app.get('/sign_up', (req, res) => {
    res.render('signup');
})

app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`);
})