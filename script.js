function sendAlert() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`; // ✅ Use backticks for template literal

    const alertMessage = `This is an emergency! I need help. Track me here: ${locationLink}`; // ✅ Use backticks

    const contactsInput = document.getElementById("contacts").value;
    const contacts = contactsInput.split(",").map(num => num.trim());

    let output = "";
    contacts.forEach(number => {
      const encodedMessage = encodeURIComponent(alertMessage);
      const whatsappLink = `https://wa.me/${number.replace('+', '')}?text=${encodedMessage}`; // ✅ Use backticks
      output += `<p><a href="${whatsappLink}" target="_blank">Send to ${number}</a></p>`; // ✅ Wrap in backticks
    });

    document.getElementById("output").innerHTML = `
      <p><strong>Location:</strong> <a href="${locationLink}" target="_blank">${locationLink}</a></p>
      ${output}
    `;
  }

  function error() {
    alert("Unable to retrieve your location.");
  }
}
