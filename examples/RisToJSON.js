const fs = require('fs');
const path = require('path');
const { risToJSON } = require('../index');

// Read or access your file however you want,
// just pass in the file contents.
fs.readFile(path.join(__dirname, '../samples/references2.ris'), 'utf8', (_, content) => {
    risToJSON(content)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
