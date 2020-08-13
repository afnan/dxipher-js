//https://pubmed.ncbi.nlm.nih.gov/PUBMEDID
const chevrotain = require('chevrotain');
const { pubMedToJsonTag, getPubMedRegEx } = require('../utilities/encoding');
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
console.log(getPubMedRegEx())
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

      const tag = image.substring(0, image.indexOf('-'))
      property = tag.replace(/\s+/, '')//Remove Spaces      
      property = pubMedToJsonTag(property)
      let newValue = image.substring(image.indexOf('-') + 1, image.length).replace(/^\s+/, '')
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



      //If the last property is being processed and there is no sentence remaining to current tag - add it
      // if (property == "source" &&
      //   parsedData.tokens[index + 1] != undefined &&
      //   parsedData.tokens[index + 1].tokenType.name !== 'Sentence') {
      //   // console.log("HERE", parsedData.tokens[index + 1])

      //   pubmedArray.push(item);
      //   item = {};
      //   property = '';
      // }
    }

    if (name === 'Sentence' && parsedData.tokens[index + 1] != undefined) {
      //console.log(image)

      // If there is no sentence remaining to the last tag, add it. If there is keep adding
      // if (
      //   parsedData.tokens[index + 1].tokenType.name !== 'Sentence') {
      //  item[property] += image;
      //   // pubmedArray.push(item);
      //   // item = {};
      //   // property = '';
      // } else {
      item[property] += `${image} `;
      // } //console.log(item[property])
    }

    //If last source property was processed and there is no token add it
    if ((parsedData.tokens[index + 1] === undefined ||
      parsedData.tokens[index + 1].tokenType.name !== 'Sentence') &&
      property == "source"
    ) {
      // if (property == "source" && parsedData.tokens[index + 1] === undefined) {
      // console.log("HERE", parsedData.tokens[index + 1])

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
  //console.log("Raw", dataString)

  // const typeLine = noComments.replace(
  //   /ARTICLE|\b@BOOK\b|INCOLLECTION|PHDTHESIS|TECHREPORT|MISC|INPROCEEDINGS/gim,
  //   '$&\n',
  // );
  const cleansed = dataString.replace(/['*{},"]/gm, '');


  let asciiData = punycode.toASCII(cleansed)
  let convertedData = punycode.toUnicode(asciiData)

  const parsedData = SelectLexer.tokenize((convertedData));
  // const parsedData = SelectLexer.tokenize();
  //console.log(parsedData.tokens)
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