import os
import logging
from fastapi import FastAPI, File, UploadFile
import uvicorn
import io
from PIL import Image
import numpy as np
import easyocr
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from birth_parser import parse
import json
from typing import List

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_DIR = os.path.join(BASE_DIR, "logs")
os.makedirs(LOG_DIR, exist_ok=True)

logging.basicConfig(
    filename=os.path.join(LOG_DIR, "error.log"),
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)

ocr_logger = logging.getLogger("ocr")
ocr_handler = logging.FileHandler(os.path.join(LOG_DIR, "ocr.log"))
ocr_handler.setFormatter(logging.Formatter("%(asctime)s - %(message)s"))
ocr_logger.addHandler(ocr_handler)
ocr_logger.setLevel(logging.INFO)

app = FastAPI()
reader = easyocr.Reader(['en'], verbose=False)

@app.on_event("startup")
async def load_model():
    global reader
    try:
        logger.info("Loading EasyOCR model...")
        reader = easyocr.Reader(['en'], verbose=False)
        logger.info("EasyOCR model loaded successfully.")
    except Exception as e:
        logger.error("Failed to load EasyOCR model: %s", str(e), exc_info=True)


"""
    TODO: this is the function that handles the ocr operations
    ?params: array of files
"""
@app.post('/ocr')
async def ocr_endpoint(files: List[UploadFile] = File(...)):
    results = []
    all_text = []
    errors = []
    for file in files:
        try:
            logger.info("Received OCR request: %s", file.filename)
            contents = await file.read()
            image = Image.open(io.BytesIO(contents)).convert('RGB')
            img_np = np.array(image)
            ocr_output = reader.readtext(img_np)

            texts = [str(r[1]) for r in ocr_output]
            all_text.extend(texts) 
            ocr_logger.info("File: %s | Results: %s", file.filename, texts)

        except Exception as e:
            logger.error("OCR failed for %s: %s", file.filename, str(e), exc_info=True)
            errors.append({"filename": file.filename, "error": str(e)})

    logger.info("join ocr %s", all_text)
    
    try:
        parsed_data = parse(all_text)
        ocr_logger.info("Parsed combined results: %s", parsed_data)
        results = ({
            "success": True,
            "message": "OCR completed successfully",
            "result": {
                "combined_files": [file.filename for file in files],
                "parsed_data": parsed_data
            }
        })
    except Exception as e:
        logger.error(f"Parsing failed: {e}", exc_info=True)
        results = ({
            "success": False,
            "message": f"Parsing failed: {e}",
            "errors": errors
        })

    return results

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled exception: %s", str(exc), exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error. Check error.log."},
    )


if __name__ == '__main__':
    try:
        logger.info("Starting FastAPI server...")
        uvicorn.run(app, host='127.0.0.1', port=5001)
    except Exception as e:
        logger.critical("Server crashed: %s", str(e), exc_info=True)
