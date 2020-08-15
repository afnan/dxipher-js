const chevrotain = require('chevrotain');
const { risToJsonTag, getRISRegEx, risTags } = require('../utilities/encoding');
const { createToken } = chevrotain;

const typeProperty = createToken({
  name: 'Type',
  pattern: /TY.*/i,
});
const endReferenceProperty = createToken({
  name: 'End',
  pattern: /ER.{2}-.*/i,
});

const generalProperty = createToken({
  name: 'Field',
  pattern: getRISRegEx(),
});

const sentenceProperty = createToken({
  name: 'Sentence',
  pattern: /[a-zA-Z0-9-.]+/i,
  line_breaks: true
});

const SelectLexer = new chevrotain.Lexer(
  [endReferenceProperty, generalProperty, sentenceProperty],
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
  const risArray = [];
  let property = '';
  let item = {};

  parsedData.tokens.forEach(({ image, tokenType: { name } }, index) => {

    if (name === 'Field') {
      // console.log("Field = " + image)
      //Split  by hyphenonly in the begining
      // const str = image.split(/^.{4}[-]/gm);
      //console.log("SPLIT",str)
      //property = str[0].replace(/[ \t]+$/, '');
      /**Option-1 use Regex but text can have hyphens so split the remaining after initial extraction */
      /**Option-2
       * Using Substring as the text can have hyphens
       * indexOf will always point to the first occurance of the hyphen*/
      const tag = image.substring(0, image.indexOf('-') - 1).replace(/\s/, '')//Remove Spaces 

      //Match if the tags are within the permisible tag list. This will avoid false positives
      let newValue = ''
      if (!(tag in risTags)) {
        //If the tag was not found, it means it is a continuation of the previous property
        newValue = image.replace(/^\s+/, '')
      }
      else {
        //The property name is a valid one. 
        property = property = risToJsonTag(tag)
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



    }
    if (name === 'Sentence') {
      item[property] += `${image} `;

    }
    //If last source property was processed and there is no token add it
    // if (
    //   (parsedData.tokens[index + 1] !== undefined &&
    //     parsedData.tokens[index + 1].tokenType.name !== 'Sentence' &&
    //     parsedData.tokens[index + 1].image.includes("ER")) ||
    //   (parsedData.tokens[index + 1] === undefined)) {
    if (name == "End") {
      risArray.push(item);
      item = {};
      //property = '';
    }
  });

  return {
    total: risArray.length,
    references: risArray,
  };
};

/**
 * @function - Cleans the string, tokenizes and returns json
 * @param {string, buffer, URL} path
 * @returns {JSON}
 */

const parseRis = (data) => {

  const dataString = data.toString();
  //console.log("Raw", dataString)

  // const typeLine = noComments.replace(
  //   /ARTICLE|\b@BOOK\b|INCOLLECTION|PHDTHESIS|TECHREPORT|MISC|INPROCEEDINGS/gim,
  //   '$&\n',
  // );
  const cleansed = dataString.replace(/['*{},"]/gm, '');

  const parsedData = SelectLexer.tokenize(cleansed);
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
  parseRis,
  parseToRis,
};
