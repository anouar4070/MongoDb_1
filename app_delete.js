const mongoose = require('mongoose');
const Employee = require('./employee'); // Import Employee model

const uri = "mongodb://127.0.0.1:27017/employeeDB";

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(uri, { dbName: 'employeeDB' });
        console.log("✅ Successfully connected to MongoDB");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        process.exit(1);  // Exit the process if the connection fails
    }
}

// Function to delete a single employee record
async function deleteOneEmployee() {
    try {
        console.log("Deleting one employee record...");
        const result = await Employee.deleteOne({ age: { $lt: 30 }, location: "New York" });
        console.log("✅ Result for deleteOne:", result);
        console.log(`✅ ${result.deletedCount} document(s) deleted.`);
    } catch (error) {
        console.error("❌ Error deleting one record:", error);
    }
}

// Function to delete multiple employee records
async function deleteManyEmployees() {
    try {
        console.log("Deleting multiple employee records...");
        const result = await Employee.deleteMany({ emp_name: { $regex: "A" } });
        console.log("✅ Result for deleteMany:", result);
        console.log(`✅ ${result.deletedCount} document(s) deleted.`);
    } catch (error) {
        console.error("❌ Error deleting many records:", error);
    }
}

// Main function to execute the operations sequentially
async function main() {
    await connectToMongoDB();   // Connect to MongoDB
    await deleteOneEmployee();  // Delete one document
    await deleteManyEmployees(); // Delete multiple documents
    mongoose.connection.close();  // Close the MongoDB connection
    console.log("✅ MongoDB connection closed.");
}

main();  // Execute the main function
