from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.core.security import get_password_hash
from app.models.user import User
from app.schemas.user import UserCreate, UserRead

router = APIRouter()


@router.get("/", response_model=List[UserRead], summary="Listar usuarios del sistema")
def list_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> List[User]:
    """Obtiene la lista de usuarios registrados."""
    stmt = select(User).offset(skip).limit(limit)
    users = db.execute(stmt).scalars().all()
    return list(users)


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED, summary="Crear nuevo usuario")
def create_user(
    user_in: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> User:
    """Crea un nuevo usuario en la base de datos (requiere autenticación previa)."""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permisos insuficientes para crear usuarios",
        )

    stmt = select(User).where(User.email == user_in.email.strip().lower())
    existing = db.execute(stmt).scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe un usuario con este correo electrónico",
        )

    user = User(
        email=user_in.email.strip().lower(),
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=user_in.role,
        is_active=user_in.is_active,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
