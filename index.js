const express = require("express");
const con = require("./config");
const app = express();

const validate = require("./validationMiddleware");

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

app.post("/", validate, (req, resp) => {
  const data = req.body;

  con.query("INSERT INTO crud SET ? ", data, (error, result, field) => {
    if (error) throw error;
    resp.send("Data Insert Successfully");
  });
});

app.post("/post", validate, (req, resp) => {
  const data = req.body;

  con.query("INSERT INTO crud SET ? ", data, (error, result, field) => {
    if (error) throw error;
    resp.send("Data Insert Successfully");
  });
});

app.put("/:id", validate, (req, resp) => {
  const data = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.address,
    req.body.skills,
    req.body.hobbies,
    req.body.short_desc,
    req.params.id,
  ];
  con.query(
    "UPDATE crud SET name = ? ,email = ? , phone = ? , address = ? , skills = ? ,hobbies = ? ,short_desc = ?  where id = ? ",
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

app.listen(3003);
