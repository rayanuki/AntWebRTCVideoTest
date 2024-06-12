<script setup>
import { ref, onMounted } from 'vue'
import WebRTCPlayer from '@/tools/WebRTCPlayer.js';

let isStopped = true,
streamTout = 0,
scrollTout = 0;

const txtWsUrl = ref(''),
  txtWSId = ref(''),
  txtToken = ref(''),
  textLogs = ref(),
  stopCounter = ref(0),
  streamValues = ref([]),
  isAutoMuted = ref(false),
  logArr = ref([]),
  txtLogs = ref('');

const videoHandler = (d)=>{
    console.log("Video Handler", d.status);
    switch (d.status.toString()) {
        case 'PLAY':
          addLogs('PLAY');
          stopCounter.value = 0;
        break;
        case 'STOP':
            // isNotPlaying.value = true;
            //TODO: show disconnection, try to reconnect..
            // setTimeout( ()=>{

            //     WebRTCPlayer.tryPlayAgain();
            // }, 3000);
            isStopped = true;
          // addLogs('STOP');
          // clearLogs();
        break;
        case 'RESET':
            // isNotPlaying.value = true;
            //TODO: show disconnection, try to reconnect.. 
          addLogs('RESET');
        break;
        case 'LOW_BANDWIDTH':
          addLogs('LOW BANDWIDTH');
        break;
        case 'BITRATE':
          addLogs('BITRATE: {AUDIO: '+ d.value.audioBitrate + ', VIDEO: '+ d.value.videoBitrate + '}');
          // addLogs('TARGET BITRATE: '+ d.value.targetBitrate);
        break;
        case 'RESOLUTION_CHANGE':
          console.log("resolution change:", d.value);
          addLogs('CHANGE RESOLUTION: '+ d.value)
        break;
        case 'STREAM_INFO':
        console.log("stream info:", d.value);
        streamValues.value = d.value.streamInfo;
        const array = d.value.streamInfo;
        // IMPORTANT NOTE: USE streamInfo.streamHeight for WebRTCPlayer.forceStreamQuality()
        let toString = obj => Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join(', ');
        let info = '';
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          info += '[' + toString(element) + ']\n';
        }
        addLogs('*******\nSTREAM_INFO:\n'+ info +'*******')
        break;
        case 'MUTE':
        break;
        case 'UNMUTE':
        break;
        case 'ERROR':
            // console.log(d.code);
          addLogs('ERROR: '+ d.code)
            switch (d.code) {
                case 'no_stream_exist':
                case 'WebSocketNotConnected':
                case 'not_initialized_yet':
                case 'data_store_not_available':
                    // isNotPlaying.value = true;
                    // TODO: show VIDEO NOT AVAILABLE error and try to reconnect again
                    // isStopped = true;
                    // clearTimeout(streamTout);
                    // streamTout = setTimeout(()=>{
                    //   WebRTCPlayer.tryPlayAgain();
                    // }, 1000);
                break;
                case 'notSetRemoteDescription':

                break;
                case 'highResourceUsage':

                break;
                case 'already_playing':

                break;
                case 'user_action':
                    // TODO: THIS ERROR MEANS USER ACTION IS REQUIRED.
                    addLogs("Playing muted");
                    isAutoMuted.value = true;
                    WebRTCPlayer.mute();
                break;
                case 'unauthorized_access':
                  alert("TOKEN REQUIRED!")
                  WebRTCPlayer.destroy();
                break;
                default:
                break;
            }
            // emits('on-error', d.code);
        break;
        case 'DESTROY':
            // emits('on-destroy');  
            clearLogs();
        break;
        case 'CLOSED':
        case 'FINISHED':
            // emits('on-destroy');  
            // setTimeout( ()=>{
            //     WebRTCPlayer.resetVideo();
            // }, 1000);
            stopCounter.value += 1;
            addLogs(d.status + ': ' + stopCounter.value);
            addLogs('retrying..');
            // clearTimeout(streamTout);
            // streamTout = setTimeout(()=>{
            //   WebRTCPlayer.tryPlayAgain();
            // }, 1000);
            // WebRTCPlayer.destroy();
        break;
        default:
          addLogs('INFO: '+ d.status + ': ' + stopCounter.value);
    }
}, 

addLogs = (params) => {
  if(logArr.value.length > 50) logArr.value.shift();
  logArr.value.push(params);
  txtLogs.value = '';
  
  logArr.value.forEach(element => {
    txtLogs.value += element + '\n';
  });
  clearTimeout(scrollTout);
  scrollTout = setTimeout(()=>{
    textLogs.value.scrollTop = textLogs.value.scrollHeight;
  }, 500);
},

clearLogs = (params) => {
  txtLogs.value = '';
},

onSlowww = (params) => {
  if(params == 0) addLogs("VIDEO BANDWIDTH SET TO AUTO");
  WebRTCPlayer.forceStreamQuality(params);
},

onPlayVideo = ()=>{
    stopCounter.value = 0;
    streamValues.value = [];
    WebRTCPlayer.setVideoHandler(videoHandler);
    WebRTCPlayer.playVideo(txtWsUrl.value, txtWSId.value, document.getElementById('videoContainer'), txtToken.value, videoHandler);
},

unmuteVideo = (params) => {
  addLogs("VIDEO UNMUTED");
  WebRTCPlayer.unmute();
  isAutoMuted.value = false;
},

onStopVideo = ()=>{
  stopCounter.value = 0;
  WebRTCPlayer.destroy();
  streamValues.value = [];
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search),
    id = urlParams.get('id'),
    url = urlParams.get('url') ? decodeURIComponent(urlParams.get('url')):'',
    token = urlParams.get('token') ? decodeURIComponent(urlParams.get('token')):'',
    isAutoplay = urlParams.get('auto') ? decodeURIComponent(urlParams.get('auto')): '';
  txtWSId.value = id;
  txtWsUrl.value = url;
  txtToken.value = token;

  if(isAutoplay && isAutoplay == 'true'){
    setTimeout(onPlayVideo, 1000);
  }
})

</script>

<template>
  <div class="container">
    <video disablePictureInPicture playsinline id="videoContainer"></video>
    <input v-model="txtWsUrl" type="text" placeholder="Ant Video URL">
    <input v-model="txtWSId" type="text" placeholder="Stream ID">
    <input v-model="txtToken"  type="text" placeholder="Token">
    
    <div class="button-container">
      <button @click="onPlayVideo">PLAY VIDEO</button>
      <button @click="onStopVideo">STOP VIDEO</button>
    </div>
    <div style="width: 100%; text-align: center;">
      FORCE BANDWIDTH:
    </div>
    <div class="bandwidth-cont">
      <button @click="onSlowww(0)">AUTO</button>
      <button v-for="(item, index) in streamValues" :key="index" @click="onSlowww(item.streamHeight)">{{ item.streamHeight }}</button>
    </div>
  <textarea id="textareaLogs" ref="textLogs" readonly class="nl-log" :value="txtLogs" />
  <button v-if="isAutoMuted" @click="unmuteVideo" class="mute-overlay">
  </button>
  </div>
</template>

<style scoped>

.mute-overlay{
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background-color: rgba(0,0,0,0);
  color: #fff;
  font-weight: bold;
}

.nl-log{
  border: solid 1px black;
  height: 150px;
  width: 100%;
  padding: 1em;
  overflow-x: hidden;
  overflow-y: auto;
}

.bandwidth-cont{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  padding: 1em;
  font-weight: bold;
  flex-wrap: wrap;
}

.button-container{
  width: 100%;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1em;
  gap: 1em;
}

.container{
  width: 100%;
  padding: 1em;
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
}

video{
  width: calc(100% - 10px);
  height: auto;
  background-color: #000;
  aspect-ratio: 16/9;
}

input{
  margin-top: 10px;
  width: calc(100% - 10px);
  padding: 6px;
  font-size: large;
}

button{
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 2em;
  cursor: pointer;
}

/* xl */
@media (min-width: 1280px) {
  input{
    font-size: medium;
  }

  button{
    font-size: medium;
  }
}
</style>
