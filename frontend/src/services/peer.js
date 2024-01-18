class PeerService{
    constructor(){
        if(!this.peer){
            this.peer = new RTCPeerConnection(
                {
                    iceServers: [  {
                        urls: [
                          "stun:stun.l.google.com:19302",
                          "stun:global.stun.twilio.com:3478",
                        ],
                      },]
                }
            )
        }
        this.peer.oniceconnectionstatechange = this.handleIceConnectionStateChange.bind(this);
    }
    async getAnswer(offer){
        if(this.peer){
            await this.peer.setRemoteDescription(offer)
            const ans = await this.peer.createAnswer()
            await this.peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
        }
    }
    async setLocalDescription(ans){
        if(this.peer){
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }
    async getOffer(){
        if(this.peer){
            const offer = await this.peer.createOffer()
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
        }
    }
    async handleIceConnectionStateChange() {
        console.log('ICE Connection State:', this.peer.iceConnectionState);
    
        if (this.peer.iceConnectionState === 'disconnected' || this.peer.iceConnectionState === 'closed') {
          this.cleanup();
        }
      }
    
    async cleanup() {
        // Perform cleanup tasks when the connection is closed
        console.log('Cleaning up...');
        if (this.peer) {
           
        // Close the peer connection
        this.peer.close();
        
      }
    }
     
  
}

export default new PeerService();