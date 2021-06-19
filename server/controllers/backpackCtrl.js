module.exports = {
    getBackPack: (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        if(!user){
            return res.status(511).send('User not Found')
        }
        db.backpack.get_backpack_subject(user.backpack_id ).then(backpack => {
            res.status(200).send(backpack)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    addToBackPack: (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        const {subject_id} = req.params 
        if(!user){
            return res.status(511).send('User not found')
        }
        db.backpack.add_to_backpack(user.backpack_id, subject_id)
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
        db.backpack.delete_subject_from_backpack(user.backpack_id, subject_id)
        .then((backpack) => {
            res.status(200).send(backpack)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}