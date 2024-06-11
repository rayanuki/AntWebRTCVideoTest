import './loglevel.min.js';
import { MediaManager } from './media_manager.js';
import { SoundMeter } from './soundmeter.js';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return fn;
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet);
  privateSet.add(obj);
}

class PeerStats {
  /**
   * Creates an instance of the class.
   * @param {string} streamId - The stream ID.
   * @constructor
   */
  constructor(streamId) {
    /**
     * The stream ID.
     * @type {string}
     */
    this.streamId = streamId;

    /**
     * The total number of bytes received.
     * @type {number}
     */
    this.totalBytesReceivedCount = 0;

    /**
     * The total number of bytes sent.
     * @type {number}
     */
    this.totalBytesSent = 0;

    /**
     * The number of video packets lost.
     * @type {number}
     */
    this.videoPacketsLost = 0;

    /**
     * The fraction of lost video packets.
     * @type {number}
     */
    this.fractionLost = 0;

    /**
     * The start time.
     * @type {number}
     */
    this.startTime = 0;

    /**
     * The last number of frames encoded.
     * @type {number}
     */
    this.lastFramesEncoded = 0;

    /**
     * The total number of frames encoded.
     * @type {number}
     */
    this.totalFramesEncodedCount = 0;

    /**
     * The last number of bytes received.
     * @type {number}
     */
    this.lastBytesReceived = 0;

    /**
     * The last number of bytes sent.
     * @type {number}
     */
    this.lastBytesSent = 0;

    /**
     * The total number of video packets sent.
     * @type {number}
     */
    this.totalVideoPacketsSent = 0;

    /**
     * The total number of audio packets sent.
     * @type {number}
     */
    this.totalAudioPacketsSent = 0;

    /**
     * The current timestamp.
     * @type {number}
     */
    this.currentTimestamp = 0;

    /**
     * The last recorded timestamp.
     * @type {number}
     */
    this.lastTime = 0;

    /**
     * The timer ID.
     * @type {number}
     */
    this.timerId = 0;

    /**
     * The first byte sent count.
     * @type {number}
     */
    this.firstByteSentCount = 0;

    /**
     * The first bytes received count.
     * @type {number}
     */
    this.firstBytesReceivedCount = 0;

    /**
     * The audio level.
     * @type {number}
     */
    this.audioLevel = -1;

    /**
     * The quality limitation reason.
     * @type {string}
     */
    this.qualityLimitationReason = "";

    /**
     * The source resolution width.
     * @type {number}
     */
    this.resWidth = 0;

    /**
     * The source resolution height.
     * @type {number}
     */
    this.resHeight = 0;

    /**
     * The source frames per second.
     * @type {number}
     */
    this.srcFps = 0;

    /**
     * The frame width of the sent video.
     * @type {number}
     */
    this.frameWidth = 0;

    /**
     * The frame height of the sent video.
     * @type {number}
     */
    this.frameHeight = 0;

    /**
     * The video round-trip time.
     * @type {number}
     */
    this.videoRoundTripTime = 0;

    /**
     * The video jitter.
     * @type {number}
     */
    this.videoJitter = 0;

    /**
     * The audio round-trip time.
     * @type {number}
     */
    this.audioRoundTripTime = 0;

    /**
     * The audio jitter.
     * @type {number}
     */
    this.audioJitter = 0;

    /**
     * The number of audio packets lost.
     * @type {number}
     */
    this.audioPacketsLost = 0;

    /**
     * The number of frames received.
     * @type {number}
     */
    this.framesReceived = 0;

    /**
     * The number of frames dropped.
     * @type {number}
     */
    this.framesDropped = 0;

    /**
     * The number of frames decoded.
     * @type {number}
     */
    this.framesDecoded = 0;

    /**
     * The average audio jitter delay.
     * @type {number}
     */
    this.audioJitterAverageDelay = 0;

    /**
     * The average video jitter delay.
     * @type {number}
     */
    this.videoJitterAverageDelay = 0;
    this.availableOutgoingBitrate = Infinity;
  }
  //kbits/sec
  get averageOutgoingBitrate() {
    return Math.floor(8 * (this.totalBytesSentCount - this.firstByteSentCount) / (this.currentTimestamp - this.startTime));
  }

  //frames per second
  get currentFPS() {
    return ((this.totalFramesEncodedCount - this.lastFramesEncoded) / (this.currentTimestamp - this.lastTime) * 1000).toFixed(1);
  }

  //kbits/sec
  get averageIncomingBitrate() {
    return Math.floor(8 * (this.totalBytesReceivedCount - this.firstBytesReceivedCount) / (this.currentTimestamp - this.startTime));
  }

  //kbits/sec
  get currentOutgoingBitrate() {
    return Math.floor(8 * (this.totalBytesSentCount - this.lastBytesSent) / (this.currentTimestamp - this.lastTime));
  }

  //kbits/sec
  get currentIncomingBitrate() {
    return Math.floor(8 * (this.totalBytesReceivedCount - this.lastBytesReceived) / (this.currentTimestamp - this.lastTime));
  }
  /**
   * @param {number} timestamp
   * @returns {void}
   */
  set currentTime(timestamp) {
    this.lastTime = this.currentTimestamp;
    this.currentTimestamp = timestamp;
    if (this.startTime == 0) {
      this.startTime = timestamp - 1; // do not have zero division error
    }
  }
  /**
   * @param {number} bytesReceived
   * @returns {void}
   */
  set totalBytesReceived(bytesReceived) {
    this.lastBytesReceived = this.totalBytesReceivedCount;
    this.totalBytesReceivedCount = bytesReceived;
    if (this.firstBytesReceivedCount == 0) {
      this.firstBytesReceivedCount = bytesReceived;
    }
  }
  /**
   * @param {number} bytesSent
   * @returns {void}
   */
  set totalBytesSent(bytesSent) {
    this.lastBytesSent = this.totalBytesSentCount;
    this.totalBytesSentCount = bytesSent;
    if (this.firstByteSentCount == 0) {
      this.firstByteSentCount = bytesSent;
    }
  }
  /**
   * @param {number} framesEncoded
   * @returns {void}
   */
  set totalFramesEncoded(framesEncoded) {
    this.lastFramesEncoded = this.totalFramesEncodedCount;
    this.totalFramesEncodedCount = framesEncoded;
    if (this.lastFramesEncoded == 0) {
      this.lastFramesEncoded = framesEncoded;
    }
  }
}

var Logger$1 = window.log;
class WebSocketAdaptor {
  /**
   * 
   * @param {object} initialValues 
   */
  constructor(initialValues) {
    /**
     * @type {boolean}
     */
    this.debug = false;
    for (var key in initialValues) {
      if (initialValues.hasOwnProperty(key)) {
        this[key] = initialValues[key];
      }
    }
    this.initWebSocketConnection();
  }
  /**
   * Initializes the WebSocket connection.
   * @param {Function} callbackConnected - Optional callback function to be called when the connection is established.
   * @returns {void}
   */
  initWebSocketConnection(callbackConnected) {
    this.connecting = true;
    this.connected = false;
    this.pingTimerId = -1;

    /*
    * It's not mandatory if you don't use the new Load Balancer mechanism
    * It uses one of the nodes on Cluster mode
    * Example parameters: "origin" or "edge"
    */
    var url = new URL(this.websocket_url);
    if (!['origin', 'edge'].includes(url.searchParams.get('target'))) {
      url.searchParams.set('target', this.webrtcadaptor.isPlayMode ? 'edge' : 'origin');
      this.websocket_url = url.toString();
    }
    this.wsConn = new WebSocket(this.websocket_url);
    this.wsConn.onopen = () => {
      if (this.debug) {
        Logger$1.debug("websocket connected");
      }
      this.pingTimerId = setInterval(() => {
        this.sendPing();
      }, 3000);
      this.connected = true;
      this.connecting = false;
      this.callback("initialized");
      if (typeof callbackConnected != "undefined") {
        callbackConnected();
      }
    };
    this.wsConn.onmessage = event => {
      var obj = JSON.parse(event.data);
      if (obj.command == "start") {
        //this command is received first, when publishing so playmode is false

        if (this.debug) {
          Logger$1.debug("received start command");
        }
        this.webrtcadaptor.startPublishing(obj.streamId);
      } else if (obj.command == "takeCandidate") {
        if (this.debug) {
          Logger$1.debug("received ice candidate for stream id " + obj.streamId);
          Logger$1.debug(obj.candidate);
        }
        this.webrtcadaptor.takeCandidate(obj.streamId, obj.label, obj.candidate);
      } else if (obj.command == "takeConfiguration") {
        if (this.debug) {
          Logger$1.debug("received remote description type for stream id: " + obj.streamId + " type: " + obj.type);
        }
        this.webrtcadaptor.takeConfiguration(obj.streamId, obj.sdp, obj.type, obj.idMapping);
      } else if (obj.command == "stop") {
        if (this.debug) {
          Logger$1.debug("Stop command received");
        }
        //server sends stop command when the peers are connected to each other in peer-to-peer.
        //It is not being sent in publish,play modes
        this.webrtcadaptor.closePeerConnection(obj.streamId);
      } else if (obj.command == "error") {
        this.callbackError(obj.definition, obj);
      } else if (obj.command == "notification") {
        this.callback(obj.definition, obj);
      } else if (obj.command == "streamInformation") {
        this.callback(obj.command, obj);
      } else if (obj.command == "roomInformation") {
        this.callback(obj.command, obj);
      } else if (obj.command == "pong") {
        this.callback(obj.command);
      } else if (obj.command == "trackList") {
        this.callback(obj.command, obj);
      } else if (obj.command == "connectWithNewId") {
        this.multiPeerStreamId = obj.streamId;
        this.join(obj.streamId);
      } else if (obj.command == "peerMessageCommand") {
        this.callback(obj.command, obj);
      }
    };
    this.wsConn.onerror = error => {
      this.connecting = false;
      this.connected = false;
      Logger$1.info(" error occured: " + JSON.stringify(error));
      this.clearPingTimer();
      this.callbackError("WebSocketNotConnected", error);
    };
    this.wsConn.onclose = event => {
      this.connecting = false;
      this.connected = false;
      if (this.debug) {
        Logger$1.debug("connection closed.");
      }
      this.clearPingTimer();
      this.callback("closed", event);
    };
  }
  clearPingTimer() {
    if (this.pingTimerId != -1) {
      if (this.debug) {
        Logger$1.debug("Clearing ping message timer");
      }
      clearInterval(this.pingTimerId);
      this.pingTimerId = -1;
    }
  }
  sendPing() {
    var jsCmd = {
      command: "ping"
    };
    this.wsConn.send(JSON.stringify(jsCmd));
  }
  close() {
    this.wsConn.close();
  }
  /**
   * 
   * @param {*} text 
   * @returns 
   */
  send(text) {
    if (this.connecting == false && this.connected == false) {
      //try to reconnect
      this.initWebSocketConnection(() => {
        this.send(text);
      });
      return;
    }
    try {
      this.wsConn.send(text);
      if (this.debug) {
        Logger$1.debug("sent message:" + text);
      }
    } catch (error) {
      Logger$1.warn("Cannot send message:" + text);
    }
  }
  isConnected() {
    return this.connected;
  }
  isConnecting() {
    return this.connecting;
  }
}

var Logger = window.log;

/**
 * This structure is used to handle large size data channel messages (like image)
 * which should be splitted into chunks while sending and receiving.
 *
 */
class ReceivingMessage {
  /**
   *
   * @param {number} size
   */
  constructor(size) {
    this.size = size;
    this.received = 0;
    this.data = new ArrayBuffer(size);
  }
}

/**
 * WebRTCAdaptor Class is interface to the JS SDK of Ant Media Server (AMS). This class manages the signalling,
 * keeps the states of peers.
 *
 * This class is used for peer-to-peer signalling,
 * publisher and player signalling and conference.
 *
 * Also it is responsible for some room management in conference case.
 *
 * There are different use cases in AMS. This class is used for all of them.
 *
 * WebRTC Publish
 * WebRTC Play
 * WebRTC Data Channel Connection
 * WebRTC Conference
 * WebRTC Multitrack Play
 * WebRTC Multitrack Conference
 * WebRTC peer-to-peer session
 *
 */
class WebRTCAdaptor {
  /**
   * Register plugins to the WebRTCAdaptor
   * @param {Function} plugin
   */
  static register(pluginInitMethod) {
    WebRTCAdaptor.pluginInitMethods.push(pluginInitMethod);
  }
  /**
   *
   * @param {object} initialValues
   */
  constructor(initialValues) {
    /**
     * PeerConnection configuration while initializing the PeerConnection.
     * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#parameters
     *
     * More than one STURN and/or TURN servers can be added.  Here is a typical turn server configuration
     *
     *    {
     * 	  urls: "",
     *	  username: "",
     *    credential: "",
     *	}
     *
     *  Default value is the google stun server
     */
    this.peerconnection_config = {
      'iceServers': [{
        'urls': 'stun:stun1.l.google.com:19302'
      }],
      sdpSemantics: 'unified-plan'
    };

    /**
     * Used while creating SDP (answer or offer)
     * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer#parameters
     */
    this.sdp_constraints = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false
    };

    /**
     * This keeps the PeerConnections for each stream id.
     * It is an array because one @WebRTCAdaptor instance can manage multiple WebRTC connections as in the conference.
     * Its indices are the Stream Ids of each stream
     */
    this.remotePeerConnection = new Array();

    /**
     * This keeps statistics for the each PeerConnection.
     * It is an array because one @WebRTCAdaptor instance can manage multiple WebRTC connections as in the conference.
     * Its indices are the Stream Ids of each stream
     */
    this.remotePeerConnectionStats = new Array();

    /**
     * This keeps the Remote Description (SDP) set status for each PeerConnection.
     * We need to keep this status because sometimes ice candidates from the remote peer
     * may come before the Remote Description (SDP). So we need to store those ice candidates
     * in @iceCandidateList field until we get and set the Remote Description.
     * Otherwise setting ice candidates before Remote description may cause problem.
     */
    this.remoteDescriptionSet = new Array();

    /**
     * This keeps the Ice Candidates which are received before the Remote Description (SDP) received.
     * For details please check @remoteDescriptionSet field.
     */
    this.iceCandidateList = new Array();

    /**
     * This is the name for the room that is desired to join in conference mode.
     */
    this.roomName = null;

    /**
     * This keeps StreamIds for the each playing session.
     * It is an array because one @WebRTCAdaptor instance can manage multiple playing sessions.
     */
    this.playStreamId = new Array();

    /**
     * This is the flag indicates if multiple peers will join a peer in the peer to peer mode.
     * This is used only with Embedded SDk
     */
    this.isMultiPeer = false;

    /**
     * This is the stream id that multiple peers can join a peer in the peer to peer mode.
     * This is used only with Embedded SDk
     */
    this.multiPeerStreamId = null;

    /**
     * This is instance of @WebSocketAdaptor and manages to websocket connection.
     * All signalling messages are sent to/recived from
     * the Ant Media Server over this web socket connection
     */
    this.webSocketAdaptor = null;

    /**
     * This flags indicates if this @WebRTCAdaptor instance is used only for playing session(s)
     * You don't need camera/mic access in play mode
     */
    this.isPlayMode = false;

    /**
     * This flags enables/disables debug logging
     */
    this.debug = false;

    /**
     * This is the Stream Id for the publisher. One @WebRCTCAdaptor supports only one publishing
     * session for now (23.02.2022).
     * In conference mode you can join a room with null stream id. In that case
     * Ant Media Server generates a stream id and provides it JoinedTheRoom callback and it is set to this field.
     */
    this.publishStreamId = null;

    /**
     * This is used to keep stream id and track id (which is provided in SDP) mapping
     * in MultiTrack Playback and conference.
     */
    this.idMapping = new Array();

    /**
     * This is used when only data is brodcasted with the same way video and/or audio.
     * The difference is that no video or audio is sent when this field is true
     */
    this.onlyDataChannel = false;

    /**
     * While publishing and playing streams data channel is enabled by default
     */
    this.dataChannelEnabled = true;

    /**
     * This is array of @ReceivingMessage
     * When you receive multiple large size messages @ReceivingMessage simultaneously
     * this map is used to indicate them with its index tokens.
     */
    this.receivingMessages = new Map();

    /**
     * Supported candidate types. Below types are for both sending and receiving candidates.
     * It means if when client receives candidate from STUN server, it sends to the server if candidate's protocol
     * is in the list. Likely, when client receives remote candidate from server, it adds as ice candidate
     * if candidate protocol is in the list below.
     */
    this.candidateTypes = ["udp", "tcp"];

    /**
     * Method to call when there is an event happened
     */
    this.callback = null;

    /**
     * Method to call when there is an error happened
     */
    this.callbackError = null;

    /**
     * Flag to indicate if the stream is published or not after the connection fails
     */
    this.reconnectIfRequiredFlag = true;

    /**
     * websocket url to connect
     * @deprecated use websocketURL
     */
    this.websocket_url = null;

    /**
     * Websocket URL
     */
    this.websocketURL = null;

    /**
     * flag to initialize components in constructor
     */
    this.initializeComponents = true;

    /**
     * Degradation Preference
     * 
     * maintain-framerate, maintain-resolution, or balanced
     */
    this.degradationPreference = "maintain-resolution";

    /**
     * PAY ATTENTION: The values of the above fields are provided as this constructor parameter.
     * TODO: Also some other hidden parameters may be passed here
     */
    for (var key in initialValues) {
      if (initialValues.hasOwnProperty(key)) {
        this[key] = initialValues[key];
      }
    }
    if (this.websocketURL == null) {
      this.websocketURL = this.websocket_url;
    }
    if (this.websocketURL == null) {
      throw new Error("WebSocket URL is not defined. It's mandatory");
    }
    /**
     * The html video tag for receiver is got here
     */
    this.remoteVideo = this.remoteVideoElement || document.getElementById(this.remoteVideoId);

    /**
     * Keeps the sound meters for each connection. Its index is stream id
     */
    this.soundMeters = new Array();

    /**
     * Keeps the current audio level for each playing streams in conference mode
     */
    this.soundLevelList = new Array();

    /**
     * This is the event listeners that WebRTC Adaptor calls when there is a new event happened
     */
    this.eventListeners = new Array();

    /**
     * This is the error event listeners that WebRTC Adaptor calls when there is an error happened
     */
    this.errorEventListeners = new Array();

    /**
     * This is token that is being used to publish the stream. It's added here to use in reconnect scenario
     */
    this.publishToken = null;

    /**
     * subscriber id that is being used to publish the stream. It's added here to use in reconnect scenario
     */
    this.publishSubscriberId = null;

    /**
     * subscriber code that is being used to publish the stream. It's added here to use in reconnect scenario
     */
    this.publishSubscriberCode = null;

    /**
     * This is the stream name that is being published. It's added here to use in reconnect scenario
     */
    this.publishStreamName = null;

    /**
     * This is the stream id of the main track that the current publishStreamId is going to be subtrack of it. It's added here to use in reconnect scenario
     */
    this.publishMainTrack = null;

    /**
     * This is the metadata that is being used to publish the stream. It's added here to use in reconnect scenario
     */
    this.publishMetaData = null;

    /**
     * This is the token to play the stream. It's added here to use in reconnect scenario
     */
    this.playToken = null;

    /**
     * This is the room id to play the stream. It's added here to use in reconnect scenario
     * This approach is old conferencing. It's better to use multi track conferencing
     */
    this.playRoomId = null;

    /**
     * These are enabled tracks to play the stream. It's added here to use in reconnect scenario
     */
    this.playEnableTracks = null;

    /**
     * This is the subscriber Id to play the stream. It's added here to use in reconnect scenario
     */
    this.playSubscriberId = null;

    /**
     * This is the subscriber code to play the stream. It's added here to use in reconnect scenario
     */
    this.playSubscriberCode = null;

    /**
     * This is the meta data to play the stream. It's added here to use in reconnect scenario
     */
    this.playMetaData = null;

    /**
     * This is the time info for the last reconnection attempt
     */
    this.lastReconnectiontionTrialTime = 0;

    /**
     * All media management works for teh local stream are made by @MediaManager class.
     * for details please check @MediaManager
     */
    this.mediaManager = new MediaManager({
      userParameters: initialValues,
      webRTCAdaptor: this,
      callback: (info, obj) => {
        this.notifyEventListeners(info, obj);
      },
      callbackError: (error, message) => {
        this.notifyErrorEventListeners(error, message);
      },
      getSender: (streamId, type) => {
        return this.getSender(streamId, type);
      }
    });

    //Initialize the local stream (if needed) and web socket connection
    if (this.initializeComponents) {
      this.initialize();
    }
  }

  /**
   * Init plugins
   */
  initPlugins() {
    WebRTCAdaptor.pluginInitMethods.forEach(initMethod => {
      initMethod(this);
    });
  }

  /**
   * Add event listener to be notified. This is generally for plugins
   * @param {*} listener
   */
  addEventListener(listener) {
    this.eventListeners.push(listener);
  }

  /**
   * Add error event listener to be notified. Thisis generally for plugins
   * @param {*} errorListener
   */
  addErrorEventListener(errorListener) {
    this.errorEventListeners.push(errorListener);
  }

  /**
   * Notify event listeners and callback method
   * @param {*} info
   * @param {*} obj
   */
  notifyEventListeners(info, obj) {
    this.eventListeners.forEach(listener => {
      listener(info, obj);
    });
    if (this.callback != null) {
      this.callback(info, obj);
    }
  }

  /**
   * Notify error event listeners and callbackError method
   * @param {*} error
   * @param {*} message
   */
  notifyErrorEventListeners(error, message) {
    this.errorEventListeners.forEach(listener => {
      listener(error, message);
    });
    if (this.callbackError != null) {
      this.callbackError(error, message);
    }
  }

  /**
   * Called by constuctor to
   *    -check local stream unless it is in play mode
   *    -start websocket connection
   */
  initialize() {
    if (!this.isPlayMode && !this.onlyDataChannel && this.mediaManager.localStream == null) {
      //we need local stream because it not a play mode
      return this.mediaManager.initLocalStream().then(() => {
        this.initPlugins();
        this.checkWebSocketConnection();
        return new Promise((resolve, reject) => {
          resolve("Wait 'initialized' callback from websocket");
        });
      }).catch(error => {
        Logger.warn(error);
        throw error;
      });
    }
    return new Promise((resolve, reject) => {
      this.initPlugins();
      this.checkWebSocketConnection();
      resolve("Wait 'initialized' callback from websocket");
    });
  }

  /**
   * Called to start a new WebRTC stream. AMS responds with start message.
   * Parameters:
   *  @param {string} streamId : unique id for the stream
   *  @param {string=} [token] : required if any stream security (token control) enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Stream-Security-Documentation
   *  @param {string=} [subscriberId] : required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
   *  @param {string=} [subscriberCode] : required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
   *  @param {string=} [streamName] : required if you want to set a name for the stream
   *  @param {string=} [mainTrack] :  required if you want to start the stream as a subtrack for a main stream which has id of this parameter.
   *                Check:https://antmedia.io/antmediaserver-webrtc-multitrack-playing-feature/
   *                !!! for multitrack conference set this value with roomName
   *  @param {string=} [metaData] : a free text information for the stream to AMS. It is provided to Rest methods by the AMS
   */
  publish(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData) {
    //TODO: should refactor the repeated code
    this.publishStreamId = streamId;
    this.mediaManager.publishStreamId = streamId;
    this.publishToken = token;
    this.publishSubscriberId = subscriberId;
    this.publishSubscriberCode = subscriberCode;
    this.publishStreamName = streamName;
    this.publishMainTrack = mainTrack;
    this.publishMetaData = metaData;
    if (this.onlyDataChannel) {
      this.sendPublishCommand(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, false, false);
    }
    //If it started with playOnly mode and wants to publish now
    else if (this.mediaManager.localStream == null) {
      this.mediaManager.initLocalStream().then(() => {
        var videoEnabled = false;
        var audioEnabled = false;
        if (this.mediaManager.localStream != null) {
          videoEnabled = this.mediaManager.localStream.getVideoTracks().length > 0;
          audioEnabled = this.mediaManager.localStream.getAudioTracks().length > 0;
        }
        this.sendPublishCommand(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, videoEnabled, audioEnabled);
      }).catch(error => {
        Logger.warn(error);
        throw error;
      });
    } else {
      var videoEnabled = this.mediaManager.localStream.getVideoTracks().length > 0;
      var audioEnabled = this.mediaManager.localStream.getAudioTracks().length > 0;
      this.sendPublishCommand(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, videoEnabled, audioEnabled);
    }
    //init peer connection for reconnectIfRequired
    this.initPeerConnection(streamId, "publish");
    setTimeout(() => {
      //check if it is connected or not
      //this resolves if the server responds with some error message
      if (this.iceConnectionState(this.publishStreamId) != "checking" && this.iceConnectionState(this.publishStreamId) != "connected" && this.iceConnectionState(this.publishStreamId) != "completed") {
        //if it is not connected, try to reconnect
        this.reconnectIfRequired(0);
      }
    }, 3000);
  }
  sendPublishCommand(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, videoEnabled, audioEnabled) {
    var jsCmd = {
      command: "publish",
      streamId: streamId,
      token: token,
      subscriberId: typeof subscriberId !== undefined && subscriberId != null ? subscriberId : "",
      subscriberCode: typeof subscriberCode !== undefined && subscriberCode != null ? subscriberCode : "",
      streamName: typeof streamName !== undefined && streamName != null ? streamName : "",
      mainTrack: typeof mainTrack !== undefined && mainTrack != null ? mainTrack : "",
      video: videoEnabled,
      audio: audioEnabled,
      metaData: typeof metaData !== undefined && metaData != null ? metaData : ""
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to join a room. AMS responds with joinedTheRoom message.
   * Parameters:
   * @param {string} roomName : unique id of the room
   * @param {string=} streamId : unique id of the stream belongs to this participant
   * @param {string=} mode :    legacy for older implementation (default value)
   *            mcu for merging streams
   *            amcu: audio only conferences with mixed audio
   */
  joinRoom(roomName, streamId, mode) {
    this.roomName = roomName;
    var jsCmd = {
      command: "joinRoom",
      room: roomName,
      streamId: streamId,
      mode: mode
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to start a playing session for a stream. AMS responds with start message.
   * Parameters:
   *  @param {string} streamId :(string) unique id for the stream that you want to play
   *  @param {string=} token :(string) required if any stream security (token control) enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Stream-Security-Documentation
   *  @param {string=} roomId :(string) required if this stream is belonging to a room participant
   *  @param {Array.<MediaStreamTrack>=} enableTracks :(array) required if the stream is a main stream of multitrack playing. You can pass the the subtrack id list that you want to play.
   *                    you can also provide a track id that you don't want to play by adding ! before the id.
   *  @param {string=} subscriberId :(string) required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
   *  @param {string=} subscriberCode :(string) required if TOTP enabled. Check https://github.com/ant-media/Ant-Media-Server/wiki/Time-based-One-Time-Password-(TOTP)
   *  @param {string=} metaData :(string, json) a free text information for the stream to AMS. It is provided to Rest methods by the AMS
   */
  play(streamId, token, roomId, enableTracks, subscriberId, subscriberCode, metaData) {
    this.playStreamId.push(streamId);
    this.playToken = token;
    this.playRoomId = roomId;
    this.playEnableTracks = enableTracks;
    this.playSubscriberId = subscriberId;
    this.playSubscriberCode = subscriberCode;
    this.playMetaData = metaData;
    var jsCmd = {
      command: "play",
      streamId: streamId,
      token: typeof token !== undefined && token != null ? token : "",
      room: typeof roomId !== undefined && roomId != null ? roomId : "",
      trackList: typeof enableTracks !== undefined && enableTracks != null ? enableTracks : [],
      subscriberId: typeof subscriberId !== undefined && subscriberId != null ? subscriberId : "",
      subscriberCode: typeof subscriberCode !== undefined && subscriberId != null ? subscriberCode : "",
      viewerInfo: typeof metaData !== undefined && metaData != null ? metaData : ""
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));

    //init peer connection for reconnectIfRequired
    this.initPeerConnection(streamId, "play");
    setTimeout(() => {
      //check if it is connected or not
      //this resolves if the server responds with some error message
      if (this.iceConnectionState(streamId) != "checking" && this.iceConnectionState(streamId) != "connected" && this.iceConnectionState(streamId) != "completed") {
        //if it is not connected, try to reconnect
        this.reconnectIfRequired(0);
      }
    }, 3000);
  }

  /**
   * Reconnects to the stream if it is not stopped on purpose
   * @param {number} [delayMs]
   * @returns
   */
  reconnectIfRequired() {
    var delayMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
    if (this.reconnectIfRequiredFlag) {
      //It's important to run the following methods after 3000 ms because the stream may be stopped by the user in the meantime
      if (delayMs > 0) {
        setTimeout(() => {
          this.tryAgain();
        }, delayMs);
      } else {
        this.tryAgain();
      }
    }
  }
  tryAgain() {
    var _this = this;
    var now = Date.now();
    //to prevent too many trial from different paths
    if (now - this.lastReconnectiontionTrialTime < 3000) {
      return;
    }
    this.lastReconnectiontionTrialTime = now;

    //reconnect publish
    //if remotePeerConnection has a peer connection for the stream id, it means that it is not stopped on purpose

    if (this.remotePeerConnection[this.publishStreamId] != null &&
    //check connection status to not stop streaming an active stream
    this.iceConnectionState(this.publishStreamId) != "checking" && this.iceConnectionState(this.publishStreamId) != "connected" && this.iceConnectionState(this.publishStreamId) != "completed") {
      // notify that reconnection process started for publish
      this.notifyEventListeners("reconnection_attempt_for_publisher", this.publishStreamId);
      this.stop(this.publishStreamId);
      setTimeout(() => {
        //publish about some time later because server may not drop the connection yet 
        //it may trigger already publishing error 
        Logger.log("Trying publish again for stream: " + this.publishStreamId);
        this.publish(this.publishStreamId, this.publishToken, this.publishSubscriberId, this.publishSubscriberCode, this.publishStreamName, this.publishMainTrack, this.publishMetaData);
      }, 500);
    }

    //reconnect play
    var _loop = function _loop() {
      var streamId = _this.playStreamId[index];
      if (_this.remotePeerConnection[streamId] != "null" &&
      //check connection status to not stop streaming an active stream
      _this.iceConnectionState(streamId) != "checking" && _this.iceConnectionState(streamId) != "connected" && _this.iceConnectionState(streamId) != "completed") {
        // notify that reconnection process started for play
        _this.notifyEventListeners("reconnection_attempt_for_player", streamId);
        Logger.log("It will try to play again for stream: " + streamId + " because it is not stopped on purpose");
        _this.stop(streamId);
        setTimeout(() => {
          //play about some time later because server may not drop the connection yet 
          //it may trigger already playing error 
          Logger.log("Trying play again for stream: " + streamId);
          _this.play(streamId, _this.playToken, _this.playRoomId, _this.playEnableTracks, _this.playSubscriberId, _this.playSubscriberCode, _this.playMetaData);
        }, 500);
      }
    };
    for (var index in this.playStreamId) {
      _loop();
    }
  }

  /**
   * Called to stop a publishing/playing session for a stream. AMS responds with publishFinished or playFinished message.
   * Parameters:
   *  @param {string} streamId : unique id for the stream that you want to stop publishing or playing
   */
  stop(streamId) {
    //stop is called on purpose and it deletes the peer connection from remotePeerConnections
    this.closePeerConnection(streamId);
    if (this.webSocketAdaptor != null && this.webSocketAdaptor.isConnected()) {
      var jsCmd = {
        command: "stop",
        streamId: streamId
      };
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }
  }

  /**
   * Called to join a peer-to-peer mode session as peer. AMS responds with joined message.
   * Parameters:
   * @param {string} streamId : unique id for the peer-to-peer session
   */
  join(streamId) {
    var jsCmd = {
      command: "join",
      streamId: streamId,
      multiPeer: this.isMultiPeer && this.multiPeerStreamId == null,
      mode: this.isPlayMode ? "play" : "both"
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called by browser when a new track is added to WebRTC connetion. This is used to infor html pages with newStreamAvailable callback.
   * Parameters:
   * 	 event: TODO
   * 	 streamId: unique id for the stream
   */
  onTrack(event, streamId) {
    Logger.debug("onTrack for stream");
    if (this.remoteVideo != null) {
      if (this.remoteVideo.srcObject !== event.streams[0]) {
        this.remoteVideo.srcObject = event.streams[0];
        Logger.debug('Received remote stream');
      }
    } else {
      var dataObj = {
        stream: event.streams[0],
        track: event.track,
        streamId: streamId,
        trackId: this.idMapping[streamId][event.transceiver.mid]
      };
      this.notifyEventListeners("newTrackAvailable", dataObj);

      //deprecated. Listen newTrackAvailable in callback. It's kept for backward compatibility
      this.notifyEventListeners("newStreamAvailable", dataObj);
    }
  }

  /**
   * Called to leave from a conference room. AMS responds with leavedTheRoom message.
   * Parameters:
   * @param {string} roomName : unique id for the conference room
   */
  leaveFromRoom(roomName) {
    for (var key in this.remotePeerConnection) {
      this.closePeerConnection(key);
    }
    this.roomName = roomName;
    var jsCmd = {
      command: "leaveFromRoom",
      room: roomName
    };
    Logger.debug("leave request is sent for " + roomName);
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to leave from a peer-to-peer mode session. AMS responds with leaved message.
   * Parameters:
   * @param {string} streamId : unique id for the peer-to-peer session
   */
  leave(streamId) {
    var jsCmd = {
      command: "leave",
      streamId: this.isMultiPeer && this.multiPeerStreamId != null ? this.multiPeerStreamId : streamId
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    this.closePeerConnection(streamId);
    this.multiPeerStreamId = null;
  }

  /**
   * Called to get a stream information for a specific stream. AMS responds with streamInformation message.
   * Parameters:
   * @param {string} streamId : unique id for the stream that you want to get info about
   */
  getStreamInfo(streamId) {
    var jsCmd = {
      command: "getStreamInfo",
      streamId: streamId
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to get the list of video track assignments. AMS responds with the videoTrackAssignmentList message.
   * Parameters:
   * @param {string} streamId : unique id for the stream that you want to get info about
   */
  requestVideoTrackAssignments(streamId) {
    var jsCmd = {
      command: "getVideoTrackAssignmentsCommand",
      streamId: streamId
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to get the broadcast object for a specific stream. AMS responds with the broadcastObject callback.
   * Parameters:
   * @param {string} streamId : unique id for the stream that you want to get info about
   */
  getBroadcastObject(streamId) {
    var jsCmd = {
      command: "getBroadcastObject",
      streamId: streamId
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to update the meta information for a specific stream.
   * Parameters:
   * @param {string} streamId : unique id for the stream that you want to update MetaData
   * @param {string}  metaData : new free text information for the stream
   */
  updateStreamMetaData(streamId, metaData) {
    var jsCmd = {
      command: "updateStreamMetaData",
      streamId: streamId,
      metaData: metaData
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to get the room information for a specific room. AMS responds with roomInformation message
   * which includes the ids and names of the streams in that room.
   * If there is no active streams in the room, AMS returns error `no_active_streams_in_room` in error callback
   * Parameters:
   * @param {string} roomName : unique id for the room that you want to get info about
   * @param {string} streamId : unique id for the stream that is streamed by this @WebRTCAdaptor
   */
  getRoomInfo(roomName, streamId) {
    var jsCmd = {
      command: "getRoomInfo",
      streamId: streamId,
      room: roomName
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to enable/disable data flow from the AMS for a specific track under a main track.
   * Parameters:
   * @param {string}  mainTrackId : unique id for the main stream
   * @param {string}  trackId : unique id for the track that you want to enable/disable data flow for
   * @param {boolean} enabled : true or false
   */
  enableTrack(mainTrackId, trackId, enabled) {
    var jsCmd = {
      command: "enableTrack",
      streamId: mainTrackId,
      trackId: trackId,
      enabled: enabled
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to get the track ids under a main stream. AMS responds with trackList message.
   * Parameters:
   * @param {string} streamId : unique id for the main stream
   * @param {string=} [token] : not used
   * TODO: check this function
   */
  getTracks(streamId, token) {
    this.playStreamId.push(streamId);
    var jsCmd = {
      command: "getTrackList",
      streamId: streamId,
      token: token
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called by WebSocketAdaptor when a new ice candidate is received from AMS.
   * Parameters:
   *     event: TODO
   *     streamId: unique id for the stream
   */
  iceCandidateReceived(event, streamId) {
    if (event.candidate) {
      var protocolSupported = false;
      if (event.candidate.candidate == "") {
        //event candidate can be received and its value can be "".
        //don't compare the protocols
        protocolSupported = true;
      } else if (typeof event.candidate.protocol == "undefined") {
        this.candidateTypes.forEach(element => {
          if (event.candidate.candidate.toLowerCase().includes(element)) {
            protocolSupported = true;
          }
        });
      } else {
        protocolSupported = this.candidateTypes.includes(event.candidate.protocol.toLowerCase());
      }
      if (protocolSupported) {
        var jsCmd = {
          command: "takeCandidate",
          streamId: streamId,
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        };
        if (this.debug) {
          Logger.debug("sending ice candiate for stream Id " + streamId);
          Logger.debug(JSON.stringify(event.candidate));
        }
        this.webSocketAdaptor.send(JSON.stringify(jsCmd));
      } else {
        Logger.debug("Candidate's protocol(full sdp: " + event.candidate.candidate + ") is not supported. Supported protocols: " + this.candidateTypes);
        if (event.candidate.candidate != "") {
          //
          this.notifyErrorEventListeners("protocol_not_supported", "Support protocols: " + this.candidateTypes.toString() + " candidate: " + event.candidate.candidate);
        }
      }
    } else {
      Logger.debug("No event.candidate in the iceCandidate event");
    }
  }

  /**
   * Called internally to sanitize the text if it contains script to prevent xss
   * @param text
   * @returns {*}
   */
  sanitizeHTML(text) {
    if (text.includes("script")) return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return text;
  }

  /**
   * Called internally to initiate Data Channel.
   * Note that Data Channel should be enabled fromAMS settings.
   *  @param {string}  streamId : unique id for the stream
   *  @param {*} dataChannel : provided by PeerConnection
   */
  initDataChannel(streamId, dataChannel) {
    dataChannel.onerror = error => {
      Logger.debug("Data Channel Error:", error);
      var obj = {
        streamId: streamId,
        error: error
      };
      Logger.debug("channel status: ", dataChannel.readyState);
      if (dataChannel.readyState != "closed") {
        this.notifyErrorEventListeners("data_channel_error", obj);
      }
    };
    dataChannel.onmessage = event => {
      var obj = {
        streamId: streamId,
        data: event.data
      };
      var data = obj.data;
      if (typeof data === 'string' || data instanceof String) {
        obj.data = this.sanitizeHTML(obj.data);
        this.notifyEventListeners("data_received", obj);
      } else {
        var length = data.length || data.size || data.byteLength;
        var view = new Int32Array(data, 0, 1);
        var token = view[0];
        var msg = this.receivingMessages[token];
        if (msg == undefined) {
          var view = new Int32Array(data, 0, 2);
          var size = view[1];
          msg = new ReceivingMessage(size);
          this.receivingMessages[token] = msg;
          if (length > 8) {
            Logger.debug("something went wrong in msg receiving");
          }
          return;
        }
        var rawData = data.slice(4, length);
        var dataView = new Uint8Array(msg.data);
        dataView.set(new Uint8Array(rawData), msg.received, length - 4);
        msg.received += length - 4;
        if (msg.size == msg.received) {
          obj.data = msg.data;
          this.notifyEventListeners("data_received", obj);
        }
      }
    };
    dataChannel.onopen = () => {
      this.remotePeerConnection[streamId].dataChannel = dataChannel;
      Logger.debug("Data channel is opened");
      this.notifyEventListeners("data_channel_opened", streamId);
    };
    dataChannel.onclose = () => {
      Logger.debug("Data channel is closed");
      this.notifyEventListeners("data_channel_closed", streamId);
    };
  }

  /**
   * Called internally to initiate PeerConnection.
   * @param {string} streamId : unique id for the stream
   * @param {string}  dataChannelMode : can be "publish" , "play" or "peer" based on this it is decided which way data channel is created
   */
  initPeerConnection(streamId, dataChannelMode) {
    //null == undefined -> it's true
    //null === undefined -> it's false

    if (this.remotePeerConnection[streamId] == null) {
      var closedStreamId = streamId;
      Logger.debug("stream id in init peer connection: " + streamId + " close stream id: " + closedStreamId);
      this.remotePeerConnection[streamId] = new RTCPeerConnection(this.peerconnection_config);
      this.remoteDescriptionSet[streamId] = false;
      this.iceCandidateList[streamId] = new Array();
      if (!this.playStreamId.includes(streamId)) {
        if (this.mediaManager.localStream != null) {
          this.mediaManager.localStream.getTracks().forEach(track => {
            var rtpSender = this.remotePeerConnection[streamId].addTrack(track, this.mediaManager.localStream);
            if (track.kind == 'video') {
              var parameters = rtpSender.getParameters();
              parameters.degradationPreference = this.degradationPreference;
              rtpSender.setParameters(parameters).then(() => {
                Logger.info("Degradation Preference is set to " + this.degradationPreference);
              }).catch(err => {
                Logger.warn("Degradation Preference cannot be set to " + this.degradationPreference);
              });
            }
            //
            //parameters.degradationPreference
          });
        }
      }

      this.remotePeerConnection[streamId].onicecandidate = event => {
        this.iceCandidateReceived(event, closedStreamId);
      };
      this.remotePeerConnection[streamId].ontrack = event => {
        this.onTrack(event, closedStreamId);
      };
      this.remotePeerConnection[streamId].onnegotiationneeded = event => {
        Logger.debug("onnegotiationneeded");
      };
      if (this.dataChannelEnabled) {
        // skip initializing data channel if it is disabled
        if (dataChannelMode == "publish") {
          //open data channel if it's publish mode peer connection
          var dataChannelOptions = {
            ordered: true
          };
          if (this.remotePeerConnection[streamId].createDataChannel) {
            var dataChannel = this.remotePeerConnection[streamId].createDataChannel(streamId, dataChannelOptions);
            this.initDataChannel(streamId, dataChannel);
          } else {
            Logger.warn("CreateDataChannel is not supported");
          }
        } else if (dataChannelMode == "play") {
          //in play mode, server opens the data channel
          this.remotePeerConnection[streamId].ondatachannel = ev => {
            this.initDataChannel(streamId, ev.channel);
          };
        } else {
          //for peer mode do both for now
          var _dataChannelOptions = {
            ordered: true
          };
          if (this.remotePeerConnection[streamId].createDataChannel) {
            var dataChannelPeer = this.remotePeerConnection[streamId].createDataChannel(streamId, _dataChannelOptions);
            this.initDataChannel(streamId, dataChannelPeer);
            this.remotePeerConnection[streamId].ondatachannel = ev => {
              this.initDataChannel(streamId, ev.channel);
            };
          } else {
            Logger.warn("CreateDataChannel is not supported");
          }
        }
      }
      this.remotePeerConnection[streamId].oniceconnectionstatechange = event => {
        var obj = {
          state: this.remotePeerConnection[streamId].iceConnectionState,
          streamId: streamId
        };
        if (obj.state == "failed" || obj.state == "disconnected" || obj.state == "closed") {
          this.reconnectIfRequired(3000);
        }
        this.notifyEventListeners("ice_connection_state_changed", obj);

        //
        if (!this.isPlayMode && !this.playStreamId.includes(streamId)) {
          if (this.remotePeerConnection[streamId].iceConnectionState == "connected") {
            this.mediaManager.changeBandwidth(this.mediaManager.bandwidth, streamId).then(() => {
              Logger.debug("Bandwidth is changed to " + this.mediaManager.bandwidth);
            }).catch(e => Logger.warn(e));
          }
        }
      };
    }
    return this.remotePeerConnection[streamId];
  }

  /**
   * Called internally to close PeerConnection.
   * @param {string} streamId : unique id for the stream
   */
  closePeerConnection(streamId) {
    var peerConnection = this.remotePeerConnection[streamId];
    if (peerConnection != null) {
      this.remotePeerConnection[streamId] = null;
      delete this.remotePeerConnection[streamId];
      if (peerConnection.dataChannel != null) {
        peerConnection.dataChannel.close();
      }
      if (peerConnection.signalingState != "closed") {
        peerConnection.close();
      }
      var playStreamIndex = this.playStreamId.indexOf(streamId);
      if (playStreamIndex != -1) {
        this.playStreamId.splice(playStreamIndex, 1);
      }
    }
    //this is for the stats
    if (this.remotePeerConnectionStats[streamId] != null) {
      clearInterval(this.remotePeerConnectionStats[streamId].timerId);
      delete this.remotePeerConnectionStats[streamId];
    }
    if (this.soundMeters[streamId] != null) {
      delete this.soundMeters[streamId];
    }
  }

  /**
   * Called to get the signalling state for a stream.
   * This information can be used for error handling.
   * Check: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/connectionState
   * @param {string} streamId : unique id for the stream
   */
  signallingState(streamId) {
    if (this.remotePeerConnection[streamId] != null) {
      return this.remotePeerConnection[streamId].signalingState;
    }
    return null;
  }

  /**
   * Called to get the ice connection state for a stream.
   * This information can be used for error handling.
   * Check: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState
   * @param {string} streamId : unique id for the stream
   */
  iceConnectionState(streamId) {
    if (this.remotePeerConnection[streamId] != null) {
      return this.remotePeerConnection[streamId].iceConnectionState;
    }
    return null;
  }

  /**
   * Called by browser when Local Configuration (SDP) is created successfully.
   * It is set as LocalDescription first then sent to AMS.
   * @param {object} configuration : created Local Configuration (SDP)
   * @param {string} streamId : unique id for the stream
   */
  gotDescription(configuration, streamId) {
    this.remotePeerConnection[streamId].setLocalDescription(configuration).then(responose => {
      Logger.debug("Set local description successfully for stream Id " + streamId);
      var jsCmd = {
        command: "takeConfiguration",
        streamId: streamId,
        type: configuration.type,
        sdp: configuration.sdp
      };
      Logger.debug("setLocalDescription:" + configuration.sdp);
      this.webSocketAdaptor.send(JSON.stringify(jsCmd));
    }).catch(error => {
      Logger.error("Cannot set local description. Error is: " + error);
    });
  }

  /**
   * Called by WebSocketAdaptor when Remote Configuration (SDP) is received from AMS.
   * It is set as RemoteDescription first then if @iceCandidateList has candidate that
   * is received bfore this message, it is added as ice candidate.
   * @param {object} configuration : received Remote Configuration (SDP)
   * @param {string} idOfStream : unique id for the stream
   * @param {string} typeOfConfiguration
   * @param {string} idMapping : stream id and track id (which is provided in SDP) mapping in MultiTrack Playback and conference.
   *                It is recorded to match stream id as new tracks are added with @onTrack
   */
  takeConfiguration(idOfStream, configuration, typeOfConfiguration, idMapping) {
    var streamId = idOfStream;
    var type = typeOfConfiguration;
    var conf = configuration;
    var isTypeOffer = type == "offer";
    var dataChannelMode = "publish";
    if (isTypeOffer) {
      dataChannelMode = "play";
    }
    this.idMapping[streamId] = idMapping;
    this.initPeerConnection(streamId, dataChannelMode);
    Logger.debug("setRemoteDescription:" + conf);
    this.remotePeerConnection[streamId].setRemoteDescription(new RTCSessionDescription({
      sdp: conf,
      type: type
    })).then(response => {
      if (this.debug) {
        Logger.debug("set remote description is succesfull with response: " + response + " for stream : " + streamId + " and type: " + type);
        Logger.debug(conf);
      }
      this.remoteDescriptionSet[streamId] = true;
      var length = this.iceCandidateList[streamId].length;
      Logger.debug("Ice candidate list size to be added: " + length);
      for (var i = 0; i < length; i++) {
        this.addIceCandidate(streamId, this.iceCandidateList[streamId][i]);
      }
      this.iceCandidateList[streamId] = [];
      if (isTypeOffer) {
        //SDP constraints may be different in play mode
        Logger.debug("try to create answer for stream id: " + streamId);
        this.remotePeerConnection[streamId].createAnswer(this.sdp_constraints).then(configuration => {
          Logger.debug("created answer for stream id: " + streamId);
          //support for stereo
          configuration.sdp = configuration.sdp.replace("useinbandfec=1", "useinbandfec=1; stereo=1");
          this.gotDescription(configuration, streamId);
        }).catch(error => {
          Logger.error("create answer error :" + error);
        });
      }
    }).catch(error => {
      if (this.debug) {
        Logger.error("set remote description is failed with error: " + error);
      }
      if (error.toString().indexOf("InvalidAccessError") > -1 || error.toString().indexOf("setRemoteDescription") > -1) {
        /**
         * This error generally occurs in codec incompatibility.
         * AMS for a now supports H.264 codec. This error happens when some browsers try to open it from VP8.
         */
        this.notifyErrorEventListeners("notSetRemoteDescription");
      }
    });
  }

  /**
   * Called by WebSocketAdaptor when new ice candidate is received from AMS.
   * If Remote Description (SDP) is already set, the candidate is added immediately,
   * otherwise stored in @iceCandidateList to add after Remote Description (SDP) set.
   * @param {string} idOfTheStream : unique id for the stream
   * @param {number|null} tmpLabel : sdpMLineIndex
   * @param {string} tmpCandidate : ice candidate
   */
  takeCandidate(idOfTheStream, tmpLabel, tmpCandidate) {
    var streamId = idOfTheStream;
    var label = tmpLabel;
    var candidateSdp = tmpCandidate;
    var candidate = new RTCIceCandidate({
      sdpMLineIndex: label,
      candidate: candidateSdp
    });
    var dataChannelMode = "peer";
    this.initPeerConnection(streamId, dataChannelMode);
    Logger.debug("takeCandidate:" + candidateSdp);
    if (this.remoteDescriptionSet[streamId] == true) {
      this.addIceCandidate(streamId, candidate);
    } else {
      Logger.debug("Ice candidate is added to list because remote description is not set yet");
      this.iceCandidateList[streamId].push(candidate);
    }
  }
  /**
   * Called internally to add the Ice Candidate to PeerConnection
   *  @param {string} streamId : unique id for the stream
   *  @param {object} candidate : ice candidate
   */
  addIceCandidate(streamId, candidate) {
    var protocolSupported = false;
    if (candidate.candidate == "") {
      //candidate can be received and its value can be "".
      //don't compare the protocols
      protocolSupported = true;
    } else if (typeof candidate.protocol == "undefined") {
      this.candidateTypes.forEach(element => {
        if (candidate.candidate.toLowerCase().includes(element)) {
          protocolSupported = true;
        }
      });
    } else {
      protocolSupported = this.candidateTypes.includes(candidate.protocol.toLowerCase());
    }
    if (protocolSupported) {
      this.remotePeerConnection[streamId].addIceCandidate(candidate).then(response => {
        if (this.debug) {
          Logger.debug("Candidate is added for stream " + streamId);
        }
      }).catch(error => {
        Logger.error("ice candiate cannot be added for stream id: " + streamId + " error is: " + error);
        Logger.error(candidate);
      });
    } else {
      if (this.debug) {
        Logger.debug("Candidate's protocol(" + candidate.protocol + ") is not supported." + "Candidate: " + candidate.candidate + " Supported protocols:" + this.candidateTypes);
      }
    }
  }
  /**
   * Called by WebSocketAdaptor when start message is received //TODO: may be changed. this logic shouldn't be in WebSocketAdaptor
   * @param {string} idOfStream : unique id for the stream
   */
  startPublishing(idOfStream) {
    var streamId = idOfStream;
    var peerConnection = this.initPeerConnection(streamId, "publish");

    //this.remotePeerConnection[streamId]
    peerConnection.createOffer(this.sdp_constraints).then(configuration => {
      this.gotDescription(configuration, streamId);
    }).catch(error => {
      Logger.error("create offer error for stream id: " + streamId + " error: " + error);
    });
  }

  /**
   * Toggle video track on the server side.
   *
   * @param {string}  streamId : is the id of the stream
   * @param {string}  trackId : is the id of the track. streamId is also one of the trackId of the stream. If you are having just a single track on your
   *         stream, you need to give streamId as trackId parameter as well.
   * @param {boolean}  enabled : is the enable/disable video track. If it's true, server sends video track. If it's false, server does not send video
   */
  toggleVideo(streamId, trackId, enabled) {
    var jsCmd = {
      command: "toggleVideo",
      streamId: streamId,
      trackId: trackId,
      enabled: enabled
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Toggle audio track on the server side.
   *
   * @param {string} streamId : is the id of the stream
   * @param {string}  trackId : is the id of the track. streamId is also one of the trackId of the stream. If you are having just a single track on your
   *            stream, you need to give streamId as trackId parameter as well.
   * @param {boolean}  enabled : is the enable/disable video track. If it's true, server sends audio track. If it's false, server does not send audio
   *
   */
  toggleAudio(streamId, trackId, enabled) {
    var jsCmd = {
      command: "toggleAudio",
      streamId: streamId,
      trackId: trackId,
      enabled: enabled
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to get statistics for a PeerConnection. It can be publisher or player.
   *
   * @param {string} streamId : unique id for the stream
   */
  getStats(streamId) {
    Logger.debug("peerstatsgetstats = " + this.remotePeerConnectionStats[streamId]);
    return new Promise((resolve, reject) => {
      this.remotePeerConnection[streamId].getStats(null).then(stats => {
        var bytesReceived = -1;
        var videoPacketsLost = -1;
        var audioPacketsLost = -1;
        var fractionLost = -1;
        var currentTime = -1;
        var bytesSent = -1;
        var videoPacketsSent = -1;
        var audioPacketsSent = -1;
        var audioLevel = -1;
        var qlr = "";
        var framesEncoded = -1;
        var width = -1;
        var height = -1;
        var fps = -1;
        var frameWidth = -1;
        var frameHeight = -1;
        var videoRoundTripTime = -1;
        var videoJitter = -1;
        var audioRoundTripTime = -1;
        var audioJitter = -1;
        var framesDecoded = -1;
        var framesDropped = -1;
        var framesReceived = -1;
        var audioJitterAverageDelay = -1;
        var videoJitterAverageDelay = -1;
        var availableOutgoingBitrate = Infinity;
        stats.forEach(value => {
          //Logger.debug(value);
          if (value.type == "inbound-rtp" && typeof value.kind != "undefined") {
            bytesReceived += value.bytesReceived;
            if (value.kind == "audio") {
              audioPacketsLost = value.packetsLost;
            } else if (value.kind == "video") {
              videoPacketsLost = value.packetsLost;
            }
            fractionLost += value.fractionLost;
            currentTime = value.timestamp;
            if (typeof value.frameWidth != "undefined") {
              frameWidth = value.frameWidth;
            }
            if (typeof value.frameHeight != "undefined") {
              frameHeight = value.frameHeight;
            }
            if (typeof value.framesDecoded != "undefined") {
              framesDecoded = value.framesDecoded;
            }
            if (typeof value.framesDropped != "undefined") {
              framesDropped = value.framesDropped;
            }
            if (typeof value.framesReceived != "undefined") {
              framesReceived = value.framesReceived;
            }
          } else if (value.type == "outbound-rtp") {
            //TODO: SPLIT AUDIO AND VIDEO BITRATES
            if (value.kind == "audio") {
              audioPacketsSent = value.packetsSent;
            } else if (value.kind == "video") {
              videoPacketsSent = value.packetsSent;
              frameWidth = value.frameWidth;
              frameHeight = value.frameHeight;
            }
            bytesSent += value.bytesSent;
            currentTime = value.timestamp;
            qlr = value.qualityLimitationReason;
            if (value.framesEncoded != null) {
              //audio tracks are undefined here
              framesEncoded += value.framesEncoded;
            }
          } else if (value.type == "track" && typeof value.kind != "undefined" && value.kind == "audio") {
            if (typeof value.audioLevel != "undefined") {
              audioLevel = value.audioLevel;
            }
            if (typeof value.jitterBufferDelay != "undefined" && typeof value.jitterBufferEmittedCount != "undefined") {
              audioJitterAverageDelay = value.jitterBufferDelay / value.jitterBufferEmittedCount;
            }
          } else if (value.type == "track" && typeof value.kind != "undefined" && value.kind == "video") {
            if (typeof value.frameWidth != "undefined") {
              frameWidth = value.frameWidth;
            }
            if (typeof value.frameHeight != "undefined") {
              frameHeight = value.frameHeight;
            }
            if (typeof value.framesDecoded != "undefined") {
              framesDecoded = value.framesDecoded;
            }
            if (typeof value.framesDropped != "undefined") {
              framesDropped = value.framesDropped;
            }
            if (typeof value.framesReceived != "undefined") {
              framesReceived = value.framesReceived;
            }
            if (typeof value.jitterBufferDelay != "undefined" && typeof value.jitterBufferEmittedCount != "undefined") {
              videoJitterAverageDelay = value.jitterBufferDelay / value.jitterBufferEmittedCount;
            }
          } else if (value.type == "remote-inbound-rtp" && typeof value.kind != "undefined") {
            //this is coming when webrtc publishing

            if (typeof value.packetsLost != "undefined") {
              if (value.kind == "video") {
                //this is the packetsLost for publishing
                videoPacketsLost = value.packetsLost;
              } else if (value.kind == "audio") {
                //this is the packetsLost for publishing
                audioPacketsLost = value.packetsLost;
              }
            }
            if (typeof value.roundTripTime != "undefined") {
              if (value.kind == "video") {
                videoRoundTripTime = value.roundTripTime;
              } else if (value.kind == "audio") {
                audioRoundTripTime = value.roundTripTime;
              }
            }
            if (typeof value.jitter != "undefined") {
              if (value.kind == "video") {
                videoJitter = value.jitter;
              } else if (value.kind == "audio") {
                audioJitter = value.jitter;
              }
            }
          } else if (value.type == "media-source") {
            if (value.kind == "video") {
              //returns video source dimensions, not necessarily dimensions being encoded by browser
              width = value.width;
              height = value.height;
              fps = value.framesPerSecond;
            }
          } else if (value.type == "candidate-pair" && value.state == "succeeded" && value.availableOutgoingBitrate != undefined) {
            availableOutgoingBitrate = value.availableOutgoingBitrate / 1000;
          }
        });
        this.remotePeerConnectionStats[streamId].totalBytesReceived = bytesReceived;
        this.remotePeerConnectionStats[streamId].videoPacketsLost = videoPacketsLost;
        this.remotePeerConnectionStats[streamId].audioPacketsLost = audioPacketsLost;
        this.remotePeerConnectionStats[streamId].fractionLost = fractionLost;
        this.remotePeerConnectionStats[streamId].currentTime = currentTime;
        this.remotePeerConnectionStats[streamId].totalBytesSent = bytesSent;
        this.remotePeerConnectionStats[streamId].totalVideoPacketsSent = videoPacketsSent;
        this.remotePeerConnectionStats[streamId].totalAudioPacketsSent = audioPacketsSent;
        this.remotePeerConnectionStats[streamId].audioLevel = audioLevel;
        this.remotePeerConnectionStats[streamId].qualityLimitationReason = qlr;
        this.remotePeerConnectionStats[streamId].totalFramesEncoded = framesEncoded;
        this.remotePeerConnectionStats[streamId].resWidth = width;
        this.remotePeerConnectionStats[streamId].resHeight = height;
        this.remotePeerConnectionStats[streamId].srcFps = fps;
        this.remotePeerConnectionStats[streamId].frameWidth = frameWidth;
        this.remotePeerConnectionStats[streamId].frameHeight = frameHeight;
        this.remotePeerConnectionStats[streamId].videoRoundTripTime = videoRoundTripTime;
        this.remotePeerConnectionStats[streamId].videoJitter = videoJitter;
        this.remotePeerConnectionStats[streamId].audioRoundTripTime = audioRoundTripTime;
        this.remotePeerConnectionStats[streamId].audioJitter = audioJitter;
        this.remotePeerConnectionStats[streamId].framesDecoded = framesDecoded;
        this.remotePeerConnectionStats[streamId].framesDropped = framesDropped;
        this.remotePeerConnectionStats[streamId].framesReceived = framesReceived;
        this.remotePeerConnectionStats[streamId].videoJitterAverageDelay = videoJitterAverageDelay;
        this.remotePeerConnectionStats[streamId].audioJitterAverageDelay = audioJitterAverageDelay;
        this.remotePeerConnectionStats[streamId].availableOutgoingBitrate = availableOutgoingBitrate;
        this.notifyEventListeners("updated_stats", this.remotePeerConnectionStats[streamId]);
        resolve(true);
      }).catch(err => {
        resolve(false);
      });
    });
  }

  /**
   * Called to start a periodic timer to get statistics periodically (5 seconds) for a specific stream.
   *
   * @param {string} streamId : unique id for the stream
   * @param {number} periodMs : period in milliseconds. Default value is 5000 ms.
   */
  enableStats(streamId) {
    var periodMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    if (this.remotePeerConnectionStats[streamId] == null) {
      this.remotePeerConnectionStats[streamId] = new PeerStats(streamId);
      this.remotePeerConnectionStats[streamId].timerId = setInterval(() => {
        this.getStats(streamId);
      }, periodMs);
    }
  }

  /**
   * Called to stop the periodic timer which is set by @enableStats
   *
   * @param {string} streamId : unique id for the stream
   */
  disableStats(streamId) {
    if (this.remotePeerConnectionStats[streamId] != null || typeof this.remotePeerConnectionStats[streamId] != 'undefined') {
      clearInterval(this.remotePeerConnectionStats[streamId].timerId);
      delete this.remotePeerConnectionStats[streamId];
    }
  }

  /**
   * Called to check and start Web Socket connection if it is not started
   */
  checkWebSocketConnection() {
    if (this.webSocketAdaptor == null || this.webSocketAdaptor.isConnected() == false && this.webSocketAdaptor.isConnecting() == false) {
      Logger.debug("websocket url : " + this.websocketURL);
      this.webSocketAdaptor = new WebSocketAdaptor({
        websocket_url: this.websocketURL,
        webrtcadaptor: this,
        callback: (info, obj) => {
          if (info == "closed") {
            this.reconnectIfRequired();
          }
          this.notifyEventListeners(info, obj);
        },
        callbackError: (error, message) => {
          this.notifyErrorEventListeners(error, message);
        },
        debug: this.debug
      });
    }
  }

  /**
   * Called to stop Web Socket connection
   * After calling this function, create new WebRTCAdaptor instance, don't use the the same object
   * Because all streams are closed on server side as well when websocket connection is closed.
   */
  closeWebSocket() {
    for (var key in this.remotePeerConnection) {
      this.closePeerConnection(key);
    }
    //free the remote peer connection by initializing again
    this.remotePeerConnection = new Array();
    this.webSocketAdaptor.close();
  }

  /**
   * @param {string} streamId Called to send a text message to other peer in the peer-to-peer sessionnnection is closed.
   * @param {*} definition
   * @param {*} data
   */
  peerMessage(streamId, definition, data) {
    var jsCmd = {
      command: "peerMessageCommand",
      streamId: streamId,
      definition: definition,
      data: data
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to force AMS to send the video with the specified resolution in case of Adaptive Streaming (ABR) enabled.
   * Normally the resolution is automatically determined by AMS according to the network condition.
   * @param {string}  streamId : unique id for the stream
   * @param {*}  resolution : default is auto. You can specify any height value from the ABR list.
   */
  forceStreamQuality(streamId, resolution) {
    var jsCmd = {
      command: "forceStreamQuality",
      streamId: streamId,
      streamHeight: resolution
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called to send data via DataChannel. DataChannel should be enabled on AMS settings.
   * @param {string} streamId : unique id for the stream
   * @param {*}  data : data that you want to send. It may be a text (may in Json format or not) or binary
   */
  sendData(streamId, data) {
    var CHUNK_SIZE = 16000;
    if (this.remotePeerConnection[streamId] !== undefined) {
      var dataChannel = this.remotePeerConnection[streamId].dataChannel;
      if (dataChannel === undefined || dataChannel === null || typeof dataChannel === 'undefined') {
        Logger.warn('dataChannel is null or undefined');
        return;
      } else if (dataChannel.readyState !== 'open') {
        Logger.warn('dataChannel.readyState is not open: ' + dataChannel.readyState);
        return;
      }
      var length = data.length || data.size || data.byteLength;
      var sent = 0;
      if (typeof data === 'string' || data instanceof String) {
        dataChannel.send(data);
      } else {
        var token = Math.floor(Math.random() * 999999);
        var header = new Int32Array(2);
        header[0] = token;
        header[1] = length;
        dataChannel.send(header);
        var sent = 0;
        while (sent < length) {
          var size = Math.min(length - sent, CHUNK_SIZE);
          var buffer = new Uint8Array(size + 4);
          var tokenArray = new Int32Array(1);
          tokenArray[0] = token;
          buffer.set(new Uint8Array(tokenArray.buffer, 0, 4), 0);
          var chunk = data.slice(sent, sent + size);
          buffer.set(new Uint8Array(chunk), 4);
          sent += size;
          dataChannel.send(buffer);
        }
      }
    } else {
      Logger.warn("Send data is called for undefined peer connection with stream id: " + streamId);
    }
  }

  /**
   * Called by user
   * to add SoundMeter to a stream (remote stream)
   * to measure audio level. This sound Meters are added to a map with the key of StreamId.
   * When user called @getSoundLevelList, the instant levels are provided.
   *
   * This list can be used to add a sign to talking participant
   * in conference room. And also to determine the dominant audio to focus that player.
   * @param {MediaStream} stream
   * @param {string} streamId
   */
  enableAudioLevel(stream, streamId) {
    var soundMeter = new SoundMeter(this.mediaManager.audioContext);

    // Put variables in global scope to make them available to the
    // browser console.
    // this function fetches getSoundLevelList and this list get instant levels from soundmeter directly
    // so we don't need to fill inside of levelCallback here, just pass an empty function
    soundMeter.connectToSource(stream, () => {}, function (e) {
      if (e) {
        alert(e);
        return;
      }
      Logger.debug("Added sound meter for stream: " + streamId + " = " + soundMeter.instant.toFixed(2));
    });
    this.soundMeters[streamId] = soundMeter;
  }

  /**
   * Called by the user
   * to get the audio levels for the streams for the provided StreamIds
   *
   * @param {*} streamsList
   */
  getSoundLevelList(streamsList) {
    for (var i = 0; i < streamsList.length; i++) {
      this.soundLevelList[streamsList[i]] = this.soundMeters[streamsList[i]].instant.toFixed(2);
    }
    this.notifyEventListeners("gotSoundList", this.soundLevelList);
  }

  /**
   * Called media manaher to get video/audio sender for the local peer connection
   *
   * @param {string} streamId :
   * @param {string} type : "video" or "audio"
   * @returns
   */
  getSender(streamId, type) {
    var sender = null;
    if (this.remotePeerConnection[streamId] != null) {
      sender = this.remotePeerConnection[streamId].getSenders().find(function (s) {
        return s.track.kind == type;
      });
    }
    return sender;
  }

  /**
   * Called by user
   *
   * @param {string} videoTrackId : track id associated with pinned video
   * @param {string} streamId : streamId of the pinned video
   * @param {boolean} enabled : true | false
   * @returns
   */
  assignVideoTrack(videoTrackId, streamId, enabled) {
    var jsCmd = {
      command: "assignVideoTrackCommand",
      streamId: streamId,
      videoTrackId: videoTrackId,
      enabled: enabled
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called by user
   * video tracks may be less than the participants count
   * so these parameters are used for assigning video tracks to participants.
   * This message is used to make pagination in conference.
   * @param {string} streamId
   * @param {number} offset : start index for participant list to play
   * @param {number} size : number of the participants to play
   * @returns
   */
  updateVideoTrackAssignments(streamId, offset, size) {
    var jsCmd = {
      streamId: streamId,
      command: "updateVideoTrackAssignmentsCommand",
      offset: offset,
      size: size
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called by user
   * This message is used to set max video track count in a conference.
   * @param {string} streamId
   * @param {number} maxTrackCount : maximum video track count
   * @returns
   */
  setMaxVideoTrackCount(streamId, maxTrackCount) {
    var jsCmd = {
      streamId: streamId,
      command: "setMaxVideoTrackCountCommand",
      maxTrackCount: maxTrackCount
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Called by user
   * This message is used to send audio level in a conference.
   *
  * IMPORTANT: AMS v2.7+ can get the audio level from the RTP header and sends audio level to the viewers the same way here.
   *  Just one difference, AMS sends the audio level in the range of 0 and 127. 0 is max, 127 is ms
    *  It means that likely you don't need to send UPDATE_AUDIO_LEVEL anymore
   *
   * @param {string} streamId
   * @param {*} value : audio level
   * @returns
   */
  updateAudioLevel(streamId, value) {
    var jsCmd = {
      streamId: streamId,
      eventType: "UPDATE_AUDIO_LEVEL",
      audioLevel: value
    };
    this.sendData(streamId, JSON.stringify(jsCmd));
  }

  /**
   * Called by user
   * This message is used to get debug data from server for debugging purposes in conference.
   * @param {string} streamId
   * @returns
   */
  getDebugInfo(streamId) {
    var jsCmd = {
      streamId: streamId,
      command: "getDebugInfo"
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
  * Register user push notification token to Ant Media Server according to subscriberId and authToken
  * @param {string} subscriberId: subscriber id it can be anything that defines the user
  * @param {string} authToken: JWT token with the issuer field is the subscriberId and secret is the application's subscriberAuthenticationKey, 
  * 							  It's used to authenticate the user - token should be obtained from Ant Media Server Push Notification REST Service
  * 							  or can be generated with JWT by using the secret and issuer fields
  * 
  * @param {string} pushNotificationToken: Push Notification Token that is obtained from the Firebase or APN
  * @param {string} tokenType: It can be "fcm" or "apn" for Firebase Cloud Messaging or Apple Push Notification
  * 
  * @returns Server responds this message with a result.
  * Result message is something like 
  * {
  * 	  "command":"notification",
  *    "success":true or false
  *    "definition":"If success is false, it gives the error message",
  * 	  "information":"If succeess is false, it gives more information to debug if available"
  * 
  * }	 
  *                            
  */
  registerPushNotificationToken(subscriberId, authToken, pushNotificationToken, tokenType) {
    var jsCmd = {
      command: "registerPushNotificationToken",
      subscriberId: subscriberId,
      token: authToken,
      pnsRegistrationToken: pushNotificationToken,
      pnsType: tokenType
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Send push notification to subscribers
   * @param {string} subscriberId: subscriber id it can be anything(email, username, id) that defines the user in your applicaiton
   * @param {string} authToken: JWT token with the issuer field is the subscriberId and secret is the application's subscriberAuthenticationKey,
   *                               It's used to authenticate the user - token should be obtained from Ant Media Server Push Notification REST Service
   *                              or can be generated with JWT by using the secret and issuer fields
   * @param {string} pushNotificationContent: JSON Format - Push Notification Content. If it's not JSON, it will not parsed
   * @param {Array} subscriberIdsToNotify: Array of subscriber ids to notify
   * 
   * @returns Server responds this message with a result.
   * Result message is something like 
   * {
   * 	  "command":"notification",
   *    "success":true or false
   *    "definition":"If success is false, it gives the error message",
   * 	  "information":"If succeess is false, it gives more information to debug if available"
   * 
   * }	 
   */
  sendPushNotification(subscriberId, authToken, pushNotificationContent, subscriberIdsToNotify) {
    //type check for pushNotificationContent if json
    if (typeof pushNotificationContent !== "object") {
      Logger.error("Push Notification Content is not JSON format");
      throw new Error("Push Notification Content is not JSON format");
    }

    //type check if subscriberIdsToNotify is array
    if (!Array.isArray(subscriberIdsToNotify)) {
      Logger.error("subscriberIdsToNotify is not an array. Please put the subscriber ids to notify in an array such as [user1], [user1, user2]");
      throw new Error("subscriberIdsToNotify is not an array. Please put the subscriber ids to notify in an array such as [user1], [user1, user2]");
    }
    var jsCmd = {
      command: "sendPushNotification",
      subscriberId: subscriberId,
      token: authToken,
      pushNotificationContent: pushNotificationContent,
      subscriberIdsToNotify: subscriberIdsToNotify
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * Send push notification to topic
   * @param {string} subscriberId: subscriber id it can be anything(email, username, id) that defines the user in your applicaiton
   * @param {string} authToken: JWT token with the issuer field is the subscriberId and secret is the application's subscriberAuthenticationKey,	
   *                              It's used to authenticate the user - token should be obtained from Ant Media Server Push Notification REST Service
   *                             or can be generated with JWT by using the secret and issuer fields
   * @param {string} pushNotificationContent:JSON Format - Push Notification Content. If it's not JSON, it will not parsed
   * @param {string} topic: Topic to send push notification
   * 
   * @returns Server responds this message with a result.
   * Result message is something like
   * {
   *     "command":"notification",
   *     "success":true or false
   *     "definition":"If success is false, it gives the error message",
   *     "information":"If succeess is false, it gives more information to debug if available"
   * }
   * 
   */
  sendPushNotificationToTopic(subscriberId, authToken, pushNotificationContent, topic) {
    //type check for pushNotificationContent if json
    if (typeof pushNotificationContent !== "object") {
      Logger.error("Push Notification Content is not JSON format");
      throw new Error("Push Notification Content is not JSON format");
    }
    var jsCmd = {
      command: "sendPushNotification",
      subscriberId: subscriberId,
      token: authToken,
      pushNotificationContent: pushNotificationContent,
      topic: topic
    };
    this.webSocketAdaptor.send(JSON.stringify(jsCmd));
  }

  /**
   * The following messages are forwarded to MediaManager. They are also kept here because of backward compatibility.
   * You can find the details about them in media_manager.js
   * @param {string} streamId
   * @returns 
   */
  turnOffLocalCamera(streamId) {
    return this.mediaManager.turnOffLocalCamera(streamId);
  }
  /**
   *
   * @param {string} streamId
   * @returns
   */
  turnOnLocalCamera(streamId) {
    return this.mediaManager.turnOnLocalCamera(streamId);
  }
  muteLocalMic() {
    this.mediaManager.muteLocalMic();
  }
  unmuteLocalMic() {
    this.mediaManager.unmuteLocalMic();
  }
  /**
   *
   * @param {string} streamId
   * @returns
   */
  switchDesktopCapture(streamId) {
    return this.mediaManager.switchDesktopCapture(streamId);
  }

  /**
   * Switch to Video camera capture again. Updates the video track on the fly as well.
   * @param {string} streamId
   * @param {string} deviceId
   * @returns {Promise}
   */
  switchVideoCameraCapture(streamId, deviceId, onEndedCallback) {
    return this.mediaManager.switchVideoCameraCapture(streamId, deviceId, onEndedCallback);
  }

  /**
   * Update video track of the stream. Updates the video track on the fly as well.
   * @param {string} stream
   * @param {string} streamId
   * @param {function} onEndedCallback
   * @param {boolean} stopDesktop
   * @returns {Promise}
   */
  updateVideoTrack(stream, streamId, onEndedCallback, stopDesktop) {
    return this.mediaManager.updateVideoTrack(stream, streamId, onEndedCallback, stopDesktop);
  }

  /**
   * Update audio track of the stream. Updates the audio track on the fly as well. It just replaces the audio track with the first one in the stream
   * @param {*} stream
   * @param {*} streamId
   * @param {*} onEndedCallback
   * @returns
   */
  updateAudioTrack(stream, streamId, onEndedCallback) {
    return this.mediaManager.updateAudioTrack(stream, streamId, onEndedCallback);
  }

  /**
   * Called by User
   * to switch between front and back camera on mobile devices
   *
   * @param {string} streamId Id of the stream to be changed.
   * @param {string} facingMode it can be ""user" or "environment"
   *
   * This method is used to switch front and back camera.
   */
  switchVideoCameraFacingMode(streamId, facingMode) {
    return this.mediaManager.switchVideoCameraFacingMode(streamId, facingMode);
  }
  /**
   *
   * @param {string} streamId
   * @returns
   */
  switchDesktopCaptureWithCamera(streamId) {
    return this.mediaManager.switchDesktopCaptureWithCamera(streamId);
  }
  /**
   *
   * @param {string} streamId
   * @param {string} deviceId
   * @returns
   */
  switchAudioInputSource(streamId, deviceId) {
    return this.mediaManager.switchAudioInputSource(streamId, deviceId);
  }
  /**
   *
   * @param {number} volumeLevel
   */
  setVolumeLevel(volumeLevel) {
    this.mediaManager.setVolumeLevel(volumeLevel);
  }
  /**
   *
   * Using sound meter in order to get audio level may cause audio distortion in Windows browsers
   * @param {Function} levelCallback
   * @param {number} period
   * @returns
   */
  enableAudioLevelForLocalStream(levelCallback, period) {
    return this.mediaManager.enableAudioLevelForLocalStream(levelCallback);
  }
  disableAudioLevelForLocalStream() {
    this.mediaManager.disableAudioLevelForLocalStream();
  }
  /**
   *
   * @param {object} constraints
   * @returns
   */
  applyConstraints(constraints) {
    return this.mediaManager.applyConstraints(constraints);
  }
  /**
   *
   * @param {number} bandwidth
   * @param {string} streamId
   */
  changeBandwidth(bandwidth, streamId) {
    this.mediaManager.changeBandwidth(bandwidth, streamId);
  }
  enableAudioLevelWhenMuted() {
    return this.mediaManager.enableAudioLevelWhenMuted();
  }
  disableAudioLevelWhenMuted() {
    this.mediaManager.disableAudioLevelWhenMuted();
  }
  /**
   *
   * @param {string} streamId
   * @returns
   */
  getVideoSender(streamId) {
    return this.mediaManager.getVideoSender(streamId);
  }
  /**
   *
   * @param {MediaStreamConstraints} mediaConstraints : media constraints to be used for opening the stream
   * @param {string} streamId : id of the stream to replace tracks with
   * @returns
   */
  openStream(mediaConstraints, streamId) {
    return this.mediaManager.openStream(mediaConstraints, streamId);
  }
  closeStream() {
    return this.mediaManager.closeStream();
  }
}

/* The Information Callbacks Called by This Class */
//TODO:

/* The Error Callbacks Called by This Class */
//TODO:
/**
 * @type {Array<Function>}
 */
_defineProperty(WebRTCAdaptor, "pluginInitMethods", new Array());

export { WebRTCAdaptor as W, _defineProperty as _, WebSocketAdaptor as a, _classPrivateMethodInitSpec as b, _classPrivateFieldInitSpec as c, _asyncToGenerator as d, _classPrivateFieldSet as e, _classPrivateFieldGet as f, _classPrivateMethodGet as g };
