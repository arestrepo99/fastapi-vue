# usergroups/routes.py

from fastapi import APIRouter, Depends, HTTPException
from . import crud
from .models import UserGroup, User
from typing import List
from src.auth.jwthandler import create_access_token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

# JWT authentication dependency
def get_current_user_with_jwt(token: str = Depends(get_current_user)):
    return token

@router.post("/", response_model=UserGroup)
async def create_user_group(
    user_group: UserGroup,
    current_user: User = Depends(get_current_user_with_jwt),  # Requires authentication
):
    
    return crud.create_user_group(user_group)

@router.get("/", response_model=List[UserGroup])
async def list_user_groups(
    current_user: User = Depends(get_current_user_with_jwt),  # Requires authentication
):
    assert current_user.is_superuser, HTTPException(status_code=401, detail="Not authorized")
    return crud.list_user_groups()

@router.get("/{user_group_id}", response_model=UserGroup)
async def get_user_group(
    user_group_id: int,
    current_user: User = Depends(get_current_user_with_jwt),  # Requires authentication
):
    assert current_user.is_superuser, HTTPException(status_code=401, detail="Not authorized")
    return crud.get_user_group(user_group_id)

@router.put("/{user_group_id}", response_model=UserGroup)
async def update_user_group(
    user_group_id: int,
    updated_user_group: UserGroup,
    current_user: User = Depends(get_current_user_with_jwt),  # Requires authentication
):
    assert current_user.is_superuser, HTTPException(status_code=401, detail="Not authorized")
    return crud.update_user_group(user_group_id, updated_user_group)

@router.delete("/{user_group_id}", response_model=UserGroup)
async def delete_user_group(
    user_group_id: int,
    current_user: User = Depends(get_current_user_with_jwt),  # Requires authentication
):
    assert current_user.is_superuser, HTTPException(status_code=401, detail="Not authorized")
    return crud.delete_user_group(user_group_id)

@router.post("/{user_group_id}/add_user/{user_id}")
async def add_user_to_group(
    user_group_id: int,
    user_id: int,
    current_user: User = Depends(get_current_user_with_jwt),  # Requires authentication
):
    assert current_user.is_superuser, HTTPException(status_code=401, detail="Not authorized")
    return crud.add_user_to_group(user_group_id, user_id)

@router.delete("/{user_group_id}/remove_user/{user_id}")
async def remove_user_from_group(
    user_group_id: int,
    user_id: int,
    current_user: User = Depends(get_current_user_with_jwt),  # Requires authentication
):
    assert current_user.is_superuser, HTTPException(status_code=401, detail="Not authorized")
    return crud.remove_user_from_group(user_group_id, user_id)
