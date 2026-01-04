const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  console.log("Form submitted:", { name, email, message });
  alert("Thank you for your message! We will get back to you soon.");

  // Reset form
  form.reset();
});
