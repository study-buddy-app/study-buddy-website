module.exports = {
    getSubject: (req, res) => {
        const db = req.app.get('db')
        db.subject.get_subject()
        .then(subject => {
            res.status(200).send(subject)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    getSubjectFromBP: (req, res) =>{
        const db = req.app.get('db')
        const {student_id} = req.params
        db.subject.get_subject_bk(student_id)
        .then((bkSubject)=>{
            res.status(200).send(bkSubject)
        }).catch(err =>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}