module.exports = {
updateStudent: (req,res) =>{
   const db = req.app.get('db')
   console.log('I\'ve got a student update request here!')
   const {f_name, l_name,username,email,age} = req.body
    db.student.s_update_profile( f_name, l_name,username,email,+age)
    .then((profile)=>{
        res.status(200).send(profile)
    }).catch((err)=>{
        res.status(400).send('Please register your account before updating.')
    }) 
},
getTutors: (req,res) =>{
    const db = req.app.get('db')
    const {subjects} = req.body
    db.student.s_get_tutors(subjects)
    .then((tutors)=>{
        res.status(200).send(tutors)
    }).catch((err)=>{
        res.status(400).send(err)
    })
},
addTutor: (req,res) =>{
    const db = req.app.get('db')
    const {student_id} = req.params
    const {date,tutor_id,start_time,end_time} = req.body
    db.student.s_add_tutor(student_id, date,tutor_id,start_time,end_time)
    .then((tutor)=>{
        res.status(200).send(tutor)
    }).catch((err)=>{
        res.status(400).send(err)
    })
},
deleteTutor: (req,res)=>{
    const db = req.app.get('db')
    const {student_id} = req.params
    const {tutor_id} = req.body
    db.student.s_delete_tutor(student_id,tutor_id)
    .then((newList)=>{
        res.status(200).send.json({
            message: 'Your tutors have been updated',
            body: newList
        })
    }).catch((err)=>{
        res.status(400).send(err)
    })
}
}