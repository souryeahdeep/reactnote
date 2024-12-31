import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
const app = express();
const port = 8081;
const saltRounds = 10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "mul_to_do",
  password: "sourya3110",
  port: 5432,
});

app.use(cors());
app.use(express.json());
db.connect();
app.use(bodyParser.urlencoded({ extended: true })); 

let UserID = 0;

app.post("/", async (req, res) => {
  const state = req.body;
  const id = state.currentUserID;
  UserID=state.currentUserID;
  try {
    const result = await db.query("SELECT * FROM items WHERE user_id=$1", [id]);
    const items = result.rows;
    return res.json(items);
  } catch (error) {
    return res.json("Error");
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const x = { username: username, val: true, currentUserID: 0 };
  try {
    const result = await db.query("SELECT * FROM users WHERE name = $1", [
      username,
    ]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      x.currentUserID = user.id;
      UserID = x.currentUserID;
      //verifying the password
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            return res.json(x);
          } else {
            x.val = false;
            return res.json(x);
          }
        }
      });
    } else {
      return res.json("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let x = false;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE name = $1", [
      username,
    ]);

    if (checkResult.rows.length > 0) {
      
      return res.json(x);
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query("INSERT INTO users (name, password) VALUES ($1, $2)", [
            username,
            hash,
          ]);
          x=true;
          return res.json(x);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const { content,title } = req.body;
  try {
    const result=await db.query("INSERT INTO items (user_id,titles,content) VALUES ($1,$2,$3)", [
      UserID,
      title,
      content,
    ]);
    if(result){return res.json(UserID)}
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete", async (req, res) => {
  const state = req.body;
  const id=state.id;  
  try {
    const result = await db.query("DELETE FROM items WHERE id=$1", [id]);
    if(result){
      return res.json(true);
    }else{
      return res.json(false)
    }

  } catch (error) {
    console.log(error);
  }
 
});

app.listen(8081, () => {
  console.log(`Server runnning on 8081`);
});
