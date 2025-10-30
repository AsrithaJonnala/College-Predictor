from flask import Flask, request, jsonify
from flask_cors import CORS

# --- MODEL 1: Heuristic (for College List) ---
from predictor_interface import CollegePredictor
import pandas as pd

# --- MODEL 2: Machine Learning (for Specific Prediction) ---
from ml_model import CollegePredictionModel
import joblib # Use joblib to load the .pkl file

# --- 1. Initialize the Flask App ---
app = Flask(__name__)
CORS(app)

# --- 2. Load BOTH Models at Startup ---

# Load MODEL 1 (Heuristic)
print("📂 Loading Heuristic Model (CollegePredictor)...")
try:
    heuristic_predictor = CollegePredictor()
    heuristic_predictor.load_model_and_data()
    print("✅ Heuristic Model is ready.")
except Exception as e:
    print(f"❌ CRITICAL ERROR: Failed to load Heuristic Model: {e}")
    heuristic_predictor = None

# Load MODEL 2 (Machine Learning)
print("📂 Loading ML Model (college_predictor_model.pkl)...")
try:
    # Use the 'load_model' method from your own class
    ml_model = CollegePredictionModel()
    ml_model.load_model('college_predictor_model.pkl') 
    print("✅ ML Model is ready.")
except Exception as e:
    print(f"❌ CRITICAL ERROR: Failed to load ML Model: {e}")
    ml_model = None

# --- 3. API Endpoints for MODEL 1 (Heuristic) ---

@app.route('/api/options', methods=['GET'])
def get_options():
    if heuristic_predictor is None:
        return jsonify({'error': 'Server is not ready, model not loaded.'}), 500
    try:
        categories = heuristic_predictor.unique_values.get('categories', [])
        return jsonify({'categories': categories})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    if heuristic_predictor is None:
        return jsonify({'error': 'Server is not ready, model not loaded.'}), 500
    try:
        # ... (rest of your existing predict function, no changes) ...
        data = request.get_json()
        rank = int(data['rank'])
        category = data['category']
        # ... (rest of the function) ...
        recommendations_df = heuristic_predictor.get_recommendations_by_rank(
            rank=rank, 
            category=category, 
            top_n=20
        )
        results_list = recommendations_df.to_dict('records')
        return jsonify({'predictions': results_list})
        
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


# --- 4. NEW API Endpoints for MODEL 2 (Machine Learning) ---

@app.route('/api/ml-options', methods=['GET'])
def get_ml_options():
    """Returns all the dropdown options for the ML model."""
    if ml_model is None:
        return jsonify({'error': 'ML model is not loaded.'}), 500
    
    try:
        options = {}
        # Get all options from the loaded label encoders
        for key, encoder in ml_model.label_encoders.items():
            options[key] = list(encoder.classes_)
            
        return jsonify(options)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/predict-specific', methods=['POST'])
def predict_specific():
    """Predicts admission for ONE specific college using the ML model."""
    if ml_model is None:
        return jsonify({'error': 'ML model is not loaded.'}), 500
        
    try:
        data = request.get_json()
        
        # This endpoint needs ALL the inputs for the ML model
        prediction = ml_model.get_admission_probability(
            student_rank=int(data['rank']),
            year=int(data['year']),
            round_num=int(data['round']),
            category=data['category'],
            quota=data['quota'],
            gender=data['gender'],
            institute_type=data['institute_type'],
            institute_name=data['institute_name'],
            branch=data['branch'],
            is_pwd=int(data['is_pwd'])
        )
        
        # Return the single prediction dictionary
        return jsonify(prediction)
        
    except Exception as e:
        print(f"ML Prediction Error: {e}")
        return jsonify({'error': f'ML model error: {str(e)}'}), 400

# --- 5. Run the Server ---
if __name__ == '__main__':
    app.run(debug=False, port=5000, host='0.0.0.0')