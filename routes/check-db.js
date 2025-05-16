// Basic troubleshooting script for MongoDB connection
// Save as check-db.js and run with node check-db.js

require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkDatabase() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ Error: MONGODB_URI environment variable is not set');
    console.log('Make sure you have a .env file with MONGODB_URI defined');
    process.exit(1);
  }

  console.log('Attempting to connect to MongoDB...');
  console.log(`Connection string: ${uri.replace(/:([^:@]+)@/, ':****@')}`); // Hide password
  
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    // List all databases
    const adminDb = client.db('admin');
    const dbs = await adminDb.admin().listDatabases();
    console.log('\nAvailable databases:');
    dbs.databases.forEach(db => {
      console.log(`- ${db.name}`);
    });
    
    // Check for contacts database and collection
    console.log('\nChecking for contacts collection...');
    
    // Detect the database name from the connection string
    let dbName = 'contacts_db'; // Default name
    try {
      const urlParts = uri.split('/');
      if (urlParts.length > 3) {
        const dbPart = urlParts[3];
        dbName = dbPart.split('?')[0]; // Remove query parameters if any
      }
    } catch (err) {
      console.log('Could not determine database name from connection string, using default');
    }
    
    console.log(`Using database: ${dbName}`);
    const db = client.db(dbName);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('\nCollections in this database:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Check if contacts collection exists
    const contactsCollection = collections.find(c => c.name === 'contacts');
    if (!contactsCollection) {
      console.log('\n❌ Warning: "contacts" collection not found in this database');
      console.log('Create the collection and add contacts before continuing');
    } else {
      console.log('\n✅ "contacts" collection found');
      
      // Count documents
      const count = await db.collection('contacts').countDocuments();
      console.log(`Found ${count} documents in the contacts collection`);
      
      if (count === 0) {
        console.log('❌ Warning: Contacts collection is empty');
      } else {
        // Show sample documents
        const samples = await db.collection('contacts').find().limit(3).toArray();
        console.log('\nSample contacts:');
        samples.forEach((doc, i) => {
          console.log(`\n--- Contact ${i+1} ---`);
          console.log(`ID: ${doc._id}`);
          console.log(`Name: ${doc.firstName} ${doc.lastName}`);
          console.log(`Email: ${doc.email}`);
          console.log(`Favorite Color: ${doc.favoriteColor}`);
          console.log(`Birthday: ${doc.birthday}`);
        });
      }
    }
    
  } catch (error) {
    console.error('\n❌ Error connecting to MongoDB:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check if your MongoDB instance is running');
    console.log('2. Verify your connection string is correct');
    console.log('3. Make sure network permissions allow the connection');
    console.log('4. Check if your IP address is whitelisted in MongoDB Atlas (if using Atlas)');
  } finally {
    await client.close();
    console.log('\nDatabase connection closed');
  }
}

checkDatabase().catch(console.error);