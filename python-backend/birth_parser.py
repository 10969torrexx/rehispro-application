from copy import deepcopy
import re

birth_certificate_template = {
    "child": {
        "name": {"first": "", "middle": "", "last": ""},
        "sex": "",
        "date_of_birth": {"day": "", "month": "", "year": ""},
        "place_of_birth": {
            "hospital_or_house": "",
            "barangay": "",
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

def parse_birth_certificate(ocr_list):
    data = deepcopy(birth_certificate_template)

    for idx, text in enumerate(ocr_list):
        t = text.strip().upper()

        if t == "NAME":
            try:
                data["child"]["name"]["first"] = ocr_list[idx+1]
                data["child"]["name"]["middle"] = ocr_list[idx+2]
                data["child"]["name"]["last"] = ocr_list[idx+3]
            except IndexError:
                pass

        if "SEX" in t:
            next_tokens = ocr_list[idx+1:idx+10]
            sex_token = next((tok.upper() for tok in next_tokens if tok.upper() in ["F", "M"]), "")
            if sex_token == "F":
                sex_token = "FEMALE"
            elif sex_token == "M":
                sex_token = "MALE"
            data["child"]["sex"] = sex_token

        if t == "DATE OF":
            data["child"]["date_of_birth"]["day"] = ocr_list[idx+7]
            data["child"]["date_of_birth"]["month"] = ocr_list[idx+8]
            data["child"]["date_of_birth"]["year"] = ocr_list[idx+9]

        if t == "House No:":
            data["child"]["place_of_birth"]["barangay"] = ocr_list[idx+2]
            data["child"]["place_of_birth"]["city_municipality"] = ocr_list[idx+3]
            data["child"]["place_of_birth"]["province"] = ocr_list[idx+4]

        elif "TYPE OF BIRTH" in t:
            data["child"]["birth_details"]["type_of_birth"] = ocr_list[idx+1]

        elif "MULTIPLE BIRTH" in t:
            data["child"]["birth_details"]["if_multiple_birth_child_was"] = ocr_list[idx+1]

        elif "BIRTH ORDER" in t:
            data["child"]["birth_details"]["birth_order"] = ocr_list[idx+1]

        elif "WEIGHT AT BIRTH" in t:
            grams = re.findall(r"\d+", ocr_list[idx+1]) if idx+1 < len(ocr_list) else []
            data["child"]["birth_details"]["weight_at_birth_grams"] = grams[0] if grams else ""

        # --- MOTHER ---
        elif t == "MAIDEN":
            try:
                data["mother"]["maiden_name"]["first"] = ocr_list[idx+1]
                data["mother"]["maiden_name"]["middle"] = ocr_list[idx+2]
                data["mother"]["maiden_name"]["last"] = ocr_list[idx+3]
            except IndexError:
                pass

        elif "CITIZENSHIP" in t and "MOTHER" not in data["father"]:  # for mother
            data["mother"]["citizenship"] = ocr_list[idx+1]

        elif "RELIGION" in t and "SECT" in t:
            data["mother"]["religion"] = ocr_list[idx+1]

        elif "TOTAL NUMBER OF CHILDREN" in t:
            data["mother"]["children_count"]["total_born_alive"] = ocr_list[idx+1]

        elif "STILL LIVING" in t:
            data["mother"]["children_count"]["still_living_including_this_birth"] = ocr_list[idx+1]

        elif "NOW DEAD" in t:
            data["mother"]["children_count"]["born_alive_now_dead"] = ocr_list[idx+1]

        elif "OCCUPATION" in t:
            data["mother"]["occupation"] = ocr_list[idx+1]

        elif "AGE AT" in t:
            data["mother"]["age_at_birth"] = ocr_list[idx+1]

        elif "RESIDENCE" in t and "MOTHER" in ocr_list[idx-1].upper():
            try:
                data["mother"]["residence"]["house_no_st_barangay"] = ocr_list[idx+1]
                data["mother"]["residence"]["city_municipality"] = ocr_list[idx+2]
                data["mother"]["residence"]["province"] = ocr_list[idx+3]
                data["mother"]["residence"]["country"] = ocr_list[idx+4]
            except IndexError:
                pass

        # --- FATHER ---
        elif t == "NAME" and "MOTHER" not in ocr_list[idx-1].upper():
            try:
                data["father"]["name"]["first"] = ocr_list[idx+1]
                data["father"]["name"]["middle"] = ocr_list[idx+2]
                data["father"]["name"]["last"] = ocr_list[idx+3]
            except IndexError:
                pass

        elif "CITIZENSHIP" in t:
            data["father"]["citizenship"] = ocr_list[idx+1]

        elif "RELIGION" in t:
            data["father"]["religion"] = ocr_list[idx+1]

        elif "OCCUPATION" in t and "FATHER" in ocr_list[idx-1].upper():
            data["father"]["occupation"] = ocr_list[idx+1]

        elif "AGE" in t and "FATHER" in ocr_list[idx-1].upper():
            data["father"]["age_at_birth"] = ocr_list[idx+1]

        elif "RESIDENCE" in t and "FATHER" in ocr_list[idx-1].upper():
            try:
                data["father"]["residence"]["house_no_st_barangay"] = ocr_list[idx+1]
                data["father"]["residence"]["city_municipality"] = ocr_list[idx+2]
                data["father"]["residence"]["province"] = ocr_list[idx+3]
                data["father"]["residence"]["country"] = ocr_list[idx+4]
            except IndexError:
                pass

    return data
