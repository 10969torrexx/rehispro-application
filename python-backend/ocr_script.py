import sys
import os
import json
from logger_setup import setup_logger
import numpy as np
from PIL import Image
import easyocr
from birth_parser import birthParse
from death_parser import deathParse
from marriage_parser import marriageParse 

"""
TODO: logger setup
"""
logger = setup_logger(__name__, "python-backend/logs/ocr_script.log")

def run_ocr(file_paths, type_arg):
    """Runs OCR on all given file paths and returns parsed result"""
    reader = easyocr.Reader(['en'], verbose=False)
    all_text = []
    errors = []

    logger.info("type_arg: %s", type_arg)

    for path in file_paths:
        try:
            image = Image.open(path).convert('RGB')
            img_np = np.array(image)
            ocr_output = reader.readtext(img_np)
            texts = [str(r[1]) for r in ocr_output]
            all_text.extend(texts)
            logger.info("[%s] all text=%s",type_arg, all_text)
        except Exception as e:
            errors.append({"file": path, "error": str(e)})

    try:
        parsed_data = ""
        if type_arg == "birth":
            parsed_data = birthParse(all_text)
        elif type_arg == "death":
            parsed_data = deathParse(all_text)
        elif type_arg == "marriage":
            parsed_data = marriageParse(all_text)

        logger.info("[parsed data] %s", parsed_data)
        result = {
            "success": True,
            "result": parsed_data,
            "errors": errors
        }
    except Exception as e:
        result = {
            "success": False,
            "message": f"Parsing failed: {e}",
            "errors": errors
        }

    print(json.dumps(result))
    return result

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"success": False, "message": "Type and file paths are required"}))
        sys.exit(1)

    type_arg = sys.argv[1]
    file_paths = sys.argv[2:]

    run_ocr(file_paths, type_arg)