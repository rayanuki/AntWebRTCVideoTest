import { WebRTCAdaptor } from "./webrtc2/webrtc_adaptor";

let instance,
    streamId,
    vidUrl,
    vidTagId,
    videodiv,
    token,
    videoHandler,
    connectionChecker = 0,
    replayTimeout = 0,
    webRTCAdaptor = null,
    iceConnected = false,
    isPlaying = false,
    isDestroyed = false;

// const noStreamCallback = ()=>{
    // TODO: SHOULD BE HANDLED OUTSIDE THE CLASS WHEN THE VIDEO STOPPED
//         setTimeout(function () {
//             if(webRTCAdaptor)webRTCAdaptor.getStreamInfo(streamId);
//         }, 3000);
//         console.log("Trying to play with webrtc again");
//     },
    
const playWebRTCVideo = ()=>{
        if (videodiv == null) return;
        videodiv.play().then(()=>{
            console.log("VIDEO PLAYING");
            isPlaying = true;
            clearTimeout(replayTimeout);
            if(videoHandler) videoHandler({
                status:"PLAY",
                count:0
            })
        }).catch(()=>{
            console.log("User interaction needed to start playing");
            isPlaying = false;
            if(videoHandler) videoHandler({status:"ERROR", code:'user_action'});
            clearTimeout(replayTimeout);
            replayTimeout = setTimeout(function(){
                playWebRTCVideo();
                // videodiv.play();
            }, 2000);
        })
    };


class WebRTCPlayer{
    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }

    initializeWebRTCPlayer(websocketURL, idx, vidId, tkn, subscriberId, subscriberCode){
        let pc_config = {
            // 'iceServers': [
            //     { 'urls': 'stun:stun.l.google.com:19302'},
            //     { 'urls': "stun:stun.l.google.com:5349" },
            //     { 'urls': "stun:stun1.l.google.com:3478" },
            //     { 'urls': "stun:stun1.l.google.com:5349" },
            //     { 'urls': "stun:stun2.l.google.com:19302" },
            //     { 'urls': "stun:stun2.l.google.com:5349" },
            //     { 'urls': "stun:stun3.l.google.com:3478" },
            //     { 'urls': "stun:stun3.l.google.com:5349" },
            //     { 'urls': "stun:stun4.l.google.com:19302" },
            //     { 'urls': "stun:stun4.l.google.com:5349" }
            // ]
        },
        sdpConstraints = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true

        },
        mediaConstraints = {
            video: false,
            audio: false
        };

        iceConnected = false;

        streamId = idx;
        vidUrl = websocketURL;
        vidTagId = vidId;
        token = tkn ? tkn : '';

        webRTCAdaptor = new WebRTCAdaptor({
            websocket_url: websocketURL,
            mediaConstraints: mediaConstraints,
            peerconnection_config: pc_config,
            sdp_constraints: sdpConstraints,
            remoteVideoId: vidId,
            isPlayMode: true,
            debug: false,
            callback: function(info, description){
                clearTimeout(connectionChecker);
                connectionChecker = setTimeout(function(){
                        //no connection
                    if(videoHandler) videoHandler({status:"RESET", count: 0});
                }, 10000);
                switch (info) {
                    case 'initialized':
                            console.log("initialized");
                            iceConnected = false;
                            webRTCAdaptor.getStreamInfo(streamId);
                        break;
                        case 'streamInformation':
                            console.log("stream information");
                            videoHandler({status:"STREAM_INFO", value: description})
                            webRTCAdaptor.play(streamId, token, "",[] ,subscriberId, subscriberCode);
                        break;
                        case 'play_started':
                            console.log("play started");
                            clearTimeout(replayTimeout);
                            playWebRTCVideo(); 
                        break;
                        case 'play_finished':
                            console.log("play finished");
                            if(isDestroyed == true) return;
                            // if(noStreamCallback)noStreamCallback();
                            if(videoHandler) videoHandler({status:"FINISHED"});
                            // webRTCAdaptor.play(streamId, token, "",[] ,subscriberId, subscriberCode);
                            isPlaying = false;
                            
                        break;
                        case 'closed':
                            console.log("play finished");
                            console.log("Websocket connecton closed: " + (typeof description != "undefined" ? JSON.stringify(description) : ""));
                            if(isDestroyed == true) return;
                            // if(noStreamCallback)noStreamCallback();
                            if(videoHandler) videoHandler({status:"CLOSED"});
                            isPlaying = false;
                        break;
                        case 'bitrateMeasurement':
                            console.debug(description);
                            if(videoHandler) videoHandler({status:"BITRATE", value: description})
                            if (description.audioBitrate + description.videoBitrate > description.targetBitrate) {                       
                                // if(videoHandler) videoHandler({status:"LOW_BANDWIDTH"})
                            }
                        break;
                        case 'ice_connection_state_changed':
                            if (description.state == "connected" || description.state == "completed") {
                                //it means the ice connection has been established
                                iceConnected = true;
                            }
                        break;
                        case 'resolutionChangeInfo':
                            console.log("Resolution is changed to " + description["streamHeight"]);
                            if(videoHandler) videoHandler({
                                status:"RESOLUTION_CHANGE", 
                                value: description["streamHeight"]
                            })
                            if(videodiv) {
                                instance.getVideo().pause();
                                setTimeout(function () { instance.getVideo().play();}, 1000);
                            }
                        break;
                        case 'server_will_stop':
                            console.log("Server will stop soon");
                            if(videoHandler) videoHandler({status:"server_will_stop"});
                            isPlaying = false;
                        break;
                        case 'data_channel_closed':
                            console.log("Video server was closed");
                            if(videoHandler) videoHandler({status:"data_channel_closed"});

                            isPlaying = false;
                        break;
                        default: 
                            if(info != 'pong') {
                                console.log("CALLBACK INFO:", info, description);
                                if(videoHandler) videoHandler({status:info, value:description});
                            }
                }
            },
            callbackError: function (error) {
                console.log(error.toString());
                // let err =  JSON.stringify(error);
                const err = error.toString();
                // console.log("error callback: " + err, isDestroyed);
                if(videoHandler) videoHandler({status:"ERROR", code: err});
                // switch (err) {
                //     case "no_stream_exist":
                //     case "WebSocketNotConnected":
                //     case "not_initialized_yet":
                //     case "data_store_not_available":
                //         // if(isDestroyed == true) return;
                //         // if(noStreamCallback)noStreamCallback();

                //         // if(videoHandler) videoHandler({status:"ERROR", code: err});
                //         isPlaying = false;
                //     break;
                //     case "notSetRemoteDescription":
                //         // if(videoHandler) videoHandler({status:"ERROR", code: err});
                //     break;
                //     case "highResourceUsage":
                //         // if(videoHandler) videoHandler({status:"RESET", code: 0});
                //     break;
                //     case 'already_playing':
                //         // if(videoHandler) videoHandler({status:"RESET", code: 0});
                //     break;
                //     case 'unauthorized_access':
                //         // if(videoHandler) videoHandler({status:"ERROR", code: err});
                //     break;
                //     default:
                //         if(isDestroyed == true) return;
                //         // if(noStreamCallback)noStreamCallback();
                //         isPlaying = false;
                // }                    
            }
        });
    }

    setVideoHandler(fn){
        videoHandler = fn;
    }

    playVideo(url, id, vidtag, tkn, fn){
        if(webRTCAdaptor != null){
            this.destroy();
        }
        if(fn) videoHandler = fn
        isDestroyed = false;
        videodiv = vidtag;
        this.initializeWebRTCPlayer(url, id, vidtag.id, tkn, null, null)
    }

    forceStreamQuality(n){
        if(webRTCAdaptor)webRTCAdaptor.forceStreamQuality(streamId, n)
    }

    tryPlayAgain(){
        if(webRTCAdaptor)webRTCAdaptor.stop(streamId);
        if(webRTCAdaptor)webRTCAdaptor.getStreamInfo(streamId);
        console.log("Trying to play with webrtc again");
    }

    resetVideo(){
        if(webRTCAdaptor)webRTCAdaptor.stop(streamId);
        if(webRTCAdaptor)webRTCAdaptor.closeWebSocket();
        webRTCAdaptor = null;
        iceConnected = false;
        isPlaying = false;
        setTimeout(()=>{
            this.initializeWebRTCPlayer(vidUrl, streamId, vidTagId, token, null, null);
        }, 3000);
    }

    getVideo(){
        return videodiv;
    }

    updateVideo(id, t){
        if(webRTCAdaptor && streamId != '')webRTCAdaptor.stop(streamId);
        if(webRTCAdaptor)webRTCAdaptor.play(id, t);
        streamId = id;
        token = t;
    }

    mute(){
        if(videodiv)videodiv.muted = true;
        if(videoHandler) videoHandler({status:"MUTE"})
    }

    unmute(){
        if(videodiv)videodiv.muted = false;
        if(videoHandler) videoHandler({status:"UNMUTE"})
    }

    isPlaying(){
        return isPlaying;
    }

    getIce(){
        return iceConnected;
    }

    getSound(){
        console.log('Video Sound:', videodiv.muted);
        return !videodiv.muted;
    }

    destroy(){
        if(webRTCAdaptor) webRTCAdaptor.stop(streamId);
        if(webRTCAdaptor) webRTCAdaptor.closeWebSocket();
        isDestroyed = true;
        if(videoHandler) videoHandler({status:"DESTROY"})
        videoHandler = null;
        webRTCAdaptor = null;

        streamId = '';
        vidUrl = '';
        vidTagId = '';
        videodiv = null;
        
        token = null;
        mute = false;
        iceConnected = false;
        isPlaying = false;
    }
}

export default new WebRTCPlayer()