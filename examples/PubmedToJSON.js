const fs = require('fs');
const path = require('path');
const { pubmedToJSON } = require('../index');

// Read or access your file however you want,
// just pass in the file contents.
fs.readFile(path.join(__dirname, '../samples/pubmed.txt'), 'utf8', (_, content) => {
    pubmedToJSON(content)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
