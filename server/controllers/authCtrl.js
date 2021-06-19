const bcrypt = require("bcryptjs");

module.exports = {
  // register: async (req, res) => {
  //   console.log('I\'ve got a user registration request here!')
  //   const db = req.app.get("db");
  //   const { usertype } = req.body;
  //   if (usertype === "student") {
  //     const { username, password, usertype} = req.body;
  //     const [s_result] = await db.auth.s_check_username(username);
  //     if (s_result) {
  //       return res.status(409).send("That username is already in use.");
  //     }
  //     const salt = bcrypt.genSaltSync(10);
  //     const hash = bcrypt.hashSync(password, salt);
  //     const [user] = await db.auth.s_register_user(username, hash, usertype);
  //     const [backpack] = await db.backpack.create_backpack(user.student_id)
  //     delete user.password;
  //     req.session.user = user;
  //     req.session.user.backpack_id = backpack.backpack_id;
  //   }
  register: async (req, res) => {
    const db= req.app.get('db')
    const {username, password, usertype, email, f_name, l_name, age} = req.body
    const [result] = await db.auth.s_check_username(username)
    if (usertype === "student"){
    if(result){
        return res.status(409).send('Email already in use')
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const [user] = await db.auth.s_register_user(username, hash, usertype, email, f_name, l_name, age)
    const [backpack] = await db.backpack.create_backpack(user.student_id)
    delete user.password
    req.session.user = user 
    req.session.user.backpack_id = backpack.backpack_id
  }

    if (usertype === "tutor") {
      const {username, password, usertype, email, f_name, l_name, age} = req.body;
      const [t_result] = await db.auth.t_check_username(username);
      if (t_result) {
        return res.status(409).send("That username is already in use.");
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const [user] = await db.auth.t_register_user(username, hash, usertype, email, f_name, l_name, age)
      const [backpack] = await db.backpack.create_t_backpack(user.tutor_id)
      delete user.password;
      req.session.user = user;
      req.session.user.backpack_id = backpack.backpack_id
    }
      return res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    console.log("I've got a user login request here!");
    const db = req.app.get("db");
    const { username, password, usertype } = req.body;

    if (usertype === "student") {
      const [user] = await db.auth.s_check_username(username);
      console.log("user:", user);
      if (!user) {
        return res.status(401).send("Sorry but that username was not found.");
      }
      const isAuthenticated = bcrypt.compareSync(password, user.password);
      if (!isAuthenticated) {
        return res.status(403).send("Incorrect Password or Username.");
    }
    delete user.password;
    req.session.user = user;
    return res.status(200).send(req.session.user);
  }
    if (usertype === "tutor") {
      const [user] = await db.auth.t_check_username(username);
      console.log("user:", user);
      if (!user) {
        return res.status(401).send("Sorry but that username was not found.");
      }
      const isAuthenticated = bcrypt.compareSync(password, user.password);
      if (!isAuthenticated) {
        return res.status(403).send("Incorrect Password or Username.");
      }
      delete user.password;
      req.session.user = user;
      return res.status(200).send(req.session.user);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },
  getUser: (req, res) => {
    if (!req.session.user) {
      return res.status(401).send("User not found.");
    }
    return res.status(200).send(req.session.user);
  },
};
