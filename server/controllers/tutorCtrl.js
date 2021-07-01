module.exports = {
  updateProfile: (req, res) => {
    console.log('I\'ve got a tutor update request here!')
    const db = req.app.get("db");
    const {f_name, l_name,username,email, age} = req.body
    const {tutor_id} = req.session.user
    db.tutor.t_update_profile(f_name, l_name,username,email, age, tutor_id)
      .then(([profile]) => {
        delete profile.password 
        res.status(200).send(profile);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  addSubject: (req,res) =>{
    const db = req.app.get('db');
    const {tutor_id} = req.params
    const {subject_id} = req.body
    db.tutor.t_add_subject_to_tutor(tutor_id, subject_id)
    .then((subject)=>{
      res.status(200).send(subject);
    }).catch((err)=>{
      res.status(400).send(err);
    })
  },
  deleteSubject: (req,res) =>{
    const db = req.app.get('db');
    const {tutor_id} = req.params
    const {subject_id} = req.body
    db.tutor.t_delete_subject_from_tutor(tutor_id, subject_id)
    .then((subject)=>{
      res.status(200).send(subject);
    }).catch((err)=>{
      res.status(400).send(err);
    })
  },
  getSubjectsByTutor: (req,res) =>{
    const db = req.app.get('db');
    const {tutor_id} = req.params
    db.tutor.t_get_subjects_by_tutorID(tutor_id)
    .then((subject)=>{
      res.status(200).send(subject);
    }).catch((err)=>{
      res.status(400).send(err);
    })   
  },
  getTutorsByStateAndSubject: (req,res)=>{
    const db = req.app.get('db');
    const {state, subject_id} = req.body
    console.log('I\'ve got a tutor by state and subjects request here!')
    db.tutor.t_get_tutors_by_state_and_subject(state, subject_id)
    .then((tutors)=>{
      res.status(200).send(tutors);
    }).catch((err)=>{
      res.status(400).send(err);
    })
  },
  getTutorsBySubject: (req,res) =>{
    const db = req.app.get('db');
    const {subject_id} = req.body
    db.tutor.t_get_tutors_by_subject(subject_id)
    .then((tutors)=>{
      res.status(200).send(tutors);
    }).catch((err)=>{
      res.status(400).send(err);
    })
  }
};
