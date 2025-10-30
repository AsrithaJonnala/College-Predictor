# College Predictor

A web-based application that predicts the chances of getting admission into various colleges based on your entrance exam rank, category, and gender.  
Built using **Python (Flask)** and integrated with a **Machine Learning model** trained on historical admission data.

---

## 🚀 Features

- Predicts college admission chances based on your input details.  
- Simple and clean web interface.  
- Machine learning model trained with real admission data.  
- Option to analyze performance visually (future enhancement).  
- Database integration (MongoDB/MySQL).  

---

## 🧠 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Flask (Python) |
| **Machine Learning** | scikit-learn, pandas, numpy |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AsrithaJonnala/College-Predictor.git
cd College-Predictor
### 2️⃣ Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate   # for Windows
# or
source venv/bin/activate   # for macOS/Linux
### 3️⃣ Install dependencies
pip install -r requirements.txt
### 4️⃣ Run the Flask application
python app.py

The app will start running on http://127.0.0.1:5000/
