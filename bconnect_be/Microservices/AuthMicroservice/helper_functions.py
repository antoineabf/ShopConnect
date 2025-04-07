import jwt
import datetime

import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import dotenv_values
config = dotenv_values(".env")

SECRET_KEY = "b'|\xe7\xbfU3`\xc4\xec\xa7\xa9zf:}\xb5\xc7\xb9\x139^3@Dv'"

from .permissions import roles

def create_token(user_id, delay=[4], isReset=False, role = 'buyer'):
    if role not in roles: raise "Error: invalid role"
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(*delay),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id,
        'reset': isReset
    }
    if not isReset: payload['role'] = role
    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm='HS256'
    )

def extract_auth_token(authenticated_request):
    auth_header = authenticated_request.headers.get('Authorization')
    if auth_header:
        return auth_header.split(" ")[1]
    else:
        return None


def decode_token(token):
    payload = jwt.decode(token, SECRET_KEY, 'HS256')
    return payload
    # return (payload['sub'], payload['exp'], payload['reset'])

def send_email(email_to, subject, template, vars={}):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = config.get("email_from")
    msg['To'] = email_to
    try:    
        with open(f"./templates/{template}", 'r') as file:
            html = ''.join(file.read().split('\n'))
    except:
        return False, 500
    try:
        for var, value in vars.items():
            html = html.replace(var, value)
    except Exception as e:
        return False, 400
    
    part1 = MIMEText(html, 'html')
    msg.attach(part1)
    
    try:
        with smtplib.SMTP("smtp-relay.brevo.com", 587) as s:
            s.ehlo()
            s.starttls()
            s.login(config.get("email_from"), config.get("password_from"))
            s.sendmail(from_addr=config.get("email_from"), to_addrs=email_to, msg=msg.as_string())

        return True, None
    except Exception as e:
        False, 500
