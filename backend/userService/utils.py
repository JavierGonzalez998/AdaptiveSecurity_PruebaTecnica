import bcrypt
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

def encrypt_password(password:str)->str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(password:str, hashed:str)->bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def get_user_id_from_request(request):
    auth = JWTAuthentication()
    header = auth.get_header(request)
    raw_token = auth.get_raw_token(header)

    if raw_token is None:
        return {"error": "No token provided"}
    try:
        validated_token = auth.get_validated_token(raw_token)
        payload = validated_token.payload
        return payload['user_id']
    except TokenError as e:
        return {"error": str(e)}
    except InvalidToken as e:
        return {"error": str(e)}