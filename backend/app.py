from flask import Flask
from routes.signup import signup_bp  # Import the Blueprint

app = Flask(__name__)
app.register_blueprint(signup_bp, url_prefix="/api")  # Prefix all routes with /api

if __name__ == "__main__":
    app.run(debug=True)
