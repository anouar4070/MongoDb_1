const mongoose = require('mongoose');
const Employee = require('./employee');

const uri = "mongodb://127.0.0.1:27017/employeeDB";

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, { dbName: 'employeeDB' });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1);  // Exit the process if MongoDB connection fails
    }
}

async function insertEmployees() {
    const employees = [
        { "emp_name": "Ray Renolds", "age": 32, "location": "Austin", "email": "rayr@somewhere.com" },
        { "emp_name": "Matt Aniston", "age": 25, "location": "Houston", "email": "matta@somewhere.com" },
        { "emp_name": "Monica Perry", "age": 23, "location": "New Jersey", "email": "monicap@somewhere.com" },
        { "emp_name": "Rachel Tribbiani", "age": 28, "location": "Boston", "email": "rachelt@somewhere.com" }
    ];

    try {
        await Employee.insertMany(employees);
        console.log("✅ Records inserted successfully");
    } catch (error) {
        console.error("❌ Error inserting records:", error);
    }
}

async function fetchEmployees() {
    try {
        const employees = await Employee.find();
        console.log("\n📄 Documents in employees collection after insertMany:");
        console.log(employees);
    } catch (error) {
        console.error("❌ Error fetching documents:", error);
    }
}

async function main() {
    await connectToMongoDB();
    await insertEmployees();
    await fetchEmployees();
    mongoose.connection.close();  // Close the MongoDB connection after operations
}

main();
