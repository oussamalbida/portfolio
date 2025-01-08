import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

export const sendEmail = async (formData) => {
  try {
    const response = await emailjs.send(
      "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
      "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "oussamallbida@gmail.com",
      }
    );
    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: "Failed to send message. Please try again." };
  }
};
