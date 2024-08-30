const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI and Database Name
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'formbuilder';

let db;

// Connect to MongoDB and ensure the database is created if it doesn't exist
MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        console.log(`Connected to database: ${dbName}`);

        // Ensure the 'forms' collection exists by inserting a dummy document and then deleting it
        db.collection('forms').insertOne({ dummy: true })
            .then(result => db.collection('forms').deleteOne({ _id: result.insertedId }))
            .catch(err => console.error('Error ensuring collection exists', err));
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));

// API Endpoints

// GET all forms
app.get('/api/forms', async (req, res) => {
    try {
        const forms = await db.collection('forms').find().toArray();
        res.json(forms);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET a single form by ID
app.get('/api/forms/:id', async (req, res) => {
    try {
        const form = await db.collection('forms').findOne({ _id: new ObjectId(req.params.id) });
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new form
app.post('/api/forms', async (req, res) => {
    try {
        const newForm = {
            FormTitle: req.body.title,
            fields: req.body.inputFields,
            createdAt: new Date()
        };
        console.log(newForm);
        
        const result = await db.collection('forms').insertOne(newForm);
        res.status(201).json({ message: 'Form created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT to update a form
app.put('/api/forms/:id', async (req, res) => {
    try {
        const updatedForm = {
            FormTitle: req.body.FormTitle,
            fields: req.body.fields,
            updatedAt: new Date()
        };
        const result = await db.collection('forms').findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedForm },
            { returnOriginal: false }
        );
        if (!result.value) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(result.value);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE a form by ID
app.delete('/api/forms/:id', async (req, res) => {
    try {
        const result = await db.collection('forms').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json({ message: 'Form deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// POST endpoint to save form data
app.post('/api/formdata', async (req, res) => {
    try {
        const formData = req.body;

        // Save the data into a collection named "form_submissions"
        const result = await db.collection('form_submissions').insertOne(formData);

        // Return the saved object
        res.status(201).json({ formData });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
