import pytest
from fastapi.testclient import TestClient
from main import app, users_db, User

client = TestClient(app)

# Test to retrieve all users
def test_list_users():
    response = client.get("/users")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    # Check if all items in the list are valid user dictionaries
    for user in response.json():
        assert "id" in user
        assert "firstName" in user
        assert "lastName" in user

# Test to update a user by ID
def test_update_user():
    test_user_id = 1
    users_db[test_user_id] = {
        "id": test_user_id,
        "firstName": "OldFirstName",
        "lastName": "OldLastName",
        "age": 30,
        "gender": "M",
        "email": "old@example.com",
        "phone": "1234567890"
    }

    updated_user_data = {
        "firstName": "NewFirstName",
        "lastName": "NewLastName",
        "age": 35,
        "gender": "M",
        "email": "new@example.com",
        "phone": "0987654321"
    }

    response = client.put(f"/users/{test_user_id}", json=updated_user_data)
    assert response.status_code == 200
    response_json = response.json()
    assert response_json["firstName"] == updated_user_data["firstName"]
    assert response_json["lastName"] == updated_user_data["lastName"]
    assert response_json["age"] == updated_user_data["age"]

# Test for updating a non-existent user
def test_update_nonexistent_user():
    response = client.put("/users/999", json={
        "firstName": "NonExistent",
        "lastName": "User",
        "age": 28,
        "gender": "F",
        "email": "noone@example.com",
        "phone": "0000000000"
    })
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"
