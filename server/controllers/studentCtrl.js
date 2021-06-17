module.exports = {
updateStudent: (req,res) =>{
   const db = req.app.get('db')
   const {student_id} = req.params;
   const {f_name, l_name,username,email,age} = req.body
    db.student.s_update_profile(f_name, l_name,username,email,age)
    .then((profile)=>{
        res.status(200).send(profile)
    }).catch((err)=>{
        res.status(400).send(err)
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
    db.student.s_add_tutor()
    .then((tutor)=>{
        res.status(200).send(tutor)
    }).catch((err)=>{
        res.status(400).send(err)
    })
},
deleteTutor: (req,res)=>{
    const db = req.app.get('db')
    db.student.s_delete_tutor()
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