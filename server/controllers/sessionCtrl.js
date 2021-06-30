module.exports ={
addSession: (req,res) =>{
    const db = req.app.get('db')
    console.log('I\'ve got an appointment add here!')
    const {student_id} = req.params
    const {description, sch_subject,event_start,event_end,buddy_choice} = req.body
    db.sessions.add_session(description, sch_subject, event_start, event_end, buddy_choice, student_id)
    .then((appointment)=>{
        res.status(200).send(appointment)
    }).catch((err)=>{
        res.status(411).send(err)
    })
},
cancelSession: (req,res) =>{
    const db = req.app.get('db')
    const {student_id} = req.params
    const {schedule_id} = req.body
    db.sessions.cancel_session(student_id, schedule_id)
    .then((canceled)=>{
        res.status(200).send(canceled)
    }).catch((err)=>{
        res.status(411).send(err)
    })
},
getSessions: (req,res) =>{
    const db = req.app.get('db')
    const {student_id} = req.params
    db.sessions.get_sessions(student_id)
    .then((appointments)=>{
        res.status(200).send(appointments)
    }).catch((err)=>{
        res.status(411).send(err)
    })
}
} 