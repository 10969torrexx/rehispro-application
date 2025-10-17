from rapidfuzz import fuzz, process
from difflib import SequenceMatcher
import os
import re
from datetime import datetime
from logger_setup import setup_logger
logger = setup_logger(__name__, "python-backend/logs/death_parser.log")

default_keywords = [
  "Municipal Form No. 103",
  "(To be accomplished in quadruplicate using black ink)",
  "(Revised January 2007)",
  "Republic of the Philippines",
  "OFFICE OF THE CIVIL REGISTRAR GENERAL",
  "CERTIFICATE OF DEATH",
  "Province",
  "Registry No.",
  "City/Municipality",
  "NAME",
  "(First)",
  "(Middle)",
  "(Last)",
  "2. SEX (MalelFemale)",
  "3.DATE OF DEATH",
  "Month; Year)",
  "DATE OF BIRTH (Day)",
  "(Month)",
  "(Year)",
  "5.AGEAT THE TIME OF DEATH (Fill-in below accdg to age category)",
  "a. IF 1 YEAR OR ABOVE",
  "IF UNDER",
  "LELYEAR ORABQYE",
  "DEVNDER LYEAR",
  "UNDFR 24HRS",
  "b. APLASTIC ANEMIA",
  "Heallh Olficer"
  "OFFICER",
  "YEAR",
  "fUr",
  "Dal",
  "MURibto",
  "A.",
  "City Eivil Registrar",
  "6_",
  "G EUNDER 24 HRS",
  "(2] Compteted years",
  "[T]Monlhs",
  "[0] Days",
  "Hours",
  "Min Sec",
  "6 . PLACE OF DEATH",
  "(Name of Hospital/Clinic/Institution/House",
  "St , Barangay. CitylMunicipality. Province)",
  "7. CIVIL STATUS",
  "(Single/Married Widow)",
  "Widower Annulled Divorced)",
  "8.RELIGIONIRELIGIOUS SECT",
  "9.CITIZENSHIP",
  "10. RESIDENCE",
  "(House Noj.",
  "Barangay; CitylMunicipality, Province, Country)",
  "11. OCCUPATION",
  "12 NAME OFFATHER (First, Middle, Last)",
  "13.",
  "MAIDENNAMEOFMOTHER (First; Middle, Last)",
  "MEDICAL CERTIFICATE",
  "(For ages 0 to 7 days, accomplish items 14-19a at the back)",
  "19b. CAUSES OF DEATH (If the deceased is aged 8",
  "and over)",
  "Interval Between Onset and Death",
  "Immediate cause",
  "Antecedent cause",
  "Underlying cause",
  "II. Other significant conditions contributing to death:",
  "19c. MATERNAL CONDITION (If the deceased is female aged 15-49 years old)",
  "pregnant;",
  "b. pregnant, in",
  "less than 42 days after",
  "42 days to",
  "year after",
  "None of the",
  "not in labour",
  "abour",
  "delivery",
  "delivery",
  "choices",
  "19d. DEATH BY EXTERNAL CAUSES",
  "20. AUTOPSY",
  "(Yes",
  "No)",
  "Manner of death   (Homicide,",
  "Suicide,",
  "Accident;, Legal intervention,",
  "etc.",
  "Place of Occurrence of External Cause (e.g. home,",
  "farm, factory, street,",
  "sea",
  "etc_",
  "21a.ATTENDANT",
  "21b_",
  "If attended",
  "state duration (mmlddlyy)",
  "2 Public",
  "Private",
  "Health",
  "3 Hospital",
  "5  Others",
  "Physician",
  "Officer",
  "Authority",
  "None",
  "(Specify)",
  "From",
  "To",
  "22. CERTIFICATION OF DEATH",
  "hereby certify that the foregoing particulars are correct as near as same can be ascertained and",
  "further certify that |",
  "have attendedl",
  "have not attended the deceased and that death occurred at",
  "amlpm on the date of death specified above",
  "REVIEWED BY:",
  "Signature",
  "Name in Print_",
  "Title or Position",
  "Signature Over Printed Name of Health Officer",
  "Address",
  "Date",
  "Date",
  "23. CORPSE DISPOSAL",
  "24a. BURIALICREMATIONPERMIT",
  "24b. TRANSFERPERMIT",
  "(Burial, Cremation; if",
  "others",
  "specify)",
  "Number",
  "Number",
  "Date Issued",
  "Date Issued",
  "25. NAME AND ADDRESS OF CEMETERY OR CREMATORY",
  "26. CERTIFICATION OF INFORMANT",
  "27. PREPARED BY",
  "hereby certify that all information supplied are true and",
  "correct",
  "to my own knowledge",
  "belief.",
  "Signature",
  "Signature",
  "Name in Print",
  "Name in Print",
  "Relationship to the Deceased",
  "Title",
  "or Position",
  "Address",
  "Date",
  "Date",
  "28.RECEIVED BY",
  "29.REGISTERED BY THE CIVIL REGISTRAR",
  "Signature",
  "Signature",
  "Name in Print",
  "Name in Print",
  "Title or Position",
  "Title or Position",
  "Date",
  "Date",
  "REMARKSIANNOTATIONS (For LCROIOCRG Use Only)",
  "TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR",
  "10",
  "19a(a)/19b",
  "19a(c)",
  "(Day:",
  "No-.",
  "days",
  "and",
  "FOR CHILDREN AGED 0 TO 7 DAYS",
  "14.AGE OF MOTHER",
  "15. METHOD OF DELIVERY (Normal spontaneous[ 16. LENGTH OF PREGNANCY:",
  "vertex",
  "if others, specify)",
  "(in completed weeks)",
  "17. TYPE OF BIRTH",
  "18. IF MULTIPLE BIRTH, CHILD WAS",
  "(Single",
  "Twin, Triplet; etc)",
  "(First , Second, Third, etc)",
  "MEDICAL CERTIFICATE",
  "19a. CAUSES OF DEATH",
  "Main diseaselcondition of infant",
  "b. Other diseases/conditions of infant",
  "Main maternal diseaselcondition",
  "affecting infant",
  "d. Other maternal diseaselcondition",
  "affecting infant",
  "Other relevant circumstances",
  "CONTINUE TO FILL UP ITEM 20",
  "POSTMORTEM CERTIFICATE OF DEATH",
  "HEREBY CERTIFY that",
  "have performed an autopsy upon the",
  "of the deceased and that the cause of death was",
  "Signature",
  "TitlelDesignation",
  "Name in Print",
  "Address",
  "Date",
  "CERTIFICATION OF EMBALMER",
  "HEREBY CERTIFY that",
  "have embalmed",
  "following",
  "all the regulations prescribed by the Department of Health_",
  "Signature",
  "Title/Designation",
  "Name in Print",
  "License No",
  "Address",
  "Issued on",
  "Expiry Date",
  "AFFIDAVIT FOR DELAYED REGISTRATION OF DEATH",
  "of legal age, singlelmarriedldivorced/widowlwidower;",
  "with residence and postal address",
  "after being duly sworn in accordance with law; do hereby depose and say:",
  "1. That",
  "died on",
  "and was buriedlcremated in",
  "on",
  "2. That the deceased at the time of hislher death:",
  "was attended by",
  "was not attended.",
  "That the cause of death of the deceased was",
  "4. That the reason for the delay in registering this death was due to",
  "5, That",
  "am",
  "executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.",
  "In truth whereof;",
  "have affixed my signature   below this",
  "of",
  "Philippines",
  "(Signature Over Printed Name of Affiant)",
  "SUBSCRIBED AND SWORN",
  "to before",
  "me this",
  "day",
  "at",
  "Philippines_",
  "affiant who exhibited to me his Community Tax Cert:",
  "issued",
  "on",
  "at",
  "Signature of the Administering Officer",
  "Position",
  "Title",
  "Designation",
  "Name in Print",
  "Address",
  "body",
  "day"
]
template = {
  "province": "",
  "city": "",
  "registry_number": "",
  "first_name": "",
  "middle_name": "",
  "last_name": "",
  "sex": "",
  "date_of_death": "",
  "date_of_birth": "",
  "age_years": "",
  "age_months": "",
  "age_days": "",
  "age_hours": "",
  "age_minutes": "",
  "place_of_death": "",

  "civil_status": "",
  "religion": "",
  "citizenship": "",
  "residence_house": "",
  "residence_street": "",
  "residence_barangay": "",
  "residence_city": "",
  "residence_province": "",
  "residence_country": "",
  "occupation": "",

  "father_first_name": "",
  "father_middle_name": "",
  "father_last_name": "",
  "mother_first_name": "",
  "mother_middle_name": "",
  "mother_last_name": "",

  "aged_of_mother": "",
  "method_of_delivery": "",
  "length_of_pregnancy": "",
  "type_of_birth": "",
  "if_multiple_birth": "",

  "main_disease_condition_of_infant": "",
  "other_diseases_conditions_of_infant": "",
  "main_maternal_disease_condition_affecting_infant": "",
  "other_maternal_disease_condition_affecting_infant": "",
  "other_relevant_circumstances": "",

  "immediate_cause": "",
  "antecedent_cause": "",
  "underlying_cause": "",
  "interval_immediate": "",
  "interval_antecedent": "",
  "interval_underlying": "",
  "other_conditions": "",
  "maternal_condition": "",

  "manner_of_death": "",
  "autopsy": "",
  "place_occurrence": "",
  "attendant": "",
  "attendant_from": "",
  "attendant_to": "",

  "attended_deceased": "",
  "time_of_death": "",
  "physician_name": "",
  "physician_title": "",
  "physician_address": "",
  "health_officer_name": "",

  "disposal_type": "",
  "permit_number": "",
  "permit_date": "",
  "transfer_permit": "",
  "transfer_permit_date": "",
  "cemetery_name": "",
  "cemetery_address": "",

  "informant_name": "",
  "informant_relationship": "",
  "informant_address": "",
  "informant_date": "",
  "prepared_name": "",
  "prepared_title": "",
  "prepared_date": "",

  "received_name": "",
  "received_title": "",
  "received_date": "",
  "registrar_name": "",
  "registrar_title": "",
  "registrar_date": "",

  "remarks": "",
  "office_boxes": "",

  "postmortem_cause": "",
  "postmortem_name": "",
  "postmortem_title": "",
  "postmortem_address": "",
  "postmortem_date": "",
  "embalmer_name": "",
  "embalmer_title": "",
  "embalmer_address": "",
  "embalmer_license": "",
  "embalmer_issued_on": "",
  "embalmer_issued_at": "",
  "embalmer_expiry": "",

  "affiant_name": "",
  "affiant_civil_status": "",
  "address": "",
  "deceased_name": "",
  "death_date": "",
  "death_place": "",
  "attended_by": "",
  "not_attended": "",
  "cause_of_death": "",
  "reason_delay": "",

  "jurat_day": "",
  "jurat_month_year": "",
  "jurat_place": "",
  "ctc_number": "",
  "ctc_issued_on": "",
  "ctc_issued_at": "",
  "admin_name": "",
  "admin_position": "",
  "admin_address": ""
}

def remove_data_placeholders(source_list, reference_list, threshold=70):
  cleaned=[]
  junk_pattern = re.compile(r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,5}$")
  numbered_dot_pattern = re.compile(r"^\d+\.$")
  noisy_symbol_pattern = re.compile(r"[^\w\s.'-]")

  for src in source_list:
      s = src.strip()

      if " " in s:
          parts = s.split()
          first_word = parts[0].lower().rstrip(":")
          if "/" in first_word or first_word in reference_list:
              # only keep the part after the label
              old_value = s
              s = " ".join(parts[1:])
              logger.info(f"[DEBUG] Split merged OCR text: '{old_value}' → '{s}'")

      if "(" in s or ")" in s:
          continue

      if junk_pattern.match(s):
          continue

      if len(s) < 2 or re.fullmatch(r"[^A-Za-z0-9]+", s):
          continue

      if noisy_symbol_pattern.search(s):
          continue
      
      if numbered_dot_pattern.match(s):
          continue

      match = process.extractOne(s, reference_list, scorer=fuzz.token_set_ratio)
      if match:
          _, score, _ = match
          if score >= threshold:
              continue
      cleaned.append(s)

  return cleaned

def generate_template(template: dict, ocr_list: list):
  filled = template.copy()
  keys = list(filled.keys())

  numeric_keys = ["age_years", "age_months", "age_days", "age_hours", "age_minutes",]

  ocr_index = 0
  key_index = 0
  while key_index < len(keys) and ocr_index < len(ocr_list):
    key = keys[key_index]
    value = ocr_list[ocr_index].strip() if isinstance(ocr_list[ocr_index], str) else ocr_list[ocr_index]
    if key in numeric_keys:
      try:
        int(value)
        filled[key] = value
        key_index += 1
        ocr_index += 1
      except ValueError:
        filled[key] = ""
        key_index += 1
        ocr_index += 1
    else:
      filled[key] = value
      key_index += 1
      ocr_index += 1
  
  return filled

def deathParse(ocr_text):
  cleaned = remove_data_placeholders(ocr_text, default_keywords)
  logger.info("[remove_data_placeholders] %s", cleaned)
  response = generate_template(template, cleaned)
  logger.info("[parsed] %s", response)
  logger.info(ocr_text)
  
  return response