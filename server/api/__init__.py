from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.debug = True
    CORS(app)
    app.config.from_object('config.Config')
    db.init_app(app)
    
    with app.app_context():
        from .main import main_blueprint
        app.register_blueprint(main_blueprint)
    
        db.create_all()

    return app
