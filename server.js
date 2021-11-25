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

app.get('/professor_homepage', (req, res) => {
    res.render('professor_homepage');
})

app.get('/student_course', (req, res) => {
    res.render('student_course');
})

app.get('/student_add_course', (req, res) => {
    res.render('student_add_course');
})

app.get('/student_assignment', (req, res) => {
    res.render('student_assignment');
})

app.get('/student_video', (req, res) => {
    res.render('student_video');
})

app.get('/student_work', (req, res) => {
    res.render('student_work');
})

app.get('/student_textbook', (req, res) => {
    res.render('student_textbook');
})

app.get('/student_lecture', (req, res) => {
    res.render('student_lecture');
})

app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`);
})