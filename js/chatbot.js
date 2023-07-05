function sendMessage() {
  var userInput = document.getElementById("user-input");
  var userMessage = userInput.value.trim();
  if (userMessage !== "") {
    appendMessage(userMessage, "user");
    userInput.value = "";
    getBotResponse(userMessage);
  }
}

function getBotResponse(userMessage) {
  fetch("http://localhost:5000/get?msg=" + encodeURIComponent(userMessage))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var botResponse = data.response;
      appendMessage(botResponse, "bot");
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

function appendMessage(message, sender) {
  var chatMessages = document.getElementById("chat-messages");
  var messageContainer = document.createElement("div");
  messageContainer.classList.add("chat-message");
  messageContainer.classList.add(sender + "-message");
  var messageText = document.createElement("span");
  messageText.classList.add("message-text");
  messageText.innerText = message;
  messageContainer.appendChild(messageText);
  chatMessages.appendChild(messageContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add event listener to send message on Enter key press
var userInput = document.getElementById("user-input");
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});
