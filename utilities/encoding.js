
const risTags = {
    "TY": "type",
    "AU": "author",
    "AB": "abstract",
    "DA": "date",
    "DB": "database",
    "DO": "doi",
    "ID": "refId",
    "L1": "pdfLink",
    "L2": "fullTextLink",
    "SN": "ISSN",
    "UR": "URL",
    "TI":"title",
    "PY":"publicationYear",
}
const risType = {
    "ABST": "Abstract",
    "CHAP": "Chapter",
    "BOOK": "Whole Book",
    "CPAPER": "Conference Paper",
    "EBOOK": "Electronic Book",
    "ECHAP": "Electronic Book Section",
    "ELEC": "Web Page",
    "THES": "Thesis/Dissertation",
    "JOUR": "Journal Article",
    "MANSCPT": "Manuscript",
    "CONF": "Conference Proceeding",

}
const risToJsonTag = (tag) => {
    return (tag in risTags) ? risTags[tag] : tag

}
module.exports = {
    risToJsonTag,
};