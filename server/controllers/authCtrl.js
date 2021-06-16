const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { usertype } = req.body;
    if (usertype === "student") {
      const { username, password, usertype} = req.body;
      const [c_result] = await db.auth.c_check_username(username);
      if (c_result) {
        return res.status(409).send("That username is already in use.");
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const [user] = await db.auth.c_register_user(username, hash, usertype);
      delete user.password;
      req.session.user = user;
    }
    if (usertype === "tutor") {
      const { username, password, usertype} = req.body;
      const [p_result] = await db.auth.p_check_username(username);
      if (p_result) {
        return res.status(409).send("That username is already in use.");
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const [user] = await db.auth.p_register_user(username, hash, usertype);
      delete user.password;
      req.session.user = user;
    }
      return res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    console.log("I've got a user login request here!");
    const db = req.app.get("db");
    const { username, password, usertype } = req.body;

    if (usertype === "student") {
      const [user] = await db.auth.c_check_username(username);
      console.log("user:", user);
      if (!user) {
        return res.status(401).send("User not found.");
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
      const [user] = await db.auth.p_check_username(username);
      console.log("user:", user);
      if (!user) {
        return res.status(401).send("User not found.");
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
