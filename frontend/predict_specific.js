// The base URL of your Python API
const API_URL = 'http://127.0.0.1:5000';

// Get elements from the DOM
const form = document.getElementById('predictor-form-ml');
const resultsList = document.getElementById('results-list');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const submitButton = document.getElementById('submit-button');
const mlResultContainer = document.getElementById('ml-result');

// Get all the select elements
const selects = {
    institute_type: document.getElementById('institute_type'),
    quota: document.getElementById('quota'),
    category: document.getElementById('category'),
    gender: document.getElementById('gender'),
    institute_name: document.getElementById('institute_name'),
    branch: document.getElementById('branch')
};

/**
 * Helper function to populate a <select> dropdown
 * @param {HTMLElement} selectElement - The <select> element to populate
 * @param {string[]} optionsList - An array of strings for the options
 * @param {string} defaultText - The placeholder text (e.g., "Select Category")
 */
function populateDropdown(selectElement, optionsList, defaultText) {
    // Sort the list alphabetically for user-friendliness
    optionsList.sort();
    
    selectElement.innerHTML = `<option value="">-- ${defaultText} --</option>`;
    optionsList.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

/**
 * Fetches all dropdown options from the /api/ml-options endpoint
 */
async function loadDropdownOptions() {
    try {
        const response = await fetch(`${API_URL}/api/ml-options`);
        if (!response.ok) {
            throw new Error('Failed to load ML form options from the server.');
        }
        const options = await response.json();

        // Populate all dropdowns based on the keys from the API
        populateDropdown(selects.institute_type, options.institute_type, 'Select Institute Type');
        populateDropdown(selects.quota, options.quota, 'Select Quota');
        populateDropdown(selects.category, options.category, 'Select Category');
        populateDropdown(selects.gender, options.gender, 'Select Gender');
        populateDropdown(selects.institute_name, options.institute_name, 'Select Institute Name');
        populateDropdown(selects.branch, options.branch, 'Select Branch');

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
}

/**
 * Handles the form submission
 */
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Stop the default form submission

    // Clear previous results and errors
    mlResultContainer.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loadingMessage.classList.remove('hidden');
    submitButton.disabled = true;

    // Get all 10 form values
    const formData = {
        rank: parseInt(document.getElementById('rank').value, 10),
        year: parseInt(document.getElementById('year').value, 10),
        round: parseInt(document.getElementById('round').value, 10),
        is_pwd: parseInt(document.getElementById('is_pwd').value, 10),
        institute_type: selects.institute_type.value,
        quota: selects.quota.value,
        category: selects.category.value,
        gender: selects.gender.value,
        institute_name: selects.institute_name.value,
        branch: selects.branch.value
    };

    try {
        // Send data to the NEW /api/predict-specific endpoint
        const response = await fetch(`${API_URL}/api/predict-specific`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Prediction failed.');
        }
        
        displayMlResult(data);

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    } finally {
        // Hide loading message and re-enable button
        loadingMessage.classList.add('hidden');
        submitButton.disabled = false;
    }
});

/**
 * Displays the single ML prediction result
 * @param {object} result - The JSON object from the API
 */
function displayMlResult(result) {
    const statusEl = document.getElementById('result-status');
    const detailsEl = document.getElementById('result-details');
    const recEl = document.getElementById('result-recommendation');

    // Example result: {"status": "High Chance", "probability": 85.0, ...}
    statusEl.textContent = `Status: ${result.status}`;
    detailsEl.textContent = `Your Rank: ${result.student_rank.toLocaleString()} | Predicted Cutoff: ${result.predicted_cutoff.toLocaleString()} | Admission Probability: ${result.admission_probability}%`;
    recEl.textContent = `Recommendation: ${result.recommendation}`;
    
    // Style the status based on the result
    if (result.status === "High Chance") {
        statusEl.style.color = '#27ae60'; // Green
    } else if (result.status === "Moderate Chance") {
        statusEl.style.color = '#f39c12'; // Orange
    } else {
        statusEl.style.color = '#e74c3c'; // Red
    }

    mlResultContainer.classList.remove('hidden');
}

// Load the dropdown options when the page loads
document.addEventListener('DOMContentLoaded', loadDropdownOptions);