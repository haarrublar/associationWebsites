from celery import shared_task
from .utils.user_sync import sync_users_from_sheet

@shared_task
def sync_users_from_sheet_task():
    return sync_users_from_sheet()