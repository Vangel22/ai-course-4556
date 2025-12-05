exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    return res.status(200).send("User created!");
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    return res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};
