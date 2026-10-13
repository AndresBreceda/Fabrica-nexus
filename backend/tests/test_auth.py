from fastapi import status
from fastapi.testclient import TestClient
from app.models.user import User


def test_login_success(client: TestClient, test_user: User):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": test_user.email, "password": "TestPassword123!"},
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_password(client: TestClient, test_user: User):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": test_user.email, "password": "WrongPassword!"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json()["detail"] == "Credenciales inválidas"


def test_login_user_not_found(client: TestClient):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "nonexistent@fabrica-nexus.com", "password": "AnyPassword!"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json()["detail"] == "Credenciales inválidas"


def test_login_inactive_user(client: TestClient, inactive_user: User):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": inactive_user.email, "password": "InactivePassword123!"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_me_success(client: TestClient, test_user: User):
    # First login to obtain valid token
    login_res = client.post(
        "/api/v1/auth/login",
        json={"email": test_user.email, "password": "TestPassword123!"},
    )
    token = login_res.json()["access_token"]

    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == status.HTTP_200_OK
    user_data = response.json()
    assert user_data["email"] == test_user.email
    assert user_data["id"] == test_user.id
    assert user_data["role"] == test_user.role
    assert "hashed_password" not in user_data


def test_get_me_unauthorized_no_token(client: TestClient):
    response = client.get("/api/v1/auth/me")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_me_invalid_token(client: TestClient):
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer invalid.token.payload"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_me_with_refresh_token_rejected(client: TestClient, test_user: User):
    login_res = client.post(
        "/api/v1/auth/login",
        json={"email": test_user.email, "password": "TestPassword123!"},
    )
    refresh_token = login_res.json()["refresh_token"]

    # Attempting to authenticate at /me with a refresh token must be rejected
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {refresh_token}"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_refresh_token_success(client: TestClient, test_user: User):
    login_res = client.post(
        "/api/v1/auth/login",
        json={"email": test_user.email, "password": "TestPassword123!"},
    )
    refresh_token = login_res.json()["refresh_token"]

    refresh_res = client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": refresh_token},
    )
    assert refresh_res.status_code == status.HTTP_200_OK
    data = refresh_res.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_refresh_token_with_invalid_token(client: TestClient):
    response = client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": "completely.fake.token"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_admin_create_user_and_permissions(
    client: TestClient,
    test_admin_user: User,
    test_user: User,
):
    # Login as admin
    admin_login = client.post(
        "/api/v1/auth/login",
        json={"email": test_admin_user.email, "password": "AdminPassword123!"},
    )
    admin_token = admin_login.json()["access_token"]

    # Admin creates new user
    new_user_payload = {
        "email": "newoperator@fabrica-nexus.com",
        "password": "PasswordNew123!",
        "full_name": "New Operator",
        "role": "operator",
        "is_active": True,
    }
    create_res = client.post(
        "/api/v1/users/",
        json=new_user_payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert create_res.status_code == status.HTTP_201_CREATED
    created_data = create_res.json()
    assert created_data["email"] == "newoperator@fabrica-nexus.com"

    # Login as regular operator (not admin) and attempt to create user
    op_login = client.post(
        "/api/v1/auth/login",
        json={"email": test_user.email, "password": "TestPassword123!"},
    )
    op_token = op_login.json()["access_token"]

    forbidden_res = client.post(
        "/api/v1/users/",
        json={"email": "forbidden@fabrica-nexus.com", "password": "Pass!", "role": "operator"},
        headers={"Authorization": f"Bearer {op_token}"},
    )
    assert forbidden_res.status_code == status.HTTP_403_FORBIDDEN
