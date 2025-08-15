from flask import Blueprint, request, jsonify
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash

load_dotenv()

signup_bp = Blueprint("signup", __name__)

# Supabase setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@signup_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    full_name = data.get("full_name")
    password = data.get("password")  # Placeholder, should be hashed
    role = data.get("role")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    try:
        auth_res = supabase.auth.admin.create_user({
            "email": email,
            "password": password,
            "email_confirm": True
        })

        if not auth_res.user:
            return jsonify({"error": "Failed to create user"}), 400

        user_id = auth_res.user.id
        password_hash = generate_password_hash(password)
        
        supabase.table("users").insert({
            "id": user_id,
            "email": email,
            "full_name": full_name,
            "password_hash": password_hash,
            "role": role
        }).execute()

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500