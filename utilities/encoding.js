
const bibTexTags = {
    "address":"address",
    "annote":"annotation",
    "author":"author",
    "booktitle":"book_title",
    "email":"author_email",
    "chapter":"chapter_number",
    "crossref":"cross_reference",
    "doi":"DOI",
    "edition":"book_edition",
    "editor":"editor",
    "howpublished":"publish_method",
    "institution":"institution",
    "journal":"journal_title",
    "key":"key",
    "month":"publication_month",
    "note":"notes",
    "number":"issue_no",
    "organization":"organization",
    "pages":"pages",
    "publisher":"publisher",
    "school":"school",
    "series":"series",
    "title":"title",
    "type":"type",
    "volume":"volume",
    "year":"publication_year",

}
const endNoteTags = {
    "%A": "author",
    "%B": "secondary_title",
    "%C": "publication_location",
    "%D": "publication_year",
    "%E": "editor",
    "%F": "label",
    "%G": "language",
    "%H": "translated_author",
    "%I": "publisher",
    "%J": "journal_title",
    "%K": "keyword",
    "%L": "call_number",
    "%M": "accession_no",
    "%N": "issue_no",
    "%O": "alternate_title",
    "%P": "pages",
    "%Q": "transliterated_title",
    "%R": "DOI",
    "%S": "tertiary_title",
    "%T": "title",
    "%U": "url",
    "%V": "volume",
    "%W": "source",
    "%X": "abstract",
    "%Y": "tertiary_author",
    "%Z": "general_note",
    "%0": "type",
    "%1": "custom1",
    "%2": "custom2",
    "%3": "custom3",
    "%4": "custom4",
    "%6": "volumes",
    "%7": "edition",
    "%8": "date",
    "%9": "type_of_work",
    "%?": "subsidary_author",
    "%@": "ISBN",
    "%!": "short_title",
    "%#": "custom5",
    "%$": "custom6",
    "%]": "custom7",
    "%&": "section",
    "%(": "original_publication",
    "%)": "reprint_edition",
    "%*": "reviewed_item",
    "%+": "author_address",
    "%^": "caption",
    "%>": "file_attachments",
    "%<": "research_notes",
    "%[": "access_date",
    "%=": "custom8",
    "%~": "database",
}
//Reference https://www.nlm.nih.gov/bsd/mms/medlineelements.html
const pubMedTags = {
    "AB": "abstract",
    "CI": "copyright_information",
    "AD": "affiliation",
    "IRAD": "investigator_affiliation",
    "AID": "article_identifier",
    "AU": "author",
    "AUID": "author_identifier",
    "FAU": "full_author",
    "BTI": "book_titke",
    "CTI": "collection_title",
    "COIS": "conflict_of_interest_statement",
    "CN": "coporate_author",
    "CRDT": "database_addition_date",
    "DCOM": "processing_complete_date",
    "DA": "processing_start_date",
    "LR": "last_revised",
    "DEP": "ePublication_date",
    "DP": "publication_year",
    "ED": "editor",
    "FED": "editor_full_name",
    "EN":"edition",
    "EDAT": "PubMed_addition_date",
    "GS": "gene_symbol",
    "GN": "general_note",
    "GR": "grant_no",
    "IR": "investigator_name",
    "FIR": "full_investigator_name",
    "ISBN": "ISBN",
    "IS": "ISSN",
    "IP": "issue_no",
    "TA": "journal_title_abbreviation",
    "JT": "journal_title",
    "LA": "language",
    "LID": "location_indentifier",
    "MID": "manuscript_identifier",
    "MHDA": "MeSH_date",
    "MH": "MeSH_terms",
    "JID": "NLM_unique_id",
    "RF": "numbner_of_references",
    "OAB": "other_abstract",
    "OCI": "other_copyright_info",
    "OT": "keyword",
    "OTO": "other_term_owner",
    "OWN": "owner",
    "PG": "pagination",
    "PS": "personal_name_as_subject",
    "FPS": "full_personal_name_as_subject",
    "PL": "publication_location",
    "PHST": "publication_history_status",
    "PST": "publication_status",
    "PT": "type",
    "PUBM": "publication_model",
    "PMCR": "publication_central_release",
    "PMID": "PMID",
    "RN": "registry_no",
    "NM": "substance_name",
    "SI": "secondary_source_id",
    "SO": "source",
    "SFM": "space_flight_mission",
    "STAT": "status",
    "SB": "subset",
    "TI": "title",
    "TT": "transliterated_title",
    "VI": "volume",
    "VTI": "volume_title",


}
//https://jira.sakaiproject.org/secure/attachment/21845/RIS+Format+Specifications.pdf
const risTags = {
    "A1": "primary_author",
    "A2": "secondary_author",
    "A3": "tertiary_author",
    "A4": "subsidiary_author",
    "AB": "abstract",
    "AD": "author_email",
    "AN": "accession_no",
    "AU": "author",
    "AV": "archive_location",
    "BT": "book_title",
    "C1": "custom1",
    "C2": "custom2",
    "C3": "custom3",
    "C4": "custom4",
    "C5": "custom5",
    "C6": "custom6",
    "C7": "custom7",
    "C8": "custom8",
    "CA": "caption",
    "CN": "call_umber",
    "CP": "CP",
    "CT": "unpublished_reference_title",
    "CY": "publication_location",
    "DA": "date",
    "DB": "database",
    "DO": "DOI",
    "DP": "database_provider",
    "ED": "editor",
    "EP": "end_page",
    "ET": "edition",
    "ID": "reference_ID",
    "IS": "issue_no",
    "J1": "journal_title_abbreviation",
    "J2": "alternate_title",
    "JA": "journal_title_abbreviation",
    "JF": "journal_title",
    "JO": "journal_title_abbreviation",
    "KW": "keyword",
    "L1": "pdf_link",
    "L2": "full_text_link",
    "L3": "related_record",
    "L4": "related_images",
    "LA": "language",
    "LB": "label",
    "LK": "web_link",
    "M1": "M1",
    "M2": "M2",
    "M3": "type_of_work",
    "N1": "notes",
    "N2": "abstract",
    "NV": "volumes",
    "OP": "original_publication",
    "PB": "publisher",
    "PP": "publication_location",
    "PY": "publication_year",
    "RI": "reviewed_item",
    "RN": "research_notes",
    "RP": "reprint_edition",
    "SE": "section",
    "SN": "ISBN_ISSN",
    "SP": "start_page",
    "ST": "short_title",
    "T1": "primary_title",
    "T2": "secondary_title",
    "T3": "tertiary_title",
    "TA": "translated_author",
    "TI": "title",
    "TT": "translated_title",
    "TY": "type",
    "U1": "U1",
    "U2": "U2",
    "U3": "U3",
    "U4": "U4",
    "U5": "U5",
    "UR": "url",
    "VL": "volume",
    "VO": "published_standard_number",
    "Y1": "primary_date",
    "Y2": "access_date",

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
 * @function - Returns RegEx pattern for keys generated from pre-defined RIS Tags
 * @param {void} void
 * @returns {RegExp} RegExp
 */
const getRISRegEx = () => {
    let regString = ""

    Object.keys(risTags).forEach((key) => {

        //Because 4 is max length of the field
        regString += ("(" + key + ").{2}-.*|")
    })
    return new RegExp(regString.replace(/[|]$/, ''))
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
    getRISRegEx,
    pubMedTags,
    risTags
};