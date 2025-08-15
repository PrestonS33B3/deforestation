from flask import Blueprint, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image

analyze_bp = Blueprint("analyze", __name__)
model = tf.keras.models.load_model("deforestationModel.h5")

def preprocess_image(image_bytes):
    from io import BytesIO
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))  # or the size your model expects
    img_array = np.array(img) / 255.0  # normalize to [0,1]
    img_array = np.expand_dims(img_array, axis=0)  # add batch dimension
    return img_array


@analyze_bp.route("/analyze", methods=["POST"])
def analyze_image():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    image_bytes = file.read()
    img_tensor = preprocess_image(image_bytes)

    prediction = model.predict(img_tensor)[0][0]  # assuming binary classification
    probability = float(prediction) * 100

    return jsonify({
        "deforestation_probability": probability,
    })
