from copy import deepcopy
import re

birth_certificate_template = {
    "province": "",
    "city_municipality": "",
    "registry_no": "",
    "child": {
        "name": {"first": "", "middle": "", "last": ""},
        "sex": "",
        "date_of_birth": {"day": "", "month": "", "year": ""},
        "place_of_birth": {
            "hospital_barangay": "",
            "city_municipality": "",
            "province": ""
        },
        "birth_details": {
            "type_of_birth": "",
            "if_multiple_birth_child_was": "",
            "birth_order": "",
            "weight_at_birth_grams": ""
        }
    },
    "mother": {
        "maiden_name": {"first": "", "middle": "", "last": ""},
        "citizenship": "",
        "religion": "",
        "children_count": {
            "total_born_alive": "",
            "still_living_including_this_birth": "",
            "born_alive_now_dead": ""
        },
        "occupation": "",
        "age_at_birth": "",
        "residence": {
            "house_no_st_barangay": "",
            "city_municipality": "",
            "province": "",
            "country": ""
        }
    },
    "father": {
        "name": {"first": "", "middle": "", "last": ""},
        "citizenship": "",
        "religion": "",
        "occupation": "",
        "age_at_birth": "",
        "residence": {
            "house_no_st_barangay": "",
            "city_municipality": "",
            "province": "",
            "country": ""
        }
    },
    "marriage_of_parents": {
        "date": {"month": "", "day": "", "year": ""},
        "place": {"city_municipality": "", "province": "", "country": ""}
    },
    "attendant_at_birth": {
        "attendant_type": "",
        "certification": {
            "time": "",
            "date": "",
            "signature": "",
            "name_in_print": "",
            "title_or_position": "",
            "address": ""
        }
    },
    "certification_of_informant": {
        "signature": "",
        "name_in_print": "",
        "relationship_to_child": "",
        "address": "",
        "date": ""
    },
    "prepared_by": {
        "signature": "",
        "name_in_print": "",
        "title_or_position": "",
        "date": ""
    },
    "received_by": {
        "signature": "",
        "name_in_print": "",
        "title_or_position": "",
        "date": ""
    },
    "registered_by_civil_registrar": {
        "signature": "",
        "name_in_print": "",
        "title_or_position": "",
        "date": ""
    },
    "remarks_annotations": ""
}

IGNORE_PATTERNS = [
    r'^\(.*\)$', 
    r'^Municipal Form',
    r'^To be',
    r'^Republic of',
    r'^OFFICE OF',
    r'^GENERAL',
    r'^CERTIFICATE',
    r'^Registry No:$',
    r'^Province$',
    r'^City/Municipality$',
    r'^NAME$',
    r'^SEX',
    r'^DATE OF$',
    r'^BIRTH$',
    r'^PLACE',
    r'^TYPE OF BIRTH$',
    r'^IF MULTIPLE',
    r'^BIRTH ORDER',
    r'^WEIGHT AT',
    r'^MAIDEN$',
    r'^CITIZENSHIP$',
    r'^RELIGION',
    r'^OCCUPATION$',
    r'^AGE at',
    r'^RESIDENCE$',
    r'^House No',
    r'^MARRIAGE OF',
    r'^ATTENDANT$',
    r'^CERTIFICATION',
    r'^PREPARED BY$',
    r'^RECEIVED BY$',
    r'^REGISTERED BY',
    r'^Signature$',
    r'^Title',
    r'^Date$',
    r'^Address$',
    r'^Relationship',
    r'^Name in Print',
    r'^\d+[a-z]?\.', 
    r'^hereby certify',
    r'^accomplish',
    r'^Revised',
    r'gramd?$',  
    r'^etc',
    r'^Single',
    r'^Twin',
    r'^Triplet',
    r'^Physician$',
    r'^Nurse$',
    r'^Midwife$',
    r'^Hilot',
    r'^Others',
    r'^Specify',
    r'^amlpm$',
    r'^compleled',
    r'^year',
    r'^previous',
    r'^Including',
]

def is_form_label(text):
    """Check if text is a form label that should be ignored"""
    if not text or len(text.strip()) == 0:
        return True
    
    text_upper = text.strip().upper()
    
    for pattern in IGNORE_PATTERNS:
        if re.match(pattern, text_upper, re.IGNORECASE):
            return True
    
    if len(text_upper) <= 1:
        return True
    
    return False

def get_next_valid_tokens(ocr_list, start_idx, count=5):
    """Get next non-label tokens"""
    valid_tokens = []
    idx = start_idx + 1
    
    while len(valid_tokens) < count and idx < len(ocr_list):
        token = ocr_list[idx].strip()
        if not is_form_label(token):
            valid_tokens.append(token)
        idx += 1
    
    return valid_tokens

def find_text_in_range(ocr_list, start_idx, end_idx, search_text):
    """Find if search_text appears in the specified range"""
    for i in range(start_idx, min(end_idx, len(ocr_list))):
        if search_text.upper() in ocr_list[i].upper():
            return i
    return -1

def parse_birth_certificate(ocr_list):
    """
    Parse Philippine birth certificate OCR output into structured data.
    
    Args:
        ocr_list: List of text strings extracted from OCR
        
    Returns:
        Dictionary with parsed birth certificate data
    """
    data = deepcopy(birth_certificate_template)
    
    child_name_idx = -1
    mother_name_idx = -1
    father_name_idx = -1
    
    for idx, text in enumerate(ocr_list):
        if not text:
            continue
        
        t = text.strip().upper()
        
        if "REGISTRY NO:" in t:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 3)
            if next_tokens:
                registry_parts = []
                for token in next_tokens[:3]:
                    if re.search(r'\d', token):
                        registry_parts.append(token)
                data["registry_no"] = " ".join(registry_parts) if registry_parts else ""
        
        if t == "PROVINCE" or "PROVINCE" in t:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens and len(next_tokens[0]) > 3:
                data["province"] = next_tokens[0]
        
        if "CITY/MUNICIPALITY" in t or "MUNICIPALITY" in t:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens and len(next_tokens[0]) > 2:
                data["city_municipality"] = next_tokens[0]
        
        if t == "NAME" and child_name_idx == -1 and idx < 30:
            child_name_idx = idx
            next_tokens = get_next_valid_tokens(ocr_list, idx, 3)
            if len(next_tokens) >= 3:
                data["child"]["name"]["first"] = next_tokens[0]
                data["child"]["name"]["middle"] = next_tokens[1]
                data["child"]["name"]["last"] = next_tokens[2]
        
        if "SEX" in t:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 3)
            for token in next_tokens:
                token_upper = token.upper()
                if token_upper in ["F", "FEMALE"]:
                    data["child"]["sex"] = "FEMALE"
                    break
                elif token_upper in ["M", "MALE"]:
                    data["child"]["sex"] = "MALE"
                    break
        
        if "DATE OF" in t or (t == "BIRTH" and idx > 20 and idx < 50):
            next_tokens = get_next_valid_tokens(ocr_list, idx, 5)
            for i, token in enumerate(next_tokens):
                if re.match(r'^\d{1,2}$', token) and not data["child"]["date_of_birth"]["day"]:
                    data["child"]["date_of_birth"]["day"] = token
                    if i + 1 < len(next_tokens):
                        month = next_tokens[i + 1]
                        if re.match(r'^[A-Z]+$', month) and len(month) > 2:
                            data["child"]["date_of_birth"]["month"] = month
                            if i + 2 < len(next_tokens):
                                year = next_tokens[i + 2]
                                if re.match(r'^\d{4}$', year):
                                    data["child"]["date_of_birth"]["year"] = year
                    break
        
        if "PLACE" in t and "BIRTH" in ocr_list[max(0, idx-2):idx+3]:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 5)
            if len(next_tokens) >= 3:
                data["child"]["place_of_birth"]["hospital_barangay"] = next_tokens[0]
                data["child"]["place_of_birth"]["city_municipality"] = next_tokens[1]
                data["child"]["place_of_birth"]["province"] = next_tokens[2]
        
        if "TYPE OF BIRTH" in t:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens:
                birth_type = next_tokens[0].upper()
                if birth_type in ["SINGLE", "TWIN", "TRIPLET", "MULTIPLE"]:
                    data["child"]["birth_details"]["type_of_birth"] = birth_type
        
        if "IF MULTIPLE BIRTH" in t:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens:
                data["child"]["birth_details"]["if_multiple_birth_child_was"] = next_tokens[0]
        
        if "BIRTH ORDER" in t:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens:
                birth_order = next_tokens[0].upper()
                if any(x in birth_order for x in ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"]):
                    data["child"]["birth_details"]["birth_order"] = birth_order
        
        if "WEIGHT AT BIRTH" in t:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens:
                weight = next_tokens[0]
                numbers = re.findall(r'\d+', weight)
                if numbers:
                    data["child"]["birth_details"]["weight_at_birth_grams"] = numbers[0]
        
        if "MAIDEN" in t and mother_name_idx == -1:
            mother_name_idx = idx
            next_tokens = get_next_valid_tokens(ocr_list, idx, 3)
            if len(next_tokens) >= 3:
                data["mother"]["maiden_name"]["first"] = next_tokens[0]
                data["mother"]["maiden_name"]["middle"] = next_tokens[1]
                data["mother"]["maiden_name"]["last"] = next_tokens[2]
        
        if "CITIZENSHIP" in t and mother_name_idx != -1 and (father_name_idx == -1 or idx < father_name_idx):
            next_tokens = get_next_valid_tokens(ocr_list, idx, 1)
            if next_tokens and not data["mother"]["citizenship"]:
                data["mother"]["citizenship"] = next_tokens[0]
        
        if "RELIGION" in t and mother_name_idx != -1 and (father_name_idx == -1 or idx < father_name_idx):
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens and not data["mother"]["religion"]:
                religion = " ".join(next_tokens[:2]) if len(next_tokens) > 1 else next_tokens[0]
                data["mother"]["religion"] = religion
        
        if "TOTAL NUMBER" in t or ("Tolal" in text and "number" in text.lower()):
            next_tokens = get_next_valid_tokens(ocr_list, idx, 1)
            if next_tokens and re.match(r'^\d+$', next_tokens[0]):
                data["mother"]["children_count"]["total_born_alive"] = next_tokens[0]
        
        if "STILL LIVING" in t.upper() or "still" in text.lower():
            next_tokens = get_next_valid_tokens(ocr_list, idx, 1)
            if next_tokens and re.match(r'^\d+$', next_tokens[0]):
                data["mother"]["children_count"]["still_living_including_this_birth"] = next_tokens[0]
        
        if "NOW DEAD" in t:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 1)
            if next_tokens and re.match(r'^\d+$', next_tokens[0]):
                data["mother"]["children_count"]["born_alive_now_dead"] = next_tokens[0]
        
        if "OCCUPATION" in t and mother_name_idx != -1 and (father_name_idx == -1 or idx < father_name_idx):
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens and not data["mother"]["occupation"]:
                data["mother"]["occupation"] = next_tokens[0]
        
        if "AGE" in t and mother_name_idx != -1 and (father_name_idx == -1 or idx < father_name_idx):
            next_tokens = get_next_valid_tokens(ocr_list, idx, 1)
            if next_tokens and re.match(r'^\d{2}$', next_tokens[0]) and not data["mother"]["age_at_birth"]:
                data["mother"]["age_at_birth"] = next_tokens[0]
        
        if "RESIDENCE" in t and mother_name_idx != -1 and (father_name_idx == -1 or idx < father_name_idx):
            next_tokens = get_next_valid_tokens(ocr_list, idx, 4)
            if len(next_tokens) >= 4 and not data["mother"]["residence"]["house_no_st_barangay"]:
                data["mother"]["residence"]["house_no_st_barangay"] = next_tokens[0]
                data["mother"]["residence"]["city_municipality"] = next_tokens[1]
                data["mother"]["residence"]["province"] = next_tokens[2]
                data["mother"]["residence"]["country"] = next_tokens[3]
        
        if t == "NAME" and mother_name_idx != -1 and father_name_idx == -1 and idx > mother_name_idx + 10:
            father_name_idx = idx
            next_tokens = get_next_valid_tokens(ocr_list, idx, 3)
            if len(next_tokens) >= 3:
                data["father"]["name"]["first"] = next_tokens[0]
                data["father"]["name"]["middle"] = next_tokens[1]
                data["father"]["name"]["last"] = next_tokens[2]
        
        if "CITIZENSHIP" in t and father_name_idx != -1 and idx > father_name_idx:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 1)
            if next_tokens:
                data["father"]["citizenship"] = next_tokens[0]
        
        if "RELIGION" in t and father_name_idx != -1 and idx > father_name_idx:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens:
                religion = " ".join(next_tokens[:2]) if len(next_tokens) > 1 else next_tokens[0]
                data["father"]["religion"] = religion
        
        if "OCCUPATION" in t and father_name_idx != -1 and idx > father_name_idx:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 2)
            if next_tokens:
                data["father"]["occupation"] = next_tokens[0]
        
        if "AGE" in t and father_name_idx != -1 and idx > father_name_idx:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 1)
            if next_tokens and re.match(r'^\d{2}$', next_tokens[0]):
                data["father"]["age_at_birth"] = next_tokens[0]
        
        if "RESIDENCE" in t and father_name_idx != -1 and idx > father_name_idx:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 4)
            if len(next_tokens) >= 4:
                data["father"]["residence"]["house_no_st_barangay"] = next_tokens[0]
                data["father"]["residence"]["city_municipality"] = next_tokens[1]
                data["father"]["residence"]["province"] = next_tokens[2]
                data["father"]["residence"]["country"] = next_tokens[3]
        
        if "MARRIAGE" in t and "PARENTS" in ocr_list[max(0, idx-1):min(len(ocr_list), idx+3)]:
            next_tokens = get_next_valid_tokens(ocr_list, idx, 10)
            for i, token in enumerate(next_tokens):
                if re.match(r'^[A-Z]+$', token) and len(token) > 3:
                    data["marriage_of_parents"]["date"]["month"] = token
                    # Look for day and year nearby
                    if i + 1 < len(next_tokens) and re.match(r'^\d{1,2}', next_tokens[i + 1]):
                        day_match = re.search(r'\d{1,2}', next_tokens[i + 1])
                        if day_match:
                            data["marriage_of_parents"]["date"]["day"] = day_match.group()
                    if i + 2 < len(next_tokens) and re.search(r'\d{4}', next_tokens[i + 2]):
                        year_match = re.search(r'\d{4}', next_tokens[i + 2])
                        if year_match:
                            data["marriage_of_parents"]["date"]["year"] = year_match.group()
                    break
        
        if "PLACE" in t and idx > 100:  # Marriage place appears late in document
            next_tokens = get_next_valid_tokens(ocr_list, idx, 5)
            if len(next_tokens) >= 3 and not data["marriage_of_parents"]["place"]["city_municipality"]:
                data["marriage_of_parents"]["place"]["city_municipality"] = next_tokens[0]
                data["marriage_of_parents"]["place"]["province"] = next_tokens[1]
                if len(next_tokens) >= 3:
                    data["marriage_of_parents"]["place"]["country"] = next_tokens[2]
        
        # === ATTENDANT AT BIRTH ===
        if "ATTENDANT" in t and "BIRTH" in ocr_list[max(0, idx-2):min(len(ocr_list), idx+5)]:
            # Look for checked option in next few tokens
            next_tokens = get_next_valid_tokens(ocr_list, idx, 10)
            for token in next_tokens:
                token_upper = token.upper()
                if any(x in token_upper for x in ["PHYSICIAN", "NURSE", "MIDWIFE", "HILOT"]):
                    # Get just the attendant type
                    if "PHYSICIAN" in token_upper:
                        data["attendant_at_birth"]["attendant_type"] = "PHYSICIAN"
                    elif "NURSE" in token_upper:
                        data["attendant_at_birth"]["attendant_type"] = "NURSE"
                    elif "MIDWIFE" in token_upper:
                        data["attendant_at_birth"]["attendant_type"] = "MIDWIFE"
                    elif "HILOT" in token_upper:
                        data["attendant_at_birth"]["attendant_type"] = "HILOT"
                    break
        
        # Attendant certification details
        if "Name in Print" in text and "attendant" in " ".join(ocr_list[max(0, idx-10):idx]).lower():
            next_tokens = get_next_valid_tokens(ocr_list, idx, 1)
            if next_tokens:
                data["attendant_at_birth"]["certification"]["name_in_print"] = next_tokens[0]
        
        # === INFORMANT ===
        if "Name in Print" in text and "informant" in " ".join(ocr_list[max(0, idx-10):idx]).lower():
            next_tokens = get_next_valid_tokens(ocr_list, idx, 1)
            if next_tokens:
                data["certification_of_informant"]["name_in_print"] = next_tokens[0]
        
        # === PREPARED BY ===
        if "PREPARED BY" in t:
            # Look for name
            for j in range(idx + 1, min(idx + 20, len(ocr_list))):
                if "Name in Print" in ocr_list[j]:
                    next_tokens = get_next_valid_tokens(ocr_list, j, 1)
                    if next_tokens:
                        data["prepared_by"]["name_in_print"] = next_tokens[0]
                    break
    
    return data