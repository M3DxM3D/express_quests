const database = require("./database");


const getUsers = (req, res) => {


    database
  
      .query("select * from users")
      .then(([users]) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };


const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.status(200).json(users[0]);
        } else {
          res.status(404).send("User Not Found");
        }
      })
      .catch((err) => {
        console.error(err.message)
        res.status(500).send("Error retrieving data from database");
      });
  };

 const postUser = (req, res) => {
  const { firstname, lastname, email, city } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city) VALUES (?, ?, ?, ?)",
      [firstname, lastname, email, city]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};


const updateUser = (req, res)=> {
  const id= parseInt(req.params.id)
  const { firstname, lastname,email,city,language } = req.body;
  
  
  database
  .query(
    "UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=? where id =?",
    [firstname, lastname,email,city,language,id]
  )
  .then(([result]) => {
  
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found");
    } else {
      res.sendStatus(204);
    }
      })
  
  .catch((err) => {
    console.error(err.message)
    res.status(500).send("Error editing the user");
  });
  
  };



  module.exports = { getUsers, getUserById, postUser,updateUser };