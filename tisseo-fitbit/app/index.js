import * as messaging from "messaging";
import { TisseoUI } from "./ui.js";

let ui = new TisseoUI();

ui.updateUI("disconnected");

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  ui.updateUI("loading");
  messaging.peerSocket.send("Hi!");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  ui.updateUI("loaded", evt.data);
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  ui.updateUI("error");
}
