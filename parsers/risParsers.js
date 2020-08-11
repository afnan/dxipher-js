const chevrotain = require('chevrotain');
const { risToJsonTag } = require('../utilities/encoding');
const { createToken } = chevrotain;

const typeProperty = createToken({
  name: 'Type',
  pattern: /TY.*/i,
});

const generalProperty = createToken({
  name: 'Field',
  pattern: /AU.*|TI.*|AB.*|PY.*|DO.*|UR.*|L1.*|DA.*/i,
});

const sentenceProperty = createToken({
  name: 'Sentence',
  pattern: /[a-zA-Z0-9-.]+/i,
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
  const risArray = [];
  let property = '';
  let item = {};

  parsedData.tokens.forEach(({ image, tokenType: { name } }, index) => {

    if (name === 'Type') {
      const str = image.split(/[-]/i)
      property = str[0].replace()
      item.type = str[1].replace(/^\s+/, '')
      //console.log("Type = "+ name)
    }

    if (name === 'Field') {
      //console.log("Field = " + image)
      console.log("Field = " + image)
      //Split  by hyphenonly in the begining
      // const str = image.split(/^.{4}[-]/gm);
      //console.log("SPLIT",str)
      //property = str[0].replace(/[ \t]+$/, '');
      /**Option-1 use Regex but text can have hyphens so split the remaining after initial extraction */
      /**Option-2
       * Using Substring as the text can have hyphens
       * indexOf will always point to the first occurance of the hyphen*/
      const tag = image.substring(0, image.indexOf('-') - 1)
      property = tag.replace(/\s/, '')//Remove Spaces      
      
      property = risToJsonTag(property)
      const str = image.substring(image.indexOf('-')+1, image.length-1).replace(/^\s/,'')

      item[property] =str;
      // item[property] = str[1].replace(/^\s+/, '');
      if (
        parsedData.tokens[index + 1] === undefined
        || parsedData.tokens[index + 1].image == "ER"
      ) {

        risArray.push(item);
        item = {};
        property = '';
      }
    }

    // if (name === 'Sentence') {

    //   console.log("sentence = " + image)
    //      if (parsedData.tokens[index + 1].tokenType.name !== 'Sentence') {
    //        item[property] += image;
    //      } else {
    //        item[property] += `${image} `;
    //      }
    // }
  });

  return {
    total: risArray.length + 1,
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
