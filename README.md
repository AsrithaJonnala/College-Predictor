# College Predictor

A **full-stack machine learning web application** that helps students find realistic college options based on their **JEE Main rank**.  
This project uses a **dual-model system** — a heuristic algorithm for general college discovery and a machine learning model for specific admission predictions.

---

## 🚀 Features

### 🎯 ML-Powered Specific Predictor
- Uses a **RandomForestRegressor** to predict the *exact admission probability* for a chosen **college**, **branch**, and **category**.
- Provides highly personalized predictions based on historical JoSAA data.

### 🧭 Heuristic College Finder
- Implements a **log10-based heuristic algorithm** to classify colleges as:
  - 🟢 **Safe**
  - 🟡 **Target**
  - 🔴 **Reach**
- Helps students explore a range of realistic college options quickly.

### ⚙️ Dual Model API
- A single **Flask backend (`api.py`)** serves both models:
  - `/predict` → for ML-based predictions  
  - `/recommend` → for heuristic-based recommendations

### 🧹 Data Pipeline
- `cleaner.py` transforms **multi-year raw JoSAA datasets** into a clean, standardized format for model training and analysis.

### 💻 Dynamic Frontend
- Built using **HTML, CSS, and JavaScript (Fetch API)** for seamless API integration.
- Clean and responsive two-page interface:
  - **ML Predictor Page** (specific probability)
  - **Heuristic College Finder Page** (categorized college list)

---

## 🧠 Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Flask, Pandas |
| **Machine Learning** | scikit-learn (RandomForestRegressor, GradientBoostingRegressor, LabelEncoder), joblib |
| **Data Source** | JoSAA Historical Data |
| **Tools** | Python 3.x, VS Code, GitHub |

---

## ⚙️ Setup and Installation

### 1️⃣ Clone the Repository
git clone https://github.com/AsrithaJonnala/College-Predictor.git
cd jee-main-college-predictor

### 2️⃣ Set Up Virtual Environment and Install Dependencies
**For Windows**
python -m venv venv
venv\Scripts\activate
**For macOS/Linux**
python3 -m venv venv
source venv/bin/activate

Then install the dependencies:
pip install -r requirements.txt

### 3️⃣ Prepare the Data

1. **Download Raw JoSAA Datasets** (for example, from Kaggle).  
2. **Place all `.csv` files** into the `data_raw` folder.  
3. **Clean and merge the data** by running:
   python cleaner.py
4. Move the cleaned data from the data_cleaned folder into the main data folder.

### 4️⃣ Train the Machine Learning Model
Train and save the `RandomForestRegressor` model:
python main.py
This will create the college_predictor_model.pkl file in your root directory.

### 5️⃣ Run the Flask Backend
Start the Flask API by running:
python api.py
You’ll see messages confirming that both the ML and heuristic models have been loaded successfully.
The server will start at:

👉 http://127.0.0.1:5000
