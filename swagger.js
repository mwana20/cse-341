// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts information',
    version: '1.0.0'
  },
  host: 'cse-341-1lpa.onrender.com', // Production URL
  schemes: ['https'], // HTTPS for production
  tags: [
    {
      name: 'Contacts',
      description: 'Endpoints for managing contacts'
    }
  ],
  definitions: {
    Contact: {
      firstName: 'Phillip',
      lastName: 'Mubbala', 
      email: 'mubbalaphillip@gmail.com',
      favoriteColor: 'yellow',
      birthday: '2003-02-28'
    },
    ContactInput: {
      $firstName: 'Rinah',
      $lastName: 'Mutesi',
      $email: 'mutesirinahl@gmail.com',
      $favoriteColor: 'Purple',
      $birthday: '2005-11-14'
    },
    ContactResponse: {
      _id: '682274ddd0a5b29bade88762',
      firstName: 'Andrew',
      lastName: 'Samuku',
      email: 'samukuandrew@gmail.com',
      favoriteColor: 'blue',
      birthday: '2000-01-21'
    },
    NewContactResponse: {
      id: '682274ddd0a5b29bade88762',
      message: 'Contact created successfully'
    },
    Error: {
      error: 'Error message',
      message: 'Detailed error information'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js', './routes/contacts.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ Swagger documentation generated successfully');
  console.log('📄 File generated: swagger-output.json');
  console.log('🔄 Remember to restart your server to see changes');
}).catch((err) => {
  console.error('❌ Error generating Swagger documentation:', err);
});