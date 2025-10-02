const { writeLog } = require('../utils/logger');
const fs = require("fs");
function parsedData(extractedText) {
  let cleanText = extractedText
    .replace(/\s+/g, " ") 
    .replace(/\r?\n\s*/g, "\n")
    .replace(/OCCUPATON/gi, "OCCUPATION")
    .replace(/ClTY/gi, "CITY")
    .replace(/Marrlage/gi, "MARRIAGE")
    .trim();

  function extract(regex) {
    const match = cleanText.match(regex);
    return match ? match[1].trim() : null;
  }

  const result = {
    location: {
      province: extract(/Province\s+[_: ]+([A-Z\s]+)/i),
      city: extract(/City(?:Municipality)?\s*([A-Z\s]+)/i)
    },

    child: {
      first_name: extract(/NAME.*?\s([A-Z\s]+)/i),
      middle_name: extract(/NAME.*?\s[A-Z]+\s([A-Z]+)/i),
      last_name: extract(/NAME.*?\s[A-Z]+\s[A-Z]+\s([A-Z]+)/i),
      sex: extract(/SEX.*?(MALE|FEMALE)/i),
      date_of_birth: extract(/BRT.*?(\d{1,2} ?[A-Z]+ ?\d{4})/i),
      type_of_birth: extract(/TYPE OF BIRTH\s+([A-Z]+)/i),
      multiple_birth_order: extract(/MULTIPLE BIRTH.*?([0-9]+)/i),
      birth_order: extract(/BIRTH ORDER.*?([A-Z0-9]+)/i),
      weight: extract(/WEIGHT.*?([0-9]+ ?grams?)/i)
    },

    mother: {
      maiden_first: extract(/MAIDEN.*?\s([A-Z\s]+)/i),
      maiden_middle: extract(/MAIDEN.*?\s[A-Z]+\s([A-Z]+)/i),
      maiden_last: extract(/MAIDEN.*?\s[A-Z]+\s[A-Z]+\s([A-Z]+)/i),
      citizenship: extract(/CITIZENSHIP\s+([A-Z]+)/i),
      religion: extract(/RELIGION.*?\s+([A-Z ]+)/i),
      occupation: extract(/OCCUPATION\s+([A-Z ]+)/i),
      age_at_birth: extract(/AGE at the time.*?([0-9]+)/i),
      children: {
        born_alive: extract(/CHILDREN BORN ALIVE.*?([0-9]+)/i),
        still_living: extract(/STILL LIVING.*?([0-9]+)/i),
        deceased: extract(/DECEASED.*?([0-9]+)/i)
      },
      residence: {
        house: extract(/HOUSE NO\.?\s*([A-Z0-9 ]+)/i),
        city: extract(/CITY.*?:\s*([A-Z ]+)/i),
        province: extract(/PROVINCE.*?:\s*([A-Z ]+)/i),
        country: extract(/COUNTRY.*?:\s*([A-Z ]+)/i)
      }
    },

    father: {
      first: extract(/14\. NAME.*?\s([A-Z]+)/i),
      middle: extract(/14\. NAME.*?\s[A-Z]+\s([A-Z]+)/i),
      last: extract(/14\. NAME.*?\s[A-Z]+\s[A-Z]+\s([A-Z]+)/i),
      citizenship: extract(/15\. CITIZENSHIP\s+([A-Z]+)/i),
      religion: extract(/16\. RELIGION.*?\s+([A-Z]+)/i),
      occupation: extract(/17\. OCCUPATION\s+([A-Z ]+)/i),
      age_at_birth: extract(/18.*?AGE.*?([0-9]+)/i),
      residence: {
        street: extract(/STREET.*?:\s*([A-Z0-9 ]+)/i),
        city: extract(/CITY.*?:\s*([A-Z ]+)/i),
        province: extract(/PROVINCE.*?:\s*([A-Z ]+)/i),
        country: extract(/COUNTRY.*?:\s*([A-Z ]+)/i)
      }
    },

    marriage: {
      date: extract(/20a\. DATE.*?\|\s([A-Z0-9 ,]+)/i),
      city: extract(/20b\. PLACE.*?\|\s([A-Z ]+)/i),
      province: extract(/20b.*?\|\s[A-Z ]+ ([A-Z ]+)/i),
      country: extract(/COUNTRY.*?:\s*([A-Z ]+)/i)
    },

    attendant: {
      physician: /PHYSICIAN.*?(X|\d+)/i.test(cleanText) ? 1 : 0,
      nurse: /NURSE.*?(X|\d+)/i.test(cleanText) ? 1 : 0,
      midwife: /MIDWIFE.*?(X|\d+)/i.test(cleanText) ? 1 : 0,
      hilot: /HILOT.*?(X|\d+)/i.test(cleanText) ? 1 : 0,
      others: /OTHERS.*?(X|\d+)/i.test(cleanText) ? 1 : 0,
      others_specify: extract(/OTHERS:\s*([A-Z ]+)/i),
      date_of_attendance: extract(/DATE OF ATTENDANCE.*?([0-9A-Z ,]+)/i),
      name: extract(/ATTENDANT.*?\s([A-Z ]+)/i),
      title: extract(/TITLE.*?:\s*([A-Z ]+)/i),
      address: extract(/ADDRESS.*?:\s*([A-Z0-9 ,]+)/i),
      date_signed: extract(/DATE SIGNED.*?([0-9A-Z ,]+)/i),
      signature: extract(/SIGNATURE.*?\s([A-Z ]+)/i)
    },

    informant: {
      name: extract(/INFORMANT.*?\s([A-Z ]+)/i),
      relationship: extract(/RELATIONSHIP.*?\s([A-Z ]+)/i),
      address: extract(/ADDRESS.*?\s([A-Z0-9 ,]+)/i),
      date: extract(/DATE.*?([0-9A-Z ,]+)/i)
    },

    prepared_by: {
      name: extract(/PREPARED BY.*?\s([A-Z ]+)/i),
      title: extract(/TITLE.*?:\s*([A-Z ]+)/i),
      date: extract(/DATE.*?([0-9A-Z ,]+)/i)
    },

    received_by: {
      name: extract(/RECEIVED BY.*?\s([A-Z ]+)/i),
      title: extract(/TITLE.*?:\s*([A-Z ]+)/i),
      date: extract(/DATE.*?([0-9A-Z ,]+)/i)
    },

    registrar: {
      signature: extract(/SIGNATURE.*?\s([A-Z ]+)/i),
      name: extract(/CIVIL REGISTRAR.*?\s([A-Z ]+)/i),
      title: extract(/TITLE.*?:\s*([A-Z ]+)/i),
      date: extract(/DATE.*?([0-9A-Z ,]+)/i)
    },

    remarks: extract(/REMARKS.*?\s([A-Z ]+)/i),
    office_boxes: extract(/OFFICE.*?\s([A-Z ]+)/i),

    affidavit: {
      affiant_name: extract(/I!\s([A-Z\s]+)\s,/i),
      child_name: extract(/birth of ([A-Z\s]+) who/i),
      child_dob: extract(/on:\s([A-Z0-9 ,]+)/i),
      child_pob: extract(/at:\s([A-Z0-9 ,]+)/i),
      reason_delay: extract(/reason for the delay.*?\n([A-Z ]+)/i),
      signature: extract(/\n([A-Z ]+)\n\(Signature/i)
    },

    jurat: {
      day: extract(/Day.*?([0-9]+)/i),
      month_year: extract(/Month.*?([A-Z0-9 ]+)/i),
      place: extract(/Place.*?([A-Z ]+)/i),
      ctc_number: extract(/CTC NO\.?\s*([0-9]+)/i),
      issued_on: extract(/ISSUED ON\s*([0-9A-Z ,]+)/i),
      issued_at: extract(/ISSUED AT\s*([A-Z ]+)/i),
      admin_officer: {
        signature: extract(/OFFICER SIGNATURE.*?\s([A-Z ]+)/i),
        name: extract(/OFFICER NAME.*?\s([A-Z ]+)/i),
        position: extract(/POSITION.*?\s([A-Z ]+)/i),
        address: extract(/ADDRESS.*?\s([A-Z0-9 ,]+)/i)
      }
    }
  };

  //! Remove if the need to generate a json file is needed.
  // const jsonOutput = JSON.stringify(result, null, 2);
  // fs.writeFileSync("parsed_document.json", jsonOutput, "utf-8");
  return result;
}

module.exports = { parsedData };