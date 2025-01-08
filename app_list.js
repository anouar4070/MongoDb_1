const mongoose = require("mongoose");
const Employee = require("./employee");

const uri = "mongodb://127.0.0.1:27017/employeeDB";

mongoose
  .connect(uri, { dbName: "employeeDB" })
  .then(() => {
    console.log("✅ Connected to MongoDB !");
  })
  .catch((err) => {
    console.error("❌ Error of connection to MongoDB:", err);
  });

  Employee.find().then((data) => {
    console.log("✅ Document found :", data);
}).catch(err => {
    console.error("❌ cannot found any document:", err);
}).finally(() => {
    mongoose.connection.close();
});

