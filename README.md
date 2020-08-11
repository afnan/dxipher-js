<p align="center">
  <br>
  <a href="" rel="noopener">
 <!-- <img width=267px height=80px src="https://i.paste.pics/9SE21.png?trs=daf76ab645e16f1381c8134edd5739b86e8938f0c59543f25bcde9034d202da3" alt="Project logo"></a> -->
</p>

<h3 align="center">@afnan.bashir/dxipher-js</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-development-important.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/devisle/reference-js)](https://github.com/devisle/reference-js/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/devisle/reference-js)](https://github.com/devisle/reference-js/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> For all the popular Reference Manager formats
    <br>
</p>

## 📝 Table of Contents

- [Quick Start](#quick)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Todo](TODO.md)
- [Contributing](CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## ⌛️ Quick Start <a name = "quick"></a>

See it on [npm](https://www.npmjs.com/package/@afnan.bashir/dxipher-js)

```
npm i @afnan.bashir/dxipher-js
```

Use like below

```js
const { bibtexToJSON } = require("@afnan.bashir/dxipher-js");

//Read your .bib and pass the content
bibtexToJSON(content);
```

See the documentation [here](https://devisle.netlify.com/)

## 🧐 About <a name = "about"></a>

Reference JS is a collection of parsing functions for Node that allow you to import, export and convert between BibTeX, EndNote, XML, JSON files and more.

Reference Managers are software tools used to organise research work. We aim to tackle the vast Reference Manager format types that exist i.e. bibtex, f1000, XML.

By parsing all formats into JSON, we alleviate the need to for JSON based storage and point-to-point conversion i.e. Bibtex to JSON to XML.

The project was forked from [devisle](https://github.com/devisle/reference-js) and has been extended to support other file formats.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will set reference-js up and running on your local machine for development and deployment purposes. See [Usage](#usage) for notes on how to use the API.

### Prerequisites

You will need NodeJS and NPM. Not sure if you have node or npm? use in your terminal:

```
node -v
```

### Installing

Install the package with

```
npm install @afnan.bashir/dxipher-js
```

## 🔧 Contributors

See the [To do](TODO.md) for required features to work on.

Further information on how to contribute [Here](CONTRIBUTING.md).

## 🎈 Usage <a name="usage"></a>

Formats from Reference managers can be converted into JSON and back. Using this approach, you are able to leverage the library to convert between other formats e.g. Bibtex to JSON to RIS behind the scenes.


## 🚀 Deployment <a name = "deployment"></a>

We recommend storing your references in JSON format as it is highly compatible with NoSQL databases and Web Applications.

## ⛏️ Built Using <a name = "built_using"></a>

- [Chevrotain](https://sap.github.io/chevrotain/docs/) - Parser toolkit
- [regex101](https://regex101.com/) - Regex Tester
- [Jest](https://jestjs.io/) - Testing Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@afnan](https://github.com/afnan) - Forked and Extension

Original Authors:

- [@natedeploys](https://github.com/Natedeploys) - Idea & Initial work
- [@endormi](https://github.com/endormi) - Contributor
- [@shreyas1307](https://github.com/shreyas1307) - Contributor


## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- I am grateful to  Dev Isle for uploading nicely designed project on which I was able to extend
