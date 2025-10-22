from rapidfuzz import fuzz, process
from difflib import SequenceMatcher
import os
import re
from datetime import datetime
from logger_setup import setup_logger
logger = setup_logger(__name__, "python-backend/logs/marriage_parser.log")

default_keywords = [
  "AFFIDAVIT OF ACKNOWLEDGMENTIADMISSION OF PATERNITY",
  "(For births before 3 August 1988)",
  "(For births on or after 3 August 1988)",
  "IWe,",
  "and",
  "of legal age, amlare the natural mother andlor father of",
  "who",
  "was",
  "born",
  "on",
  "am",
  "We are",
  "executing this affidavit to attest to the truthfulness of the foregoing statements and for purposes of|",
  "acknowledging mylour child.",
  "(Signature Over Printed Name of Father)",
  "(Signature Over Printed Name of Mother)",
  "SUBSCRIBED AND SWORN",
  "to before me this",
  "day of",
  "by",
  "and",
  "who exhibited to me (his/her)",
  "Community",
  "Tax",
  "Cert: No",
  "issued",
  "on",
  "at",
  "Signature of the Administering Officer",
  "Position",
  "Title",
  "Designation",
  "Name in Print",
  "Address",
  "AFFIDAVIT FOR DELAYED REGISTRATION OF BIRTH",
  "(To be accomplished by the hospitallclinic administrator; father, mother; or guardian or the person himself if 18 years old or over:)",
  "of legal age, singlelmarried/divorcedlwidowlwidower; with",
  "residence and postal address",
  "after",
  "been",
  "sworn in accordance with law;",
  "do hereby  depose and say:",
  "That",
  "am the applicant for the delayed registration of:",
  "my birth in",
  "on",
  "the birth of",
  "who was born in",
  "on",
  "That Ilhelshe was attended at birth by",
  "who resides at",
  "That",
  "amlhelshe",
  "is a citizen of",
  "That mylhis/her parents were",
  "married on",
  "not married but Ilhelshe was acknowledgedlnot acknowledged by mylhislher",
  "father whose",
  "name is",
  "5. That the reason for the delay in registering mylhislher birth was",
  "(For the applicant only)",
  "That",
  "am married to",
  "(If the applicant is other than the document owner)",
  "That",
  "am the",
  "of the said person_",
  "That",
  "am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.",
  "In truth whereof,",
  "have affixed my signature below this",
  "of",
  "at",
  "Philippines ",
  "(Signature Over Printed Name of Affiant)",
  "SUBSCRIBED AND SWORN",
  "to before me this",
  "day of",
  "at",
  "Philippines, affiant who exhibited to me his Community Tax Cert",
  "issued on",
  "Signature of the Administering Officer",
  "Position",
  "Title / Designation",
  "Name in Print",
  "Address",
  "having",
  "duly",
  "day"
]
template = {
    # Page 1: Province, City, and Registry No.
    "province": "",
    "city": "",
    "registry_number": "",

    # Husband Information (Page 1)
    "husband_first_name": "",
    "husband_middle_name": "",
    "husband_last_name": "",
    "husband_birth_date": "",
    "husband_birth_city": "",
    "husband_birth_province": "",
    "husband_birth_country": "",
    "husband_age": "",

    # Wife Information (Page 1)
    "wife_first_name": "",
    "wife_middle_name": "",
    "wife_last_name": "",
    "wife_birth_date": "",
    "wife_birth_city": "",
    "wife_birth_province": "",
    "wife_birth_country": "",
    "wife_age": "",

    # Page 2: Husband Information
    "husband_sex": "",
    "husband_citizenship": "",
    "husband_residence_barangay": "",
    "husband_residence_city": "",
    "husband_residence_province": "",
    "husband_residence_country": "",
    "husband_religion": "",
    "husband_civil_status": "",
    "husband_father_name_first": "",
    "husband_father_name_middle": "",
    "husband_father_name_last": "",

    # Page 2: Wife Information
    "wife_sex": "",
    "wife_citizenship": "",
    "wife_residence_barangay": "",
    "wife_residence_city": "",
    "wife_residence_province": "",
    "wife_residence_country": "",
    "wife_religion": "",
    "wife_civil_status": "",
    "wife_father_name_first": "",
    "wife_father_name_middle": "",
    "wife_father_name_last": "",

    # Page 3: Husband Information
    "husband_father_citizenship": "",
    "husband_mother_name_first": "",
    "husband_mother_name_middle": "",
    "husband_mother_name_last": "",
    "husband_mother_citizenship": "",
    "husband_consent_name_first": "",
    "husband_consent_name_middle": "",
    "husband_consent_name_last": "",
    "husband_relationship": "",
    "husband_consent_person_barangay": "",
    "husband_consent_person_city": "",
    "husband_consent_person_province": "",
    "husband_consent_person_country": "",

    # Page 3: Wife Information
    "wife_father_citizenship": "",
    "wife_mother_name_first": "",
    "wife_mother_name_middle": "",
    "wife_mother_name_last": "",
    "wife_mother_citizenship": "",
    "wife_consent_name_first": "",
    "wife_consent_name_middle": "",
    "wife_consent_name_last": "",
    "wife_relationship": "",
    "wife_consent_person_barangay": "",
    "wife_consent_person_city": "",
    "wife_consent_person_province": "",
    "wife_consent_person_country": "",

    # Page 4: Marriage Details
    "place_of_marriage": "",
    "date_of_marriage": "",
    "time_of_marriage": "",
    "cert_husband_name": "",
    "cert_wife_name": "",
    "marriage_settlement": "",
    "cert_day": "",
    "cert_month": "",
    "cert_year": "",

    # Page 5: Certification and Officer Details
    "certification": "",
    "marriage_license_no": "",
    "marriage_issued_on": "",
    "marriage_issued_at": "",
    "executive_order": "",
    "officer_position": "",
    "officer_religion": "",
    "witness1_name": "",
    "witness2_name": "",
    "witness3_name": "",
    "witness4_name": "",

    # Page 6: Registrar Details
    "received_by_name": "",
    "received_by_title": "",
    "received_by_date": "",
    "registrar_name": "",
    "registrar_title": "",
    "registrar_date": "",
    "remarks_annotation": "",

    # Page 7: Additional Witnesses and Affidavit
    "witness5_name": "",
    "witness6_name": "",
    "witness7_name": "",
    "witness8_name": "",
    "witness9_name": "",
    "witness10_name": "",
    "witness11_name": "",
    "witness12_name": "",
    "affidavit_officer_name": "",
    "affidavit_officer_organization": "",
    "affidavit_officer_address": "",
    "statement1_party1": "",
    "statement1_party2": "",
    "statement2a": 0,
    "statement2b": 0,
    "statement2c": 0,
    "statement2c_party1": "",
    "statement2c_party2": "",
    "statement2d": 0,
    "statement2e": 0,

    # Page 8: Affidavit and Sworn Details
    "affidavit_day": "",
    "affidavit_month": "",
    "affidavit_year": "",
    "affidavit_place": "",
    "sworn_day": "",
    "sworn_month": "",
    "sworn_year": "",
    "sworn_at": "",
    "sworn_issued_on": "",
    "sworn_issued_on2": "",
    "sworn_issued_at": "",
    "admin_officer_name": "",
    "admin_officer_title": "",
    "admin_officer_address": "",

    # Page 9: Affiant and Ceremony Details
    "affiant_name": "",
    "affiant_civil_status": "",
    "affiant_address": "",
    "statement1_option_a": 0,
    "statement1_marriage_with": "",
    "statement1_place_a": "",
    "statement1_date_a": "",
    "statement1_option_b": 0,
    "statement1_spouse_name_1": "",
    "statement1_spouse_name_2": "",
    "statement1_place_b": "",
    "statement1_date_b": "",
    "solemnizing_officer": "",
    "ceremony_religious": 0,
    "ceremony_civil": 0,
    "ceremony_muslim": 0,
    "ceremony_tribal": 0,
    "marriage_with_license": 0,
    "marriage_license_no_page9": "",
    "marriage_issued_on_page9": "",
    "marriage_issued_at_page9": "",
    "marriage_under_article": 0,
    "article_number": "",
    "citizen_applicant": "",
    "citizen_spouse": "",
    "citizen_applicant2": "",
    "citizen_spouse2": "",
    "reason_for_delay": "",
    "affidavit_day_page9": "",
    "affidavit_month_page9": "",
    "affidavit_year_page9": "",
    "affidavit_place_page9": "",

    # Page 10: Sworn Details
    "sworn_day_page10": "",
    "sworn_month_page10": "",
    "sworn_year_page10": "",
    "sworn_place_page10": "",
    "sworn_issued_on_page10": "",
    "sworn_issued_on_page102": "",
    "sworn_issued_at_page10": "",
    "administering_officer_name": "",
    "officer_position_page10": "",
    "officer_address_page10": ""
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
  valid_values = {
    "civil_status": ["SINGLE", "MARRIED", "WIDO", "WIDOWER", "ANNULLED", "DIVORCED"],
    "residence_country": ["PHILIPPINES", "PHILIPPINE", "PHILIPINES", "PHTLIPPINES"],
  }

  ocr_index = 0
  key_index = 0
  while key_index < len(keys) and ocr_index < len(ocr_list):
    key = keys[key_index]
    value = ocr_list[ocr_index].strip() if isinstance(ocr_list[ocr_index], str) else ocr_list[ocr_index]
    logger.info(f"Filling key: {key} with value: {value}")

    if key in numeric_keys:
      try:
        int(value)
        filled[key] = value
        key_index += 1
        ocr_index += 1
      except ValueError:
        filled[key] = ""
        key_index += 1
    elif key in valid_values and value not in valid_values[key]:
      filled[key] = ""
      key_index += 1
    else:
      filled[key] = value
      key_index += 1
      ocr_index += 1
  
  return filled

def marriageParse(ocr_text):
  logger.info(ocr_text)
  cleaned = remove_data_placeholders(ocr_text, default_keywords)
  logger.info("[remove_data_placeholders] %s", cleaned)
  response = generate_template(template, cleaned)
  logger.info("[parsed] %s", response)
  
  return response