const adLink1 = "https://phoampor.top/4/9217779"; // First ad link
const adLink2 = "https://phoampor.top/4/9217777"; // Second ad link
const secretKey = "Tesh01"; // Your secret key

let selectedRegion = "";
let keyUnlocked = false;

function enterDashboard() {
  window.open(adLink1, "_blank");
  document.getElementById("entryScreen").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
}

function selectRegion(region) {
  selectedRegion = region;

  // Remove 'selected' class from all buttons
  const regionButtons = document.querySelectorAll(".region-buttons .region-button");
  regionButtons.forEach(button => {
    button.classList.remove("selected");
  });

  // Add 'selected' class to the clicked button
  const selectedButton = document.querySelector(`.region-buttons button[onclick="selectRegion('${region}')"]`);
  selectedButton.classList.add("selected");

  alert("Region selected: " + region.toUpperCase());
}

function getSecret() {
  window.open(adLink2, "_blank");
  setTimeout(() => {
    keyUnlocked = true;
    document.getElementById("sendBtn").classList.remove("hidden");
    
  }, 6000);
}

function sendLikes() {
  const uid = document.getElementById("uid").value.trim();
  const status = document.getElementById("status");
  const error = document.getElementById("error");
  const loadingSpinner = document.getElementById("loadingSpinner");

  status.classList.add("hidden");
  error.classList.add("hidden");

  // Show loading spinner
  loadingSpinner.classList.remove("hidden");

  if (!selectedRegion) {
    alert("Please select a region.");
    loadingSpinner.classList.add("hidden");
    return;
  }

  if (!uid || isNaN(uid)) {
    alert("Please enter a valid UID.");
    loadingSpinner.classList.add("hidden");
    return;
  }

  if (!keyUnlocked) {
    alert("You must click Get Secret Key first.");
    loadingSpinner.classList.add("hidden");
    return;
  }

  // API URL to send request for likes
  const apiUrl = `/send-likes?region=${selectedRegion}&uid=${uid}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      // Hide loading spinner
      loadingSpinner.classList.add("hidden");

      if (data.status === 3) {
        error.textContent = `❌ ${data.message}`;
        error.classList.remove("hidden");
      } else if (data.status === 1) {
        const res = data.response;
        status.innerHTML = `
✅ Likes sent successfully!<br><br>
👤 UID: <b>${res.UID}</b><br>
📛 Nickname: <b>${res.PlayerNickname}</b><br>
🎮 Level: <b>${res.PlayerLevel}</b><br>
👍 Likes Given: <b>${res.LikesGivenByAPI}</b><br>
⬅️ Likes Before: <b>${res.LikesbeforeCommand}</b><br>
➡️ Likes After: <b>${res.LikesafterCommand}</b><br>

        `;
        status.classList.remove("hidden");
      } else {
        error.textContent = `❌ Unexpected error: ${data.message}`;
        error.classList.remove("hidden");
      }
    })
    .catch(err => {
      // Hide loading spinner
      loadingSpinner.classList.add("hidden");

      error.textContent = "❌ Error sending likes. Please try again.";
      error.classList.remove("hidden");
      console.error("Fetch error:", err);
    });
}



  
  
