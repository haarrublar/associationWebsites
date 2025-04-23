import os
import gspread
from typing import List

def get_credentials() -> dict:
    
    private_key = os.getenv("PRIVATE_KEY")
    if not private_key:
        raise ValueError("PRIVATE_KEY environment variable is not set.")
    private_key = private_key.replace("\\n", "\n")  # Handle the newline characters correctly
    
    return {
        "type": os.getenv("TYPE"),
        "project_id": os.getenv("PROJECT_ID"),
        "private_key_id": os.getenv("PRIVATE_KEY_ID"),
        "private_key": os.getenv("PRIVATE_KEY").replace("\\n", "\n"),  # fix for newline chars
        "client_email": os.getenv("CLIENT_EMAIL"),
        "client_id": os.getenv("CLIENT_ID"),
        "auth_uri": os.getenv("AUTH_URI"),
        "token_uri": os.getenv("TOKEN_URI"),
        "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
        "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL"),
        "universe_domain": os.getenv("UNIVERSE_DOMAIN")
    }

def initialize_gspread() -> gspread.client.Client:
    return gspread.service_account_from_dict(get_credentials())

def get_all_rows(doc_name: str, sheet_name: str = None) -> List[dict]:
    client = initialize_gspread()
    sh = client.open(doc_name)
    worksheet = sh.worksheet(sheet_name) if sheet_name else sh.get_worksheet(0)
    return worksheet.get_all_records()