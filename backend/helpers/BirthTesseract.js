const { writeLog } = require('../utils/logger');

function parsedData(extractedText) {
  let cleanText = extractedText
    .replace(/\s+/g, ' ')
    .replace(/\r?\n\s*/g, '\n')
    .replace(/OCCUPATON/gi, "OCCUPATION")
    .replace(/ClTY/gi, "CITY")
    .replace(/Marrlage/gi, "MARRIAGE")
    .trim();

  function extract(regex) {
    const match = cleanText.match(regex);
    return match ? match[1].trim() : null;
  }

  const result = {};

  result.province = extract(/Province\s+[_: ]+([A-Z\s]+)/i);
  result.city = extract(/City(?:Municipality)?\s*([A-Z\s]+)/i);
  result.child_first_name = extract(/NAME.*?\s([A-Z\s]+)/i);
  result.child_middle_name = extract(/NAME.*?\s[A-Z]+\s([A-Z]+)\s/i);
  result.child_last_name = extract(/NAME.*?\s[A-Z]+\s[A-Z]+\s([A-Z]+)/i);
  result.sex = extract(/SEX.*?(MALE|FEMALE)/i);
  result.date_of_birth = extract(/BRT.*?(\d{1,2} ?[A-Z]+ ?\d{4})/i);
  result.type_of_birth = extract(/TYPE OF BIRTH\s+([A-Z]+)/i);
  result.multiple_birth_order = extract(/MULTIPLE BIRTH.*?([0-9]+)/i);
  result.birth_order = extract(/BIRTH ORDER.*?([A-Z0-9]+)/i);
  result.birth_weight = extract(/WEIGHT.*?([0-9]+ ?grams?)/i);

  result.maiden_first_name = extract(/MAIDEN.*?\s([A-Z\s]+)/i);
  result.maiden_middle_name = extract(/MAIDEN.*?\s[A-Z]+\s([A-Z]+)/i);
  result.maiden_last_name = extract(/MAIDEN.*?\s[A-Z]+\s[A-Z]+\s([A-Z]+)/i);
  result.citizenship = extract(/CITIZENSHIP\s+([A-Z]+)/i);
  result.religion = extract(/RELIGION.*?\s+([A-Z ]+)/i);
  result.children_born_alive = extract(/CHILDREN BORN ALIVE.*?([0-9]+)/i);
  result.children_still_living = extract(/STILL LIVING.*?([0-9]+)/i);
  result.children_deceased = extract(/DECEASED.*?([0-9]+)/i);
  result.occupation = extract(/OCCUPATION\s+([A-Z ]+)/i);
  result.age_at_birth = extract(/AGE at the time.*?([0-9]+)/i);
  result.residence_house = extract(/HOUSE NO\.?\s*([A-Z0-9 ]+)/i);
  result.residence_city = extract(/CITY.*?:\s*([A-Z ]+)/i);
  result.residence_province = extract(/PROVINCE.*?:\s*([A-Z ]+)/i);
  result.residence_country = extract(/COUNTRY.*?:\s*([A-Z ]+)/i);

  result.father_first_name = extract(/14\. NAME.*?\s([A-Z]+)/i);
  result.father_middle_name = extract(/14\. NAME.*?\s[A-Z]+\s([A-Z]+)/i);
  result.father_last_name = extract(/14\. NAME.*?\s[A-Z]+\s[A-Z]+\s([A-Z]+)/i);
  result.father_citizenship = extract(/15\. CITIZENSHIP\s+([A-Z]+)/i);
  result.father_religion = extract(/16\. RELIGION.*?\s+([A-Z]+)/i);
  result.father_occupation = extract(/17\. OCCUPATION\s+([A-Z ]+)/i);
  result.father_age_at_birth = extract(/18.*?AGE.*?([0-9]+)/i);
  result.father_residence_street = extract(/STREET.*?:\s*([A-Z0-9 ]+)/i);
  result.father_residence_city = extract(/CITY.*?:\s*([A-Z ]+)/i);
  result.father_residence_province = extract(/PROVINCE.*?:\s*([A-Z ]+)/i);
  result.father_residence_country = extract(/COUNTRY.*?:\s*([A-Z ]+)/i);

  result.date_of_marriage = extract(/20a\. DATE.*?\|\s([A-Z0-9 ,]+)/i);
  result.marriage_city = extract(/20b\. PLACE.*?\|\s([A-Z ]+)/i);
  result.marriage_province = extract(/20b.*?\|\s[A-Z ]+ ([A-Z ]+)/i);
  result.marriage_country = extract(/COUNTRY.*?:\s*([A-Z ]+)/i);

  result.attendant_physician = /PHYSICIAN.*?(X|\d+)/i.test(cleanText) ? 1 : 0;
  result.attendant_nurse = /NURSE.*?(X|\d+)/i.test(cleanText) ? 1 : 0;
  result.attendant_midwife = /MIDWIFE.*?(X|\d+)/i.test(cleanText) ? 1 : 0;
  result.attendant_hilot = /HILOT.*?(X|\d+)/i.test(cleanText) ? 1 : 0;
  result.attendant_others = /OTHERS.*?(X|\d+)/i.test(cleanText) ? 1 : 0;
  result.attendant_others_specify = extract(/OTHERS:\s*([A-Z ]+)/i);
  result.date_of_attendance = extract(/DATE OF ATTENDANCE.*?([0-9A-Z ,]+)/i);
  result.attendant_name_title = extract(/ATTENDANT.*?\s([A-Z ]+)/i);

  result.birth_time = extract(/TIME OF BIRTH.*?([0-9: ]+[APM]+)/i);
  result.birth_date = extract(/DATE OF BIRTH.*?([0-9A-Z ,]+)/i);
  result.attendant_name = extract(/ATTENDANT.*?\s([A-Z ]+)/i);
  result.attendant_title = extract(/TITLE.*?:\s*([A-Z ]+)/i);
  result.attendant_address = extract(/ADDRESS.*?:\s*([A-Z0-9 ,]+)/i);
  result.attendant_date_signed = extract(/DATE SIGNED.*?([0-9A-Z ,]+)/i);
  result.attendant_signature = extract(/SIGNATURE.*?\s([A-Z ]+)/i);

  result.informant_name = extract(/INFORMANT.*?\s([A-Z ]+)/i);
  result.informant_relationship = extract(/RELATIONSHIP.*?\s([A-Z ]+)/i);
  result.informant_address = extract(/ADDRESS.*?\s([A-Z0-9 ,]+)/i);
  result.informant_date = extract(/DATE.*?([0-9A-Z ,]+)/i);
  result.prepared_name = extract(/PREPARED BY.*?\s([A-Z ]+)/i);
  result.prepared_title = extract(/TITLE.*?:\s*([A-Z ]+)/i);
  result.prepared_date = extract(/DATE.*?([0-9A-Z ,]+)/i);

  result.received_name = extract(/RECEIVED BY.*?\s([A-Z ]+)/i);
  result.received_title = extract(/TITLE.*?:\s*([A-Z ]+)/i);
  result.received_date = extract(/DATE.*?([0-9A-Z ,]+)/i);
  result.registrar_signature = extract(/SIGNATURE.*?\s([A-Z ]+)/i);
  result.registrar_name = extract(/CIVIL REGISTRAR.*?\s([A-Z ]+)/i);
  result.registrar_title = extract(/TITLE.*?:\s*([A-Z ]+)/i);
  result.registrar_date = extract(/DATE.*?([0-9A-Z ,]+)/i);

  result.remarks = extract(/REMARKS.*?\s([A-Z ]+)/i);
  result.office_boxes = extract(/OFFICE.*?\s([A-Z ]+)/i);

  result.affiant_name = extract(/I!\s([A-Z\s]+)\s,/i);
  result.child_name_affidavit = extract(/birth of ([A-Z\s]+) who/i);
  result.child_dob = extract(/on:\s([A-Z0-9 ,]+)/i);
  result.child_pob = extract(/at:\s([A-Z0-9 ,]+)/i);
  result.reason_delay = extract(/reason for the delay.*?\n([A-Z ]+)/i);
  result.affiant_signature = extract(/\n([A-Z ]+)\n\(Signature/i);

  result.final_jurat_day = extract(/Day.*?([0-9]+)/i);
  result.final_jurat_month_year = extract(/Month.*?([A-Z0-9 ]+)/i);
  result.final_jurat_place = extract(/Place.*?([A-Z ]+)/i);
  result.final_ctc_number = extract(/CTC NO\.?\s*([0-9]+)/i);
  result.final_ctc_issued_on = extract(/ISSUED ON\s*([0-9A-Z ,]+)/i);
  result.final_ctc_issued_at = extract(/ISSUED AT\s*([A-Z ]+)/i);
  result.admin_officer_signature = extract(/OFFICER SIGNATURE.*?\s([A-Z ]+)/i);
  result.admin_officer_name = extract(/OFFICER NAME.*?\s([A-Z ]+)/i);
  result.admin_officer_position = extract(/POSITION.*?\s([A-Z ]+)/i);
  result.admin_officer_address = extract(/ADDRESS.*?\s([A-Z0-9 ,]+)/i);

  return result;
}


module.exports = { parsedData };