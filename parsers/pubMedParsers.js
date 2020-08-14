//https://pubmed.ncbi.nlm.nih.gov/PUBMEDID
const chevrotain = require('chevrotain');
const { pubMedToJsonTag, getPubMedRegEx, pubMedTags } = require('../utilities/encoding');
const { createToken } = chevrotain;
const punycode = require('punycode');

const typeProperty = createToken({
  name: 'Type',
  pattern: /PT.*/i,
});

const generalProperty = createToken({
  name: 'Field',
  pattern: getPubMedRegEx(),
});

const sentenceProperty = createToken({
  name: 'Sentence',
  pattern: /[a-zA-Z0-9-.]+/i,
  // pattern: /([A-Z][^\.!?]*[\.!?])/i,
  line_breaks: true
});

const SelectLexer = new chevrotain.Lexer(
  [typeProperty, generalProperty, sentenceProperty],
  {
    positionTracking: 'onlyOffset',
  },
);

/**
 * @function - Transforms a token vector into JSON
 * @param {vector} Tokens
 * @returns {.json}
 */

const transformToJSON = (parsedData) => {

  const pubmedArray = [];
  let property = '';
  let item = {};

  parsedData.tokens.forEach(({ image, tokenType: { name } }, index) => {

    if (name === 'Type') {
      const str = image.split(/[-]/i)
      property = str[0].replace()
      item.type = str[1].replace(/^\s+/, '')
      //console.log("Type = "+ item.type)
    }

    if (name === 'Field') {

      /**Option-1 use Regex but text can have hyphens so split the remaining after initial extraction */
      /**Option-2
       * Using Substring as the text can have hyphens
       * indexOf will always point to the first occurance of the hyphen*/

      const tag = image.substring(0, image.indexOf('-')).replace(/\s+/, '')//Remove Spaces  
      //Match if the tags are within the permisible tag list. This will avoid false positives
      let newValue = ''
      if (!(tag in pubMedTags)) {
        //If the tag was not found, it means it is a continuation of the previous property
        newValue = image.replace(/^\s+/, '')
      }
      else {
        //The property name is a valid one. 
        property = tag.replace(/\s+/, '')//Remove Spaces      
        property = pubMedToJsonTag(property)
        newValue = image.substring(image.indexOf('-') + 1, image.length).replace(/^\s+/, '')
      }
      /**If an item already exists, take the previous one and add them as array if its not an array */
      if (property in item) {
        if (item[property].constructor == Array)
          item[property].push(newValue)
        else {
          let oldValue = item[property]
          item[property] = []
          item[property].push(oldValue, newValue)
        }
      }
      else
        item[property] = newValue
      if(tag == "PMID")
      item['URL'] = `https://pubmed.ncbi.nlm.nih.gov/${newValue}`
      //Extract DOI No in a seperate tab
      if (tag == "AID" && newValue.includes("[doi]"))
        item["DOI"] = newValue.replace("[doi]", '').trimRight()

    }

    if (name === 'Sentence' && parsedData.tokens[index + 1] != undefined) {
      item[property] += `${image} `;
    }

    //If last source property was processed and there is no token add it
    if ((parsedData.tokens[index + 1] === undefined ||
      parsedData.tokens[index + 1].tokenType.name !== 'Sentence') &&
      property == "source"
    ) {

      pubmedArray.push(item);
      item = {};
      //property = '';
    }
  });

  return {
    total: pubmedArray.length,
    references: pubmedArray,
  };
};

/**
 * @function - Cleans the string, tokenizes and returns json
 * @param {string, buffer, URL} path
 * @returns {JSON}
 */

const parsePubMed = (data) => {

  const dataString = data.toString();

  const cleansed = dataString.replace(/['*{},"]/gm, '');

  const parsedData = SelectLexer.tokenize(cleansed);

  return transformToJSON(parsedData);
};

/**
 * @function - Transform JSON into Bibtex
 * @param {JSON}
 * @returns {string}
 */

const parseToRis = (data, property) => {
  let bibtex = '';
  const list = JSON.parse(data);
  try {
    list[property].forEach((item) => {
      Object.keys(item).forEach((key) => {
        switch (key) {
          case 'type':
            bibtex += `@${item[key]}`;
            break;
          case 'key':
            bibtex += `{${item[key]},\n`;
            break;
          default:
            bibtex += `${key} = ${item[key]},\n`;
        }
      });
      bibtex += '}\n';
    });

    return bibtex;
  } catch (_) {
    throw new Error('Check the object property is an array or is named correctly');
  }
};

module.exports = {
  parsePubMed,
  parseToRis,
};
