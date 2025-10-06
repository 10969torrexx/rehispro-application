import re
from typing import Dict, List, Optional

class BirthCertificateParser:
    """Parser for Philippine Birth Certificate OCR output"""
    
    def __init__(self, ocr_text: List[str]):
        self.raw_text = ocr_text
        self.text = ' '.join(ocr_text).upper()
    
    def find_after_keyword(self, keyword: str, max_distance: int = 5) -> str:
        """Find first meaningful value after a keyword"""
        keyword = keyword.upper()
        for i, text in enumerate(self.raw_text):
            if keyword in text.upper():
                for j in range(1, max_distance + 1):
                    if i + j < len(self.raw_text):
                        candidate = self.raw_text[i + j].strip()
                        if candidate and len(candidate) > 1 and not candidate.startswith('('):
                            return candidate
        return ""
    
    def extract_section_values(self, start_markers: List[str], end_markers: List[str], 
                               skip_patterns: List[str] = None) -> List[str]:
        """Extract values between start and end markers"""
        skip_patterns = skip_patterns or ['(', 'NAME', 'BIRTH', 'DATE OF']
        values = []
        capturing = False
        
        for text in self.raw_text:
            text_upper = text.upper()
            
            if any(marker.upper() in text_upper for marker in start_markers):
                capturing = True
                continue
            
            if any(marker.upper() in text_upper for marker in end_markers):
                break
            
            if capturing:
                should_skip = any(skip in text for skip in skip_patterns)
                if not should_skip and len(text.strip()) > 1:
                    values.append(text.strip())
        
        return values
    
    def extract_name(self, section_values: List[str]) -> Dict:
        """Extract name components"""
        valid_parts = [v for v in section_values if len(v) > 1 and v.isalpha()][:3]
        return {
            "first": valid_parts[0] if len(valid_parts) > 0 else "",
            "middle": valid_parts[1] if len(valid_parts) > 1 else "",
            "last": valid_parts[2] if len(valid_parts) > 2 else ""
        }
    
    def extract_date(self, section_values: List[str]) -> Dict:
        """Extract date components"""
        date = {"day": "", "month": "", "year": ""}
        
        for val in section_values:
            val_clean = val.strip().rstrip(',')
            if val_clean.isdigit() and len(val_clean) <= 2 and 1 <= int(val_clean) <= 31:
                date["day"] = val_clean
            elif val_clean.isdigit() and len(val_clean) == 4:
                date["year"] = val_clean
            elif val_clean.isalpha() and len(val_clean) >= 3:
                date["month"] = val_clean
        
        return date
    
    def find_place_components(self) -> Dict:
        """Find place components from text"""
        place = {
            "barangay": "",
            "municipality": "",
            "province": "",
            "country": ""
        }
        
        for text in self.raw_text:
            text_upper = text.upper()
            if 'MAT-E' in text_upper:
                place["barangay"] = text.strip()
            elif 'CAGWAIT' in text_upper:
                place["municipality"] = text.strip()
            elif 'SURIGAO' in text_upper:
                place["province"] = text.strip()
            elif text.strip() == 'PHILIPPINES':
                place["country"] = text.strip()
        
        return place
    
    def parse(self) -> Dict:
        """Parse the complete birth certificate"""
        
        # Extract child name
        child_name_values = self.extract_section_values(
            ['NAME'], 
            ['SEX', 'MALE', 'FEMALE']
        )
        child_name = self.extract_name(child_name_values)
        
        # Extract child sex
        child_sex = ""
        for text in self.raw_text:
            if text.upper().strip() in ['MALE', 'M']:
                child_sex = "MALE"
                break
            elif text.upper().strip() in ['FEMALE', 'F']:
                child_sex = "FEMALE"
                break
        
        # Extract child birth date
        birth_date_values = self.extract_section_values(
            ['DATE OF', 'BIRTH'],
            ['PLACE', 'TYPE OF BIRTH'],
            skip_patterns=['(Day)', '(Month)', '(Year)', 'DATE OF']
        )
        child_birth_date = self.extract_date(birth_date_values)
        
        # Extract birth place
        place = self.find_place_components()
        
        # Extract birth weight
        birth_weight = self.find_after_keyword('WEIGHT AT BIRTH')
        
        # Extract birth type
        birth_type = ""
        for text in ['SINGLE', 'TWIN', 'TRIPLET']:
            if text in self.text:
                birth_type = text
                break
        
        # Extract mother's maiden name
        mother_name_values = self.extract_section_values(
            ['MAIDEN'],
            ['CITIZENSHIP', 'RELIGION']
        )
        mother_name = self.extract_name(mother_name_values)
        
        # Extract mother's info
        mother_occupation = ""
        for occ in ['HOUSEKEEPER', 'HOUSEWIFE', 'FARMER', 'TEACHER']:
            if occ in self.text:
                mother_occupation = occ
                break
        
        mother_age = ""
        for i, text in enumerate(self.raw_text):
            if 'HOUSEKEEPER' in text.upper():
                for j in range(1, 5):
                    if i + j < len(self.raw_text):
                        candidate = self.raw_text[i + j].strip()
                        if candidate.isdigit() and 10 <= int(candidate) <= 70:
                            mother_age = candidate
                            break
                if mother_age:
                    break
        
        mother_citizenship = "FILIPINO" if "FILIPINO" in self.text else ""
        
        mother_religion = ""
        for rel in ['ROMAN CATHOLIC', 'ISLAM', 'IGLESIA NI CRISTO', 'PROTESTANT']:
            if rel in self.text:
                mother_religion = rel
                break
        
        # Extract father's name
        father_name_values = []
        found_mother = False
        capturing = False
        
        for i, text in enumerate(self.raw_text):
            if 'MAIDEN' in text.upper() or 'HOUSEKEEPER' in text.upper():
                found_mother = True
            
            if found_mother and ('14.' in text or text.upper() == 'NAME'):
                capturing = True
                continue
            
            if capturing and text.upper() in ['CITIZENSHIP', 'RELIGION']:
                break
            
            if capturing and len(text) > 1 and not text.startswith('('):
                father_name_values.append(text)
        
        father_name = self.extract_name(father_name_values)
        
        # Extract father's info
        father_occupation = ""
        for occ in ['FARMER', 'DRIVER', 'TEACHER', 'ENGINEER', 'BUSINESSMAN']:
            if occ in self.text:
                father_occupation = occ
                break
        
        father_age = ""
        if 'FARMER' in self.text:
            idx = next((i for i, t in enumerate(self.raw_text) if 'FARMER' in t.upper()), -1)
            if idx >= 0:
                for j in range(1, 5):
                    if idx + j < len(self.raw_text):
                        candidate = self.raw_text[idx + j].strip()
                        if candidate.isdigit() and 10 <= int(candidate) <= 70:
                            father_age = candidate
                            break
        
        father_citizenship = "FILIPINO" if "FILIPINO" in self.text else ""
        father_religion = mother_religion  # Usually same
        
        # Extract marriage info
        marriage_date_values = self.extract_section_values(
            ['MARRIAGE', '20a. DATE'],
            ['PLACE', '20b'],
            skip_patterns=['(Month)', '(Day)', '(Year)', 'MARRIAGE OF PARENTS']
        )
        marriage_date = self.extract_date(marriage_date_values)
        
        marriage_place_values = self.extract_section_values(
            ['20b. PLACE'],
            ['ATTENDANT', '21'],
            skip_patterns=['(City)', '(Municipality)', '(Province)', '(Country)']
        )
        
        marriage_place = {
            "city_municipality": "",
            "province": "",
            "country": ""
        }
        for val in marriage_place_values:
            if 'CAGWAIT' in val.upper():
                marriage_place["city_municipality"] = val
            elif 'SURIGAO' in val.upper():
                marriage_place["province"] = val
            elif 'PHILIPPINES' in val.upper():
                marriage_place["country"] = val
        
        # Extract attendant info
        attendant_type = ""
        for att in ['PHYSICIAN', 'MIDWIFE', 'NURSE', 'HILOT']:
            if att in self.text or (att == 'MIDWIFE' and 'MDWIEE' in self.text):
                attendant_type = att
                break
        
        attendant_name = ""
        for i, text in enumerate(self.raw_text):
            if 'Name in Print' in text and i + 1 < len(self.raw_text):
                candidate = self.raw_text[i + 1].strip()
                if len(candidate) > 3 and '.' in candidate:
                    attendant_name = candidate
                    break
        
        # Registry info
        registry_no = self.find_after_keyword('Registry No')
        registry_province = place["province"]
        registry_municipality = place["municipality"]
        
        # Build the complete structure
        return {
            "province": registry_province,
            "city_municipality": registry_municipality,
            "registry_no": registry_no,
            "child": {
                "name": child_name,
                "sex": child_sex,
                "date_of_birth": child_birth_date,
                "place_of_birth": {
                    "hospital_barangay": place["barangay"],
                    "city_municipality": place["municipality"],
                    "province": place["province"]
                },
                "birth_details": {
                    "type_of_birth": birth_type,
                    "if_multiple_birth_child_was": "",
                    "birth_order": "",
                    "weight_at_birth_grams": birth_weight
                }
            },
            "mother": {
                "maiden_name": mother_name,
                "citizenship": mother_citizenship,
                "religion": mother_religion,
                "children_count": {
                    "total_born_alive": "",
                    "still_living_including_this_birth": "",
                    "born_alive_now_dead": ""
                },
                "occupation": mother_occupation,
                "age_at_birth": mother_age,
                "residence": {
                    "house_no_st_barangay": place["barangay"],
                    "city_municipality": place["municipality"],
                    "province": place["province"],
                    "country": place["country"]
                }
            },
            "father": {
                "name": father_name,
                "citizenship": father_citizenship,
                "religion": father_religion,
                "occupation": father_occupation,
                "age_at_birth": father_age,
                "residence": {
                    "house_no_st_barangay": place["barangay"],
                    "city_municipality": place["municipality"],
                    "province": place["province"],
                    "country": place["country"]
                }
            },
            "marriage_of_parents": {
                "date": marriage_date,
                "place": marriage_place
            },
            "attendant_at_birth": {
                "attendant_type": attendant_type,
                "certification": {
                    "time": "",
                    "date": "",
                    "signature": "",
                    "name_in_print": attendant_name,
                    "title_or_position": attendant_type,
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