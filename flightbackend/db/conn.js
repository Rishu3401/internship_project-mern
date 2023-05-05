
const mongoose=require('mongoose');

const DB=process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));