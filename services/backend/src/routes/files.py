from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi import File, UploadFile
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist

import src.crud.notes as crud
from src.auth.jwthandler import is_superuser, get_current_user
import uuid


router = APIRouter()

# File upload endpoint should create a file with UUID name and return the URL

@router.post(
    '/uploadFile/',
    dependencies=[Depends(is_superuser)]
)
async def upload_file(file: UploadFile = File(...)):
    UPLOADS_DIR = 'static'
    while True:
        # Generate a random UUID for the file
        unique_filename = str(uuid.uuid4()) 
        file_path = os.path.join(UPLOADS_DIR, unique_filename)

        # Check if a file with the same UUID already exists
        if not os.path.exists(file_path):
            break

    # Save the file with the unique filename
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    return {'filename': unique_filename}