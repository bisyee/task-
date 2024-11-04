from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from users import get_users  # Existing mock users

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for user data
class User(BaseModel):
    id: Optional[int] = None
    firstName: str
    lastName: str
    age: int
    gender: str
    email: str
    phone: str

# In-memory mock database
users_db = {user["id"]: user for user in get_users()}

# Dependency to fetch all users
def get_user_list() -> List[User]:
    return list(users_db.values())

# Endpoint to retrieve all users
@app.get("/users", response_model=List[User])
def list_users(users: List[User] = Depends(get_user_list)):
    return users


@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, updated_user: User):
    user = users_db.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    updated_data = updated_user.dict(exclude_unset=True)
    users_db[user_id].update(updated_data)
    return users_db[user_id]