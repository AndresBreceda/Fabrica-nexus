from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, RefreshTokenRequest, Token
from app.schemas.user import UserRead
from app.services.auth_service import (
    authenticate_user,
    create_user_tokens,
    refresh_token_session,
)

router = APIRouter()


@router.post("/login", response_model=Token, summary="Iniciar sesión y obtener tokens JWT")
def login(login_data: LoginRequest, db: Session = Depends(get_db)) -> Token:
    """Valida credenciales de usuario y retorna tokens de acceso y renovación."""
    user = authenticate_user(db, email=login_data.email, password=login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return create_user_tokens(user)


@router.post("/refresh", response_model=Token, summary="Renovar token de acceso")
def refresh(refresh_data: RefreshTokenRequest, db: Session = Depends(get_db)) -> Token:
    """Genera un nuevo par de tokens a partir de un refresh token válido."""
    return refresh_token_session(db, refresh_token=refresh_data.refresh_token)


@router.get("/me", response_model=UserRead, summary="Obtener usuario autenticado actual")
def get_me(current_user: User = Depends(get_current_user)) -> User:
    """Retorna los datos del usuario actualmente autenticado."""
    return current_user
