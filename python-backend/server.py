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


@app.post('/ocr')
async def ocr_endpoint(file: UploadFile = File(...)):
    try:
        logger.info("Received OCR request: %s", file.filename)
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        img_np = np.array(image)
        results = reader.readtext(img_np)

        out = []
        for r in results:
            bbox = [(float(x), float(y)) for x, y in r[0]]
            text = str(r[1])
            conf = float(r[2])
            out.append({"bbox": bbox, "text": text, "conf": conf})

        ocr_logger.info("File: %s | Results: %s", file.filename, out)

        logger.info("OCR processed successfully for %s", file.filename)
        return {"ocr": out}

    except Exception as e:
        logger.error("OCR processing failed: %s", str(e), exc_info=True)
        return {"error": "OCR failed, check error.log"}


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
