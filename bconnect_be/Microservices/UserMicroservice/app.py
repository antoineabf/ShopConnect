from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from .db_config import DB_CONFIG

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_CONFIG
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)

from .services import editBio_service, getProfilePic_service, getUserInfo_service, createUserInfo_service, uploadProfilePic_service, upload_id_service, request_make_seller_service, get_seller_requests_service, get_identification_service, get_seller_terms_service, agree_seller_terms_service, dismiss_request_service


@app.route('/getUserInfo/<int:user_id>', methods=['GET'])
def getUserInfo(user_id):
    return getUserInfo_service.getUserInfo(user_id)

@app.route('/getProfilePic/<int:user_id>', methods=['GET'])
def getProfilePic(user_id):
    return getProfilePic_service.getProfilePic(user_id)
       
   
@app.route('/createUserInfo', methods=['POST'])
def createUserInfo():
    return createUserInfo_service.createUserInfo(db)


@app.route('/editBio', methods=['POST'])
def editBioDesc():
    return editBio_service.editBio(db)


@app.route('/uploadProfilePic', methods=['POST'])
def uploadProfilePic():
    return uploadProfilePic_service.uploadProfilePic(db)

@app.route('/uploadID', methods=['POST'])
def uploadID():
    return upload_id_service.uploadID(db)

@app.route('/request-make-seller', methods=['POST'])
def request_make_seller():
    return request_make_seller_service.request_make_seller(db)

@app.route('/dismiss-request/<user_id>', methods=['POST'])
def dismiss_request(user_id):
    return dismiss_request_service.dismiss_request(user_id, db)

@app.route('/get_identification/<user_id>', methods=['GET'])
def get_identification(user_id):
    return get_identification_service.get_identification(user_id)

@app.route('/get_seller_requests', methods=['GET'])
def get_seller_requests():
    return get_seller_requests_service.get_seller_requests()

@app.route('/seller_terms', methods=['GET'])
def get_seller_terms():
    return get_seller_terms_service.get_seller_terms()

@app.route('/seller_terms', methods=['POST'])
def agree_seller_terms():
    return agree_seller_terms_service.agree_seller_terms(db)

if __name__ == "__main__":
    app.run(port=8082)