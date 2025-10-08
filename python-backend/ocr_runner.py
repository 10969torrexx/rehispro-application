
import sys
import os
import json
import logging
import numpy as np
from PIL import Image
import easyocr
from birth_parser import parse

# Setup logging (optional)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_DIR = os.path.join(BASE_DIR, "logs")
os.makedirs(LOG_DIR, exist_ok=True)

logging.basicConfig(
    filename=os.path.join(LOG_DIR, "runner.log"),
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)

def run_ocr(file_paths):
    """Runs OCR on all given file paths and returns parsed result"""
    reader = easyocr.Reader(['en'], verbose=False)
    all_text = []
    errors = []

    for path in file_paths:
        try:
            logger.info(f"Processing {path}")
            image = Image.open(path).convert('RGB')
            img_np = np.array(image)
            ocr_output = reader.readtext(img_np)
            texts = [str(r[1]) for r in ocr_output]
            all_text.extend(texts)
        except Exception as e:
            logger.error(f"OCR failed for {path}: {e}", exc_info=True)
            errors.append({"file": path, "error": str(e)})

    try:
        parsed_data = parse(all_text)
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

    print(json.dumps(result))  # <-- Node reads this stdout
    return result


if __name__ == "__main__":
    # Take file paths from command line args
    file_paths = sys.argv[1:]
    if not file_paths:
        print(json.dumps({"success": False, "message": "No files provided"}))
        sys.exit(1)

    run_ocr(file_paths)
