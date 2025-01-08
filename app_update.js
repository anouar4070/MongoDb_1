const mongoose = require('mongoose');
const Employee = require('./employee'); // Import the Employee model

const uri = "mongodb://127.0.0.1:27017/employeeDB";

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, { dbName: 'employeeDB' });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1);  // Exit the process if the connection fails
    }
}

// Function to update one employee record
async function updateOneEmployee() {
    try {
        const result = await Employee.updateOne(
            { emp_name: "John Doe" }, // Update criteria
            { email: "jdoe@somewhere.com" } // Values to update
        );
        console.log("✅ Result for updateOne:", result);
        console.log(`✅ ${result.matchedCount} document(s) matched, ${result.modifiedCount} document(s) updated.`);
    } catch (error) {
        console.error("❌ Error updating one record:", error);
    }
}

// Function to update multiple employee records
async function updateManyEmployees() {
    try {
        const result = await Employee.updateMany(
            { age: { $gt: 30 } }, // Update criteria
            { location: "New York" } // Values to update
        );
        console.log("✅ Result for updateMany:", result);
        console.log(`✅ ${result.matchedCount} document(s) matched, ${result.modifiedCount} document(s) updated.`);
    } catch (error) {
        console.error("❌ Error updating many records:", error);
    }
}

// Main function to execute all operations
async function main() {
    await connectToMongoDB();
    await updateOneEmployee();   // Update one document
    await updateManyEmployees(); // Update multiple documents
    mongoose.connection.close();  // Close the MongoDB connection properly
}

main();


/**
 * The result object:
 * 
 {
  acknowledged: true,       // Indicates that the request was received and processed by the server
  modifiedCount: 1,        // The number of documents that were actually modified by the update operation.
  upsertedId: null,        // The _id of the document that was inserted if an upsert operation occurred (i.e., no matching document was found and a new one was created). `null` means no new document was inserted.
  upsertedCount: 0,        // The number of documents inserted due to an upsert. A value of `0` means no document was inserted.
  matchedCount: 1          // The number of documents that matched the update criteria (i.e., the number of documents that met the conditions specified in the query).
}

 */