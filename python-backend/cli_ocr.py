# python-backend/cli_ocr.py
import argparse
import json
from PIL import Image
import numpy as np
import easyocr


reader = easyocr.Reader(['en'])


parser = argparse.ArgumentParser()
parser.add_argument('--file', required=True)
args = parser.parse_args()


img = Image.open(args.file).convert('RGB')
img_np = np.array(img)
res = reader.readtext(img_np)
out = [{"bbox": r[0], "text": r[1], "conf": r[2]} for r in res]
print(json.dumps(out))