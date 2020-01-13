// Connection
const socket = io.connect(window.location.origin);

// Get the user name
const name = prompt("Please enter your name");

// Select DOM elements
const message = document.querySelector("#message"),
  button = document.querySelector("#send"),
  feedback = document.querySelector("#feedback"),
  output = document.querySelector("#output");

// Event Listener for the button
button.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    name: name
  });
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", {
    name: name
  });
});

// Listen for event
socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><span>${data.name}</span><br />${data.message}</p>`;
});

socket.on("typing", data => {
  feedback.innerHTML = `<p>${data.name} is typing...</p>`;
});
