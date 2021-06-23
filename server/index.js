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
app.get('/tutor/subjects/:tutor_id', tutorCtrl.getSubjectsByTutor)
app.get('/tutor/subjects', tutorCtrl.getTutorsByStateAndSubject)
app.get('/tutor/subjects/:subject_id', tutorCtrl.getTutorsBySubject)
app.delete('/tutor/subjects/:tutor_id', tutorCtrl.deleteSubject)
app.post('/tutor/subjects/:tutor_id', tutorCtrl.addSubject)

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