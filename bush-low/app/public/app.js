// Your application code

// This app evaluates if user's browser support ServiceWorker or not, and change message on the page.
(() => {
  var $msg = document.getElementById("msg");
  var $guide = document.getElementById("guide");
  if (navigator.serviceWorker) {
    $msg.innerText = "This browser supports ServiceWorker 🎉";
    $guide.innerText = "Turn off your internet and try reload this page 💁";
  } else {
    $msg.innerText = "This browser does not support ServiceWorker 😢";
  }
})();
