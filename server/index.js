require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const cors = require("cors")

const authCtrl = require('./controllers/authCtrl')
const studentCtrl = require('./controllers/studentCtrl')
const tutorCtrl = require('./controllers/tutorCtrl')
const backpackCtrl = require('./controllers/backpackCtrl')
const subjectCtrl = require( './controllers/subjectCtrl')



const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

const paymentCtrl = require('./controllers/PaymentCtrl')

const app = express()

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 *60 *60 *24}
}))


massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
})
.then(db => {
  app.set('db', db)
  console.log("Database Connected")
  app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
}).catch(err => console.log(err))

//SOCKET IO 
const server = require('http').createServer(app)//for socket io
const io = require('socket.io')(server)//for socket io
const { v4: uuidV4 } = require('uuid') //for socket io
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})
//ENDPOINTS
//auth
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)
//student
app.put('/student/profile', studentCtrl.updateStudent)
app.get('/student/session/tutors', studentCtrl.getTutors)
app.post('/student/session/tutor', studentCtrl.addTutor)
app.delete('/student/session/tutor', studentCtrl.deleteTutor)
//tutor
app.put('/tutor/profile', tutorCtrl.updateProfile)

//session
app.use(cors())
//Payment Ctrl
app.post('/payment', cors(), paymentCtrl.addPayment)

//subject
app.get('/api/subject', subjectCtrl.getSubject)

//backpack
app.get('/api/backpack', backpackCtrl.getBackPack)
app.post('/api/backpack/:subject_id', backpackCtrl.addToBackPack)
app.delete('/api/backpack/:subject_id', backpackCtrl.deleteSubjectFromBackPack)