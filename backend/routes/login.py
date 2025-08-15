# routes/login.py
from flask import Blueprint, request, jsonify
from supabase import create_client, Client
from werkzeug.security import check_password_hash
import os
import jwt
import datetime
from dotenv import load_dotenv

load_dotenv()

login_bp = Blueprint("login", __name__)

# Supabase setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
SECRET_KEY = os.getenv("SECRET_KEY")

@login_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    try:
        #Get the user from our `users` table
        res = supabase.table("users").select("*").eq("email", email).execute()
        if not res.data:
            return jsonify({"error": "Invalid credentials"}), 401

        user = res.data[0]

        #Verify password hash
        if not check_password_hash(user["password_hash"], password):
            return jsonify({"error": "Invalid credentials"}), 401

        token = jwt.encode(
            {
                "user_id": user["id"],
                "email": user["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        },
        SECRET_KEY,
        algorithm="HS256"
        )

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "email": user["email"],
                "full_name": user["full_name"],
                "role": user["role"],
                "token":token
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500