import React from 'react'
import ReactPlayer from "react-player";
import { FaCamera} from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { FaMicrophone,FaMicrophoneSlash } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { MdVideoCameraFront } from "react-icons/md";


const WebCam = ({ remoteSocketId, myStream, hidebtn, sendStreams, handleCallUser, remoteStream, toggleVideo, toggleMic, isMicMuted, isVideoOff, other }) => {
    return (
        <div>
            <p>{remoteSocketId ? "Connected" : "No one in room"}</p>
            {
                myStream && !hidebtn && remoteSocketId && (
                    <button
                        className={`w-12 h-12 flex items-center justify-center rounded-full bg-white`}
                        onClick={sendStreams}>
                        <MdVideoCameraFront />
                    </button>
                )
            }
            {
                remoteSocketId && !hidebtn && (
                    <button
                        className={`w-12 h-12 flex items-center justify-center rounded-full bg-white`}
                        onClick={handleCallUser}
                    >
                        <IoVideocam />
                    </button>
                )
            }
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {myStream && (
                    <div style={{ textAlign: 'center', margin: '10px' }}>
                        <ReactPlayer
                            playing
                            muted
                            height="150px"
                            width="150px"
                            url={myStream}
                        />My Stream
                    </div>
                )}
                {remoteStream && (
                    <div style={{ textAlign: 'center', margin: '10px' }}>
                        <ReactPlayer
                            playing
                            height="150px"
                            width="150px"
                            url={remoteStream}
                        />Remote Stream
                    </div>
                )}
            </div>
            <div>
                <div className="flex items-center justify-center space-x-4">
                    <button
                        className={`w-12 h-12 flex items-center justify-center rounded-full bg-white ${isVideoOff ? 'bg-opacity-50' : 'bg-opacity-100'
                            }`}
                        onClick={() => { toggleVideo() }}
                    >
                      {isVideoOff?<FaCamera />:<CiCamera/>}
                    </button>
                    <button
                        className={`w-12 h-12 flex items-center justify-center rounded-full bg-white  ${isMicMuted ? 'bg-opacity-50' : 'bg-opacity-100'
                            }`}
                        onClick={() => { toggleMic() }}
                    >
                        {isMicMuted?<FaMicrophone />:<FaMicrophoneSlash/>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WebCam;