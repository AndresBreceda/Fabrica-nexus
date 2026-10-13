import sys
from pathlib import Path

# Add backend directory to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(BASE_DIR / "backend"))

from sqlalchemy import select
from app.core.config import settings
from app.core.security import get_password_hash
from app.db.session import SessionLocal
from app.models.user import User


def seed_data() -> None:
    db = SessionLocal()
    try:
        print(f"Checking for initial superuser: {settings.FIRST_SUPERUSER_EMAIL}...")
        stmt = select(User).where(User.email == settings.FIRST_SUPERUSER_EMAIL.strip().lower())
        user = db.execute(stmt).scalar_one_or_none()

        if user:
            print(f"Superuser '{settings.FIRST_SUPERUSER_EMAIL}' already exists. Skipping creation.")
        else:
            admin_user = User(
                email=settings.FIRST_SUPERUSER_EMAIL.strip().lower(),
                hashed_password=get_password_hash(settings.FIRST_SUPERUSER_PASSWORD),
                full_name="Fabrica-nexus Administrator",
                role=settings.FIRST_SUPERUSER_ROLE,
                is_active=True,
            )
            db.add(admin_user)
            db.commit()
            print(f"Superuser '{settings.FIRST_SUPERUSER_EMAIL}' successfully created.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding initial data: {e}", file=sys.stderr)
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_data()
