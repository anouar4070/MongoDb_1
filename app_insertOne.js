const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

//insertOne record into employee
let newEmployee = new Employee({
  emp_name: "John Doe",
  age: 37,
  location: "Illinois",
  email: "jdoe@somewhere.com",
});
newEmployee
  .save()
  .then(() => {
    return Employee.find();
  })
  .then((data) => {
    console.log("\n\n📄 Documents in employees collection after insertOne:");
    console.log(data);
  })
  .catch((error) => {
    console.error("❌ Insertion Error :", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
