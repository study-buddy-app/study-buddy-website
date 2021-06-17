module.exports = {
  updateProfile: (req, res) => {
    const db = req.app.get("db");
    db.tutor.t_update_profile()
      .then((profile) => {
        res.status(200).send(profile);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
};
