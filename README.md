# College Predictor

A full-stack web application that helps students find realistic college options based on their JEE Main rank. This project uses a dual-model system: a heuristic algorithm for general college list discovery and a machine learning model for specific admission predictions.

📸 Features
Specific ML Predictor (Home Page): Uses a trained RandomForestRegressor to predict the exact admission probability for a single, specific college, branch, and category.

Heuristic College Finder (Secondary Page): Uses a log10-based heuristic algorithm to generate a complete list of "Safe," "Target," and "Reach" colleges based on historical data.

Dual Model API: A single Flask backend (api.py) serves both the heuristic and ML models via different endpoints.

Data Pipeline: Includes a cleaner.py script to transform raw, multi-year JoSAA data into a clean, unified format required by the models.

Dynamic Frontend: A clean, two-page UI built with vanilla HTML, CSS, and JavaScript that fetches data from the backend and displays results dynamically.

ML-Powered Specific Predictor (Home Page) ``

Heuristic College List Finder ``

Tech Stack

Backend: Flask, Pandas
Machine Learning: scikit-learn (RandomForestRegressor, GradientBoostingRegressor, LabelEncoder), joblib
Frontend: HTML5, CSS3, JavaScript (ES6+ Fetch API)

📁 Project Structure
jee-main-college-predictor/
│
├── data/
│   └── (All CLEANED CSV files for the app)
├── data_raw/
│   └── (All RAW Kaggle CSV files)
├── data_cleaned/
│   └── (Output folder for cleaner.py)
│
├── frontend/
│   ├── index.html            (ML Predictor Page)
│   ├── predict_specific.js   (JS for ML Page)
│   ├── college_list.html     (Heuristic List Page)
│   ├── script.js             (JS for Heuristic Page)
│   └── style.css
│
├── api.py                    (Main Flask Server)
├── cleaner.py                (Data Cleaning/Transformation Script)
├── main.py                   (Script to TRAIN the ML model)
├── ml_model.py               (ML Model Class)
├── predictor_interface.py    (Heuristic Model Class)
│
├── college_predictor_model.pkl (The saved, trained ML model)
├── requirements.txt
└── README.md
🚀 How to Run This Project
Follow these steps to set up and run the project locally.

1. Clone the Repository
Bash

git clone [https://github.com/thesaiprasadrao/jee-main-college-predictor.git](https://github.com/thesaiprasadrao/jee-main-college-predictor.git)
cd jee-main-college-predictor
2. Set Up Virtual Environment & Install Dependencies
Bash

# Create a virtual environment
python -m venv venv

# Activate it (Windows)
.\venv\Scripts\activate
# (macOS/Linux)
# source venv/bin/activate

# Install all required libraries
pip install -r requirements.txt
3. Get and Clean the Data
This project requires raw historical data from JoSAA.

Download Data: Download the JoSAA datasets (e.g., from this Kaggle link)

Place Data: Place all the raw .csv files into the data_raw folder.

Run Cleaner: Run the cleaner.py script to transform the data.

Bash

python cleaner.py
Move Data: Move all the new, clean .csv files from the data_cleaned folder into the main data folder.

4. Train the ML Model
You must train the RandomForestRegressor and save it to a file.

Bash

# This will run the training and comparison
python main.py
This will create the college_predictor_model.pkl file in your root directory.

5. Run the Backend Server
Now you can start the Flask API.

Bash

python api.py
The server will start on http://127.0.0.1:5000. You will see it loading both the Heuristic and ML models.

6. Open the Frontend
You don't need a separate web server for the frontend.

Navigate to the frontend folder.

Open the index.html file directly in your web browser.

The application is now fully functional and will communicate with your running Flask server.
