from fastapi import FastAPI, File, UploadFile
import uvicorn
import io
from PIL import Image
import numpy as np
import easyocr


app = FastAPI()
# instantiate reader once at startup (takes time to load models)
reader = easyocr.Reader(['en'], verbose=False)

@app.post('/ocr')
async def ocr_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')
    img_np = np.array(image)
    results = reader.readtext(img_np)
    out = [{"bbox": r[0], "text": r[1], "conf": r[2]} for r in results]
    return {"ocr": out}


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=5001)