from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)  # ← Autorise les requêtes cross-origin (depuis Angular)

model = load_model('model_CNN_AOI.keras')

def preprocess_image(image_file):
    file_bytes = np.frombuffer(image_file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (224, 224))
    img = cv2.GaussianBlur(img, (5, 5), 0)
    _, img = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    img = img / 255.0
    img = np.expand_dims(img, axis=-1)
    img = np.expand_dims(img, axis=0)
    return img

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    img = preprocess_image(request.files['file'])
    prediction = model.predict(img)[0][0]
    result = 'OK' if prediction < 0.5 else 'NOTOK'
    confidence = (1 - prediction if result == 'NOTOK' else prediction) * 100
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
