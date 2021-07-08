module.exports = {
    getBackPack: (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        if(!user){
            return res.status(511).send('User not Found')
        }
        db.backpack.get_backpack_subject(user.student_id )
        .then(backpack => {
            res.status(200).send(backpack)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        
        })
    },
    getTutorBackPack: (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        if(!user){
            return res.status(511).send('User not Found')
        }
        db.backpack.get_tutor_backpack_subject(user.tutor_id )
        .then(backpack => {
            res.status(200).send(backpack)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    addToBackPack: (req, res) => {
        const db = req.app.get('db')  
        const {user} = req.session
        const {subject_id} = req.body

        db.backpack.add_to_backpack(user.student_id, subject_id)
        .then((backpack) => {
            res.status(200).send(backpack)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    addToTutorBackPack: (req, res) => {
        const db = req.app.get('db')  
        const {tutor_id} = req.params
        const {subject_id} = req.body

        db.backpack.add_to_tutor_backpack(+tutor_id, subject_id)
        .then((backpack) => {
            res.status(200).send(backpack)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    deleteSubjectFromBackPack: (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        const {subject_id} = req.params
        if(!user){
            return res.status(511).send('User not found')
        }
        db.backpack.delete_subject_from_backpack(user.student_id, subject_id)
        .then((backpack) => {
            res.status(200).send(backpack)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    deleteSubjectFromTutorBackPack: (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        const {subject_id} = req.params
        if(!user){
            return res.status(511).send('User not found')
        }
        db.backpack.delete_subject_from_tutor_backpack(user.tutor_id, subject_id)
        .then((backpack) => {
            res.status(200).send(backpack)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
}