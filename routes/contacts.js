// routes/contacts.js - Following MVC pattern with separated controllers
const express = require('express');
const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET all contacts
/**
 * @swagger
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get all contacts
 *     description: Retrieves a list of all contacts from the database
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/ContactResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
router.get('/', contactsController.getAllContacts);

// GET contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get contact by ID
 *     description: Retrieves a specific contact by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the contact
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ContactResponse'
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
router.get('/:id', contactsController.getContactById);

// POST - Create a new contact
/**
 * @swagger
 * /contacts:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Create a new contact
 *     description: Creates a new contact in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NewContactResponse'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
router.post('/', contactsController.createContact);

// PUT - Update a contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     tags:
 *       - Contacts
 *     summary: Update a contact
 *     description: Updates an existing contact in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the contact to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ContactInput'
 *     responses:
 *       204:
 *         description: Contact updated successfully (no content)
 *       400:
 *         description: Invalid ID format or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
router.put('/:id', contactsController.updateContact);

// DELETE - Delete a contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Delete a contact
 *     description: Deletes a contact from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the contact to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact deleted successfully
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;