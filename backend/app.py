from flask import Flask
from routes.signup import signup_bp  # Import the Blueprint
from routes.login import login_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(signup_bp, url_prefix="/api")  # Prefix all routes with /api
app.register_blueprint(login_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
