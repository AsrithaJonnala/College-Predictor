// The base URL of your Python API
// It's 127.0.0.1 (localhost) and port 5000, as defined in api.py
const API_URL = 'http://127.0.0.1:5000';

// Get elements from the DOM
const form = document.getElementById('predictor-form');
const categorySelect = document.getElementById('category');
const resultsList = document.getElementById('results-list');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const submitButton = document.getElementById('submit-button');

/**
 * Helper function to populate a <select> dropdown
 */
function populateDropdown(selectElement, optionsList, defaultText) {
    selectElement.innerHTML = `<option value="">${defaultText}</option>`;
    optionsList.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

/**
 * Fetches the dropdown options from the API
 */
async function loadDropdownOptions() {
    try {
        const response = await fetch(`${API_URL}/api/options`);
        if (!response.ok) {
            throw new Error('Failed to load form options from the server.');
        }
        const options = await response.json();

        // This key 'categories' MUST match the JSON from api.py
        populateDropdown(categorySelect, options.categories, 'Select Your Category');

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
    resultsList.innerHTML = '';
    errorMessage.classList.add('hidden');
    loadingMessage.classList.remove('hidden');
    submitButton.disabled = true;

    // Get form data
    const formData = {
        rank: parseInt(document.getElementById('rank').value, 10),
        category: categorySelect.value
    };

    try {
        // Send data to the /api/predict endpoint
        const response = await fetch(`${API_URL}/api/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            // Display error message from the API
            throw new Error(data.error || 'Prediction failed.');
        }
        
        displayResults(data.predictions);

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
 * Displays the prediction results in the DOM
 */
function displayResults(predictions) {
    resultsList.innerHTML = ''; // Clear previous results

    if (!predictions || predictions.length === 0) {
        resultsList.innerHTML = '<p>No suitable recommendations found for your rank and category.</p>';
        return;
    }

    // Loop over the list of colleges returned from the API
    predictions.forEach(college => {
        const item = document.createElement('div');
        item.className = 'result-item';
        
        // These keys (probability, institute_name, branch, etc.)
        // come directly from your pandas DataFrame columns.
        item.innerHTML = `
            <div class="college-name">${college.institute_name}</div>
            <div class="college-branch">${college.branch}</div>
            <div class="college-stats">
                Chance: <strong>${college.probability.toFixed(1)}%</strong> | 
                Cutoff Range: ${college.opening_rank.toLocaleString()
                } - ${college.closing_rank.toLocaleString()
                } | 
                Year: ${college.year}
            </div>
        `;
        resultsList.appendChild(item);
    });
}

// Load the dropdown options when the page loads
document.addEventListener('DOMContentLoaded', loadDropdownOptions);