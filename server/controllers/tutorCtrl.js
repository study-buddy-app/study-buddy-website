module.exports = {
  updateProfile: (req, res) => {
    console.log('I\'ve got a tutor update request here!')
    const db = req.app.get("db");
    const {f_name, l_name,username,email, age, subjects} = req.body
  
    db.tutor.t_update_profile(f_name, l_name,username,email,+age, subjects)
      .then((profile) => {
        res.status(200).send(profile);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
};
