import { getUrlParameter } from './fetch.stream.js';
import './loglevel.min.js';

var Logger = window.log;
/**
 *
 * @param {number} n
 * @returns
 */
function generateRandomString(n) {
  var randomString = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < n; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString;
}
/**
 *
 * @param {Location} location
 * @param {string} rtmpForward
 * @returns
 */
function getWebSocketURL(location, rtmpForward) {
  var appName = location.pathname.substring(1, location.pathname.indexOf("/", 1) + 1);
  var path = location.hostname + ":" + location.port + "/" + appName + "websocket";
  if (typeof rtmpForward != "undefined") {
    path += "?rtmpForward=" + rtmpForward;
  }
  var websocketURL = "ws://" + path;
  if (location.protocol.startsWith("https")) {
    websocketURL = "wss://" + path;
  }
  return websocketURL;
}
/**
 *
 * @param {Location} location
 * @param {string} id
 * @param {number} port
 * @returns
 */
function getSrtURL(location, id, port) {
  var appName = location.pathname.substring(1, location.pathname.indexOf("/", 1) + 1);
  return "srt://" + location.hostname + ":" + port + "?streamid=" + appName + id;
}
/**
 *
 * @param {Location} location
 * @param {string} id
 * @returns
 */
function getRtmpUrl(location, id) {
  var appName = location.pathname.substring(1, location.pathname.indexOf("/", 1) + 1);
  return "rtmp://" + location.hostname + "/" + appName + id;
}
/**
 *
 * @param {string} paramName
 * @returns
 */
function getQueryParameter(paramName) {
  var value = getUrlParameter(paramName);
  if (typeof value != "undefined") {
    return "&" + paramName + "=" + value;
  }
  return "";
  //if it does not match, it returns "undefined"
}
/**
 *
 * @param {string} streamId
 * @param {string} linkUrl
 */
function updateBroadcastStatusInfo(streamId, linkUrl) {
  $("#offlineInfo").hide();
  $("#broadcastingInfo").show();
  if (linkUrl === undefined) {
    linkUrl = "../play.html?id=" + streamId;
  }
  $("#playlink").attr("href", linkUrl);
  $("#playlink").show();
  setTimeout(function () {
    var state = window.webRTCAdaptor.signallingState(streamId);
    if (state != null && state != "closed") {
      var iceState = window.webRTCAdaptor.iceConnectionState(streamId);
      if (iceState != null && iceState != "failed" && iceState != "disconnected") {
        updateBroadcastStatusInfo(streamId, linkUrl);
      } else {
        $("#playlink").hide();
        $("#broadcastingInfo").hide();
        $("#offlineInfo").show();
      }
    } else {
      $("#playlink").hide();
      $("#broadcastingInfo").hide();
      $("#offlineInfo").show();
    }
  }, 200);
}

/**
 * @returns {boolean}
 */
function isAndroid() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android/i.test(userAgent);
}

/**
 *
 * @param {*} error
 * @param {string} message
 * @returns
 */
function errorHandler(error, message) {
  Logger.warn("error callback: " + JSON.stringify(error));
  var errorMessage = JSON.stringify(error);
  if (typeof message != "undefined") {
    errorMessage = message;
  } else {
    errorMessage = JSON.stringify(error);
  }
  if (error.indexOf("WebSocketNotConnected") != -1) {
    errorMessage = "WebSocket is disconnected.";
  } else if (error.indexOf("not_initialized_yet") != -1) {
    errorMessage = "Server is getting initialized.";
  } else if (error.indexOf("data_store_not_available") != -1) {
    errorMessage = "Data store is not available. It's likely that server is initialized or getting closed";
  } else {
    if (error.indexOf("NotFoundError") != -1) {
      errorMessage = "Camera or Mic are not found or not allowed in your device";
    } else if (error.indexOf("NotReadableError") != -1 || error.indexOf("TrackStartError") != -1) {
      errorMessage = "Camera or Mic are already in use and they cannot be opened. Choose another video/audio source if you have on the page below ";
    } else if (error.indexOf("OverconstrainedError") != -1 || error.indexOf("ConstraintNotSatisfiedError") != -1) {
      errorMessage = "There is no device found that fits your video and audio constraints. You may change video and audio constraints";
    } else if (error.indexOf("NotAllowedError") != -1 || error.indexOf("PermissionDeniedError") != -1) {
      errorMessage = "You are not allowed to access camera and mic.";
    } else if (error.indexOf("TypeError") != -1) {
      errorMessage = "Video/Audio is required";
    } else if (error.indexOf("getUserMediaIsNotAllowed") != -1) {
      errorMessage = "You are not allowed to reach devices from an insecure origin, please enable ssl";
    } else if (error.indexOf("ScreenSharePermissionDenied") != -1) {
      errorMessage = "You are not allowed to access screen share";
      $(".video-source").first().prop("checked", true);
    } else if (error.indexOf("UnsecureContext") != -1) {
      errorMessage = "Please Install SSL(https). Camera and mic cannot be opened because of unsecure context. ";
    } else if (error.indexOf('no_stream_exist') != -1) {
      errorMessage = 'There is no active live stream with this id to play';
    } else {
      errorMessage = error;
    }
  }
  Logger.error(errorMessage);
  if (message !== undefined) {
    Logger.error(message);
  }
  return errorMessage;
}

export { errorHandler, generateRandomString, getQueryParameter, getRtmpUrl, getSrtURL, getWebSocketURL, isAndroid, updateBroadcastStatusInfo };
