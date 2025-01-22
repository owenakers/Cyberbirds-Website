document.getElementById('signup-form').addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form inputs and the button
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const majorInput = document.getElementById('major')
  const submitButton = document.getElementById('signup-button');
  const googleForm = document.getElementById('google-form');

  // Get user input values
  const name = nameInput.value;
  const email = emailInput.value;
  const major = majorInput.value;

  // Set the values of the hidden Google Form inputs
  document.getElementById('name-input').value = name;
  document.getElementById('email-input').value = email;
  document.getElementById('major-input').value = major; 

  // Submit the hidden form to Google Sheets
  googleForm.submit();

  // Clear the input fields
  nameInput.value = '';
  emailInput.value = '';
  majorInput.value = '';

  // Change the button text and styling
  submitButton.textContent = 'Thanks for signing up!';
  submitButton.disabled = true; // Optionally disable the button after submission
  submitButton.classList.add('bg-green-500', 'hover:scale-100');
  submitButton.classList.remove('bg-gradient-to-r', 'from-red-400', 'to-blue-600', 'hover:scale-105');
});

function toggleFAQ(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector("svg");

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    icon.classList.add("rotate-180");
  } else {
    content.classList.add("hidden");
    icon.classList.remove("rotate-180");
  }
}


