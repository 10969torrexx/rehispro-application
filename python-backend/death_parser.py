from rapidfuzz import fuzz, process
from difflib import SequenceMatcher
import os
from datetime import datetime

def deathParse(ocr_text):
    logger.info("death parse")
    logger.info(ocr_text)