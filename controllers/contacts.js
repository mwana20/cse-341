// controllers/contacts.js
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    console.log('📥 GET /contacts request received');
    const db = getDb();
    console.log(`Using database: ${db.databaseName}`);
    
    const contacts = await db.collection('contacts').find().toArray();
    console.log(`📤 Returning ${contacts.length} contacts`);
    
    res.status(200).json(contacts);
  } catch (err) {
    console.error('❌ Error in getAllContacts:', err);
    res.status(500).json({ 
      error: 'Could not fetch contacts',
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  try {
    console.log(`📥 GET /contacts/${req.params.id} request received`);
    const db = getDb();
    
    if (!ObjectId.isValid(req.params.id)) {
      console.log('❌ Invalid ObjectId format');
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const contact = await db.collection('contacts').findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (!contact) {
      console.log('❌ Contact not found');
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    console.log('📤 Returning contact:', contact._id);
    res.status(200).json(contact);
  } catch (err) {
    console.error('❌ Error in getContactById:', err);
    res.status(500).json({ 
      error: 'Failed to fetch contact',
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    console.log('📥 POST /contacts request received');
    const db = getDb();
    
    // Check if all required fields are present
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields', 
        message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required' 
      });
    }
    
    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };
    
    const result = await db.collection('contacts').insertOne(newContact);
    console.log(`📤 Created new contact with ID: ${result.insertedId}`);
    
    res.status(201).json({
      id: result.insertedId,
      message: 'Contact created successfully'
    });
  } catch (err) {
    console.error('❌ Error in createContact:', err);
    res.status(500).json({ 
      error: 'Failed to create contact',
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  try {
    console.log(`📥 PUT /contacts/${req.params.id} request received`);
    const db = getDb();
    
    if (!ObjectId.isValid(req.params.id)) {
      console.log('❌ Invalid ObjectId format');
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    // Check if all required fields are present
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields', 
        message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required' 
      });
    }
    
    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };
    
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedContact }
    );
    
    if (result.matchedCount === 0) {
      console.log('❌ Contact not found');
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    console.log(`📤 Updated contact: ${req.params.id}`);
    res.status(204).send(); // 204 No Content - successful update with no content returned
  } catch (err) {
    console.error('❌ Error in updateContact:', err);
    res.status(500).json({ 
      error: 'Failed to update contact',
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  try {
    console.log(`📥 DELETE /contacts/${req.params.id} request received`);
    const db = getDb();
    
    if (!ObjectId.isValid(req.params.id)) {
      console.log('❌ Invalid ObjectId format');
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const result = await db.collection('contacts').deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (result.deletedCount === 0) {
      console.log('❌ Contact not found');
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    console.log(`📤 Deleted contact: ${req.params.id}`);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('❌ Error in deleteContact:', err);
    res.status(500).json({ 
      error: 'Failed to delete contact',
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};