import secrets
from django.utils import timezone
from backend.models import SurveyRespondent, EncryptedUserSecret
from .services import get_all_rows
from datetime import timedelta

def sync_users_from_sheet():
    """Sync users from Google Sheets with auto-generated passwords."""
    try:
        rows = get_all_rows("test")  
        existing_emails = set(SurveyRespondent.objects.values_list('email', flat=True))

        for row in rows:
            email = row.get('email')
            if not email or email in existing_emails:
                print(f"⏩ Skipped: {email}")
                continue

            # Auto-generate a secure password (not stored in sheet)
            password = secrets.token_urlsafe(12)  # 16-char alphanumeric
            
            user = SurveyRespondent.objects.create(
                email=email,
                organization=row.get('organization', ''),
                name=row.get('name', ''),
                last_name=row.get('last_name', ''),
                national_id=row.get('national_id', ''),
                phone_number=row.get('phone_number', ''),
                country=row.get('country', ''),
                department=row.get('department', ''),
                municipality=row.get('municipality', ''),
                city=row.get('city', ''),
                geolocalization=row.get('geolocalization', ''),
                geolocalization_coordinate=row.get('geolocalization_coordinate', ''),
                password=EncryptedUserSecret.encrypt_password(password),  # Auto-generated here
            )

            EncryptedUserSecret.objects.create(
                survey_respondent=user,
                encrypted_password=EncryptedUserSecret.encrypt_password(password),
                expires_at=timezone.now() + timedelta(days=30)
            )
            
            print(f"✅ Created user: {email}")  # Don't log the password!
            
        return "Sync completed successfully."  
    except Exception as e:
        print(f"❌ Sync failed: {e}")  
        return f"Sync failed: {e}"



def get_decrypted_password(user):
    """Decrypt a user's password."""
    try:
        user_secret = EncryptedUserSecret.objects.get(user=user)
        return EncryptedUserSecret.decrypt_password(user_secret.encrypted_password)
    except EncryptedUserSecret.DoesNotExist:
        return None

