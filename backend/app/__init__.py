from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__, static_url_path='/static')
    #app = Flask(__name__)
    CORS(app)  # Enable CORS for frontend communication

    from .routes import bp
    app.register_blueprint(bp)

    return app
