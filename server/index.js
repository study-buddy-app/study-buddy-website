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
const timelogCtrl = require("./controllers/timelog_controller");

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

const paymentCtrl = require('./controllers/PaymentCtrl')
const sessionCtrl = require('./controllers/sessionCtrl')

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
const server= require('http').createServer(app)
const io= require ('socket.io')(server, {
  cors:{
      origin:'http://localhost:4040',
      methods:['GET', 'POST']
  }
})

app.use (cors())

// const PORT= process.env.PORT || 5000

app.get('/', (req,res)=>{
  res.send('Server is running')
})



io.on('connection', (socket)=>{ //<-- establishes initial connection
  socket.emit('me', socket.id) //<-- creates socket.id to user and signal

  //HANDLER FUNCTIONS
  socket.on("disconnect", () => {
  socket.broadcast.emit("callEnded")
});

socket.on("callUser", ({ userToCall, signalData, from, name }) => {
  io.to(userToCall).emit("callUser", { signal: signalData, from, name }); //<--the emitted signal data is sent to the front end -->( signal: signalData, from, name)
});

socket.on("answerCall", (data) => {
  io.to(data.to).emit("callAccepted", data.signal)
});
});
//ENDPOINTS
//auth
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)
//student
app.put('/student/profile', studentCtrl.updateStudent)
app.get('/student/session/tutors', studentCtrl.getTutors)
app.post('/student/session/tutor', studentCtrl.addTutor)
app.delete('/student/session/tutor', studentCtrl.deleteTutor)
//tutor
app.put('/api/tutor/profile/:tutor_id', tutorCtrl.updateProfile)
app.get('/api/tutor/subjects/:tutor_id', tutorCtrl.getSubjectsByTutor)
app.put('/api/tutor/state/subjects', tutorCtrl.getTutorsByStateAndSubject)
app.get('/api/tutor/subjects/:subject_id', tutorCtrl.getTutorsBySubject)
app.delete('/api/tutor/subjects/:tutor_id', tutorCtrl.deleteSubject)
app.post('/api/tutor/subjects/:tutor_id', tutorCtrl.addSubject)
// timelog
app.get('/api/time', timelogCtrl.getTime)
app.post('/api/time', timelogCtrl.addTime)
app.delete('/api/time/:id',timelogCtrl.deleteTime)
app.put('/api/time/:id', timelogCtrl.editTime)

//session
app.post('/api/sessions/appointments/:student_id', sessionCtrl.addSession)
app.delete('/api/session/remove', sessionCtrl.cancelSession)
app.get('/api/session/appointment/:student_id', sessionCtrl.getSessions)
app.get('/api/session/current/appointment/:student_id', sessionCtrl.getUserLatestSession)
//Payment Ctrl
app.post('/payment', cors(), paymentCtrl.addPayment)

//subject
app.get('/api/subject', subjectCtrl.getSubject)
app.get('/api/subject/menu/:student_id', subjectCtrl.getSubjectFromBP)
app.put('/api/subject/student/state', studentCtrl.getStudentsByStateAndSubject)
app.put('/api/subject/tutor/state',tutorCtrl.getTutorsByStateAndSubject)
app.put('/api/subject/student/virtual',studentCtrl.getVirtualStudentsBySubject)
//backpack
app.get('/api/backpack', backpackCtrl.getBackPack)
app.post('/api/backpack/:subject_id', backpackCtrl.addToBackPack)
app.delete('/api/backpack/:subject_id', backpackCtrl.deleteSubjectFromBackPack)