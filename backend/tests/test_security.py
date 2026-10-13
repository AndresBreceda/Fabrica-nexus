from datetime import timedelta
import pytest
import jwt

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_password_hash,
    verify_password,
)


def test_password_hashing():
    password = "SuperSecretPassword123!"
    hashed = get_password_hash(password)

    assert hashed != password
    assert verify_password(password, hashed) is True
    assert verify_password("WrongPassword123!", hashed) is False


def test_access_token_creation_and_decoding():
    subject = 42
    token = create_access_token(subject=subject)
    payload = decode_token(token)

    assert payload["sub"] == "42"
    assert payload["type"] == "access"
    assert "exp" in payload


def test_refresh_token_creation_and_decoding():
    subject = 100
    token = create_refresh_token(subject=subject)
    payload = decode_token(token)

    assert payload["sub"] == "100"
    assert payload["type"] == "refresh"
    assert "exp" in payload


def test_token_expiration():
    subject = "user1"
    # Token expired 1 minute ago
    expired_token = create_access_token(
        subject=subject,
        expires_delta=timedelta(seconds=-60),
    )

    with pytest.raises(jwt.ExpiredSignatureError):
        decode_token(expired_token)
