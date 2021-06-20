module.exports = {
    getSubject: (req, res) => {
        const db = req.app.get('db')
        db.subject.get_subject().then(subject => {
            res.status(200).send(subject)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}