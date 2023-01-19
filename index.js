const express = require("express");
const con = require("./config");
const app = express();

app.use(express.json());

app.get("/", (req, resp) => {
  con.query("SELECT * FROM crud", (err, result) => {
    if (err) {
      resp.send("Error");
    } else {
      resp.send(result);
    }
  });
});

app.post("/", (req, resp) => {
  const data = req.body;
  //   const data = {
  //     name: "parth",
  //     email: "parth@gmail.com",
  //     phone: 98982344555,
  //     address: "gujarat",
  //     photo: "test",
  //     skills: "driving",
  //     hobbies: "driving",
  //     short_desc: "test",
  //   };
  con.query("INSERT INTO crud SET ? ", data, (error, result, field) => {
    if (error) throw error;
    resp.send("Data Insert Successfully");
  });
});

app.put("/:id", (req, resp) => {
  const data = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.address,
    req.body.photo,
    req.body.skills,
    req.body.hobbies,
    req.body.short_desc,
    req.params.id,
  ];
  con.query(
    "UPDATE crud SET name = ? ,email = ? , phone = ? , address = ? ,photo = ?, skills = ? ,hobbies = ? ,short_desc = ?  where id = ? ",
    data,
    (error, result, field) => {
      if (error) throw error;
      resp.send("Update Data Successfully");
    }
  );
});

app.delete("/:id", (req, resp) => {
  con.query("DELETE FROM crud WHERE id = " + req.params.id, (error, result) => {
    if (error) throw error;
    resp.send("Remove User Successfully");
  });
});

app.listen(4001);
