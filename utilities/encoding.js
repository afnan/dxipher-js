
// const endNoteTags = {
//     "%A":"author",
//     "%B":"secondaryTitle",
//     "%C":"pubPlace",
//     "%D":"publicationYear",
//     "%E":"editor",
//     "%F":"label",
//     "%G":"lang",
//     "%H":"translatedAuthor",
//     "%I":"publisher",
//     "%J":"journalTitle",
//     "%K":"keyword",
//     "%L":"callNumber",
//     "%M":"accessionNo",
//     "%N":"issueNo",
//     "%O":"alternateTitle",
//     "%P":"pages",
//     "%Q":"transliteratedTitle",
//     "%R":"DOI",
//     "%S":"tertiaryTitle",
//     "%T":"title",
//     "%U":"URL",
//     "%V":"volume",
//     "%W":"source",
//     "%X":"abstract",
//     "%Y":"tertiaryAuthor",
//     "%Z":"generalNote",
//     "%0":"type",
//     "%1":"custom1",
//     "%2":"custom2",
//     "%3":"custom3",
//     "%4":"custom4",
//     "%6":"volumes",
//     "%7":"edition",
//     "%8":"date",
//     "%9":"typeOfWork",
//     "%?":"subsidaryAuthor",
//     "%@":"ISBN",
//     "%!":"shortTitle",
//     "%#":"custom5",
//     "%$":"custom6",
//     "%]":"custom7",
//     "%&":"section",
//     "%(":"originalPublication",
//     "%)":"rePrintEdition",
//     "%*":"reviewedItem",
//     "%+":"authorAddress",
//     "%^":"caption",
//     "%>":"fileAttachments",
//     "%<":"researchNotes",
//     "%[":"accessDate",
//     "%=":"custom8",
//     "%~":"database",
// }
//Reference https://www.nlm.nih.gov/bsd/mms/medlineelements.html
const pubMedTags = {
    "AB": "abstract",
    "CI": "copyrightInformation",
    "AD": "affiliation",
    "IRAD": "investigatorAffiliation",
    "AID": "articleIdentifier",
    "AU": "author",
    "AUID": "authorIdentifier",
    "FAU": "fullAuthor",
    "BTI": "bookTitke",
    "CTI": "collectionTitle",
    "COIS": "conflictOfInterestStatement",
    "CN": "coporateAuthor",
    "CRDT": "createDate",
    "DCOM": "dateCompleted",
    "DA": "dateCreated",
    "LR": "dateLastRevised",
    "DEP": "ePubDate",
    "DP": "publicationYear",
    "ED": "editor",
    "FED": "fullEditor",
    "EDAT": "entrezDate",
    "GS": "geneSymbol",
    "GN": "generalNote",
    "GR": "grantNo",
    "IR": "investigatorName",
    "FIR": "fullInvestigatorName",
    "ISBN": "ISBN",
    "IS": "ISSN",
    "IP": "issue",
    "TA": "journalTitleAbr",
    "JT": "journalTitle",
    "LA": "lang",
    "LID": "licationIndentifier",
    "MID": "manuscriptIdentifier",
    "MHDA": "meshDate",
    "MH": "meshTerms",
    "JID": "nlmId",
    "RF": "referenceCount",
    "OAB": "otherAbstract",
    "OCI": "otherCopyrightInfo",
    "OT": "keyword",
    "OTO": "otherTermOwner",
    "OWN": "owner",
    "PG": "pagination",
    "PS": "personalNameSubj",
    "FPS": "fullPersonalNameSubj",
    "PL": "pubPlace",
    "PHST": "pubHistStatus",
    "PST": "pubStatus",
    "PT": "publicationType",
    "PUBM": "pubModel",
    "PMCR": "pubCentralRelease",
    "PMID": "pubMedUniqueID",
    "RN": "registryNo",
    "NM": "substanceName",
    "SI": "secondarySourceId",
    "SO": "source",
    "SFM": "spaceFlightMission",
    "STAT": "status",
    "SB": "subset",
    "TI": "title",
    "TT": "transliteratedTitle",
    "VI": "volume",
    "VTI": "volumeTitke",


}

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
    "TI": "title",
    "PY": "publicationYear",
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
/**
 * @function - Returns RegEx pattern for keys generated from pre-defined PubMed Tags
 * @param {void} void
 * @returns {RegExp} RegExp
 */
const getPubMedRegEx = () => {
    let regString = ""

    Object.keys(pubMedTags).forEach((key) => {

        //Because 4 is max length of the field
        regString += ("(" + key + ").{" + (4 - key.length) + "}-.*|")
    })
    return new RegExp(regString.replace(/[|]$/, ''))
}

/**
 * @function - Converts MEDLINE/PubMed data elements to descriptive keys for JSON. The common keys will be extracted from all other formats as well
 * @param {string} tag
 * @returns {string} descriptiveTag
 */
const pubMedToJsonTag = (tag) => {
    return (tag in pubMedTags) ? pubMedTags[tag] : tag

}
const risToJsonTag = (tag) => {
    return (tag in risTags) ? risTags[tag] : tag
}
module.exports = {
    risToJsonTag,
    pubMedToJsonTag,
    getPubMedRegEx,
    pubMedTags
};