

let instance,
    videoSound,
    sfxSound,
    isGlobalMuted = false;

class SoundManager{
    constructor(){
        if(!instance) instance = this;
        return instance;
    }

    /**
     * 
     * @param {WebRTCPlayer} v WebRTCPlayer 
     */
    setVideo(v){
        videoSound = v;
    }

    muteVideo(){
        if(!videoSound) return;
        videoSound.mute() 
    }

    unmuteVideo(){
        if(!videoSound) return;
        if(isGlobalMuted == true) return;
        videoSound.unmute()
    }

    globalMute(){
        isGlobalMuted = true;
        this.muteVideo()
    }

    globalUnmute(){
        isGlobalMuted = false;
        this.unmuteVideo()
    }

    // TODO: Add all sound effects here


}

export default new SoundManager();