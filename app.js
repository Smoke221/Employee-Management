const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/userRoute");
const { empRouter } = require("./routes/employeeRouter");

require("dotenv").config();
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send(`
        <h1>Welcome to the Employee management.</h1>
  `);
});

app.use('/user', userRouter)
app.use('/emp', empRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
