// Employee Onboarding Form Handler

const form = document.getElementById('onboardingForm');
const successMessage = document.getElementById('successMessage');

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(form);
    const employeeData = Object.fromEntries(formData);
    
    // Validate required fields
    if (!validateForm(employeeData)) {
        return;
    }
    
    // Prepare data object
    const employee = {
        // Personal Information
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        phone: employeeData.phone,
        dateOfBirth: employeeData.dateOfBirth,
        gender: employeeData.gender,
        
        // Employment Information
        employeeId: employeeData.employeeId,
        jobTitle: employeeData.jobTitle,
        department: employeeData.department,
        manager: employeeData.manager,
        startDate: employeeData.startDate,
        employmentType: employeeData.employmentType,
        
        // Contact Information
        address: employeeData.address,
        city: employeeData.city,
        state: employeeData.state,
        zipCode: employeeData.zipCode,
        country: employeeData.country,
        
        // Emergency Contact
        emergencyContactName: employeeData.emergencyContactName,
        emergencyContactRelation: employeeData.emergencyContactRelation,
        emergencyContactPhone: employeeData.emergencyContactPhone,
        
        // Additional Information
        notes: employeeData.notes,
        
        // Metadata
        submittedAt: new Date().toISOString(),
        status: 'pending'
    };
    
    // Save to localStorage (for demo purposes)
    saveEmployeeData(employee);
    
    // Log data (for development purposes)
    console.log('Employee Data Submitted:', employee);
    
    // Send to server (uncomment and modify endpoint as needed)
    // sendToServer(employee);
    
    // Show success message
    showSuccessMessage();
});

/**
 * Validate form data
 * @param {Object} data - Form data object
 * @returns {boolean} - True if valid, false otherwise
 */
function validateForm(data) {
    const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'employeeId',
        'jobTitle',
        'department',
        'startDate',
        'employmentType',
        'agreeTerms'
    ];
    
    for (let field of requiredFields) {
        if (!data[field]) {
            alert(`Please fill in all required fields. Missing: ${field}`);
            return false;
        }
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Save employee data to localStorage
 * @param {Object} employee - Employee data object
 */
function saveEmployeeData(employee) {
    try {
        // Get existing employees
        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        
        // Add new employee
        employees.push(employee);
        
        // Save back to localStorage
        localStorage.setItem('employees', JSON.stringify(employees));
        
        console.log(`Employee ${employee.firstName} ${employee.lastName} saved successfully.`);
        return true;
    } catch (error) {
        console.error('Error saving employee data:', error);
        alert('An error occurred while saving the employee data.');
        return false;
    }
}

/**
 * Show success message
 */
function showSuccessMessage() {
    successMessage.style.display = 'flex';
    
    // Optional: Auto-hide after 5 seconds
    // setTimeout(() => {
    //     successMessage.style.display = 'none';
    // }, 5000);
}

/**
 * Send employee data to server
 * Uncomment and modify endpoint as needed
 * @param {Object} employee - Employee data object
 */
// function sendToServer(employee) {
//     fetch('/api/employees', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(employee)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         showSuccessMessage();
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('An error occurred while submitting the form.');
//     });
// }

/**
 * Initialize form with any saved data (if needed)
 */
function initializeForm() {
    // Auto-fill functionality could go here
    // For example, if you want to pre-fill certain fields
    console.log('Form initialized');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeForm);

// Export function to retrieve stored employees (for admin purposes)
window.getAllEmployees = function() {
    return JSON.parse(localStorage.getItem('employees')) || [];
};

// Export function to clear stored data (for testing purposes)
window.clearAllEmployeeData = function() {
    localStorage.removeItem('employees');
    console.log('All employee data cleared.');
};