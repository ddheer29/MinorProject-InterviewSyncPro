import React, { useCallback, useEffect, useRef, useState } from 'react'
import CodeEditor from '../CodeEditor'
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import './Room.css'
import io from 'socket.io-client'
import { ChatBot } from '../ChatBot'
import RoomHeader from '../Layout/RoomHeader'
import { useSocket } from '../../context/SocketProvider'
import peer from "../../services/peer";
import { CssHighlightRules } from 'ace-builds/src-noconflict/mode-html'
import ConnectedUsers from '../ConnectedUsers'
import WebCam from '../WebCam'


const Room = () => {
    const socket1 = useSocket();
    const [socket, setsocket] = useState(null);
    useEffect(() => {
        const socket = io('http://localhost:8080');
        console.log(socket);
        setsocket(socket)
        return () => {
            setsocket(null);
        }
    }, [])
    const navigate = useNavigate();
    const { roomId } = useParams()
    const [language, setLanguage] = useState('javascript');
    const [codeKeyBinding, setCodeKeyBinding] = useState(undefined);
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const languagesAvailable = ["javascript", "typescript", "python", "java", "yaml", "golang", "c_cpp", "html", "css"]
    const codeKeyBindingsAvailable = ["default", "emacs", "vim"];
    const [code, setcode] = useState("");
    const AceEditorRef = useRef(null);
    const [input, setinput] = useState('');
    const [output, setoutput] = useState('');
    var qs = require('qs');
    const handleLanguage = (e) => {
        setLanguage(e.target.value);
    }
    const handleCodeKeyBinding = (e) => {
        setCodeKeyBinding(e.target.value === 'default' ? undefined : e.target.value);
    }
    const generateRandomColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xff;
            color += value.toString(16).padStart(2, '0');
        }
        return color;
    }
    const copyToClipboard = (text) => {
        try {
            navigator.clipboard.writeText(text)
            toast.success('Copied to clipboard')
        } catch (error) {
            console.log(error)
        }
    }
    function handleChange(change) {
        setcode(change);
        if (socket) {
            socket.emit('codechange', { code: change })
        }
    }
    useEffect(() => {
        if (socket !== null) {
            socket.on('codeadded', (codeData) => {
                console.log(codeData.code);
                const newText = codeData.code
                setcode(newText);
            })
            socket.on('outputchange', (outputData) => {
                setoutput(outputData)
            })
            socket.on('inputchange', (inputData) => {
                setinput(inputData)
            })
            socket.on('connected', (users) => {
                const arrayData = JSON.parse(users);
                console.log(arrayData);
                setFetchedUsers([...arrayData])
            })

        }
    })
    console.log(fetchedUsers);

    const UsersExcept = fetchedUsers.filter((user) => user != localStorage.getItem('username'))
    console.log();
    let other = 'NA';
    if (localStorage.getItem('username') && UsersExcept.length != 0) {
        other = UsersExcept[0];
    }
    useEffect(() => {
        if (output && socket) {
            socket.emit('outputchange', output);
        }
    }, [output, socket])
    useEffect(() => {
        if (socket && localStorage.getItem('username')) {
            console.log("joiing sending ");
            const username = localStorage.getItem('username');
            socket.emit('joined', {
                roomId,
                username
            });
        }
    }, [socket])

    function InputHandler(event) {
        socket.emit('inputchange', event.target.value);
        setinput(event.target.value)
    }

    const compile = () => {
        var data = qs.stringify({
            'code': code,
            'language': language,
            'input': input
        });
        console.log(data);

        console.log(code);
        var config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        };
        fetch('https://api.codex.jaagrav.in', config)
            .then(res => res.json())
            .then(data => {
                if (data['error'].length == 0) {
                    // setTc(true)
                    setoutput(data['output']);

                    toast.success("compiled sucessfully")
                    console.log(data['output']);
                    // setOutput(data['output'])
                }
                else {
                    // setTc(false)
                    toast.error("compilation error")
                    setoutput(data['error'])
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleLeave = () => {
        socket.disconnect()
        // code to handle leaving room and webRTC disconnection
        if (myStream) {
            const tracks = myStream?.getTracks();
            tracks && tracks.forEach(track => track.stop());
        }
        socket1.emit("stream-disconnect", { to: remoteSocketId });
        peer.cleanup();
        // peer.handleIceConnectionStateChange();
        !socket.connected && navigate('/', { replace: true, state: {} })
    }
    //webRTC code
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    //const myStream = useRef(null);
    const [remoteStream, setRemoteStream] = useState();
    //const remoteStream = useRef();
    const [hidebtn, setBtn] = useState(false);
    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);
    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        socket1.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
        //myStream.current.srcObject = stream;
    }, [remoteSocketId, socket1]);

    const handleIncomingCall = useCallback(
        async ({ from, offer }) => {
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMyStream(stream);
            //myStream.current.srcObject = stream;
            console.log("Incoming call", from, offer);
            const ans = await peer.getAnswer(offer);
            socket1.emit("call:accepted", { to: from, ans });
        },
        [socket1]
    );
    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream])
    const handleCallAccepted = useCallback(
        ({ from, ans }) => {
            peer.setLocalDescription(ans);
            console.log("Call Accepted");
            sendStreams();
        },
        [sendStreams]
    );

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket1.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [socket1, remoteSocketId]);
    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);
    const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket1.emit("peer:nego:done", { to: from, ans });
    },
        [socket1]
    );
    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
        setBtn(true);
    }, []);
    // to handle disconnection 
    const handlePeerDisconnect = useCallback(async ({ from }) => {
        setRemoteStream(null);
    }, []);
    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const RemoteStream = ev.streams;
            console.log("GOT TRACKS!!")
            setRemoteStream(RemoteStream[0]);
            //remoteStream.current.srcObject = RemoteStream[0];
        });
    }, []);
    useEffect(() => {
        socket1.on("user:joined", handleUserJoined);
        socket1.on("incoming:call", handleIncomingCall);
        socket1.on("call:accepted", handleCallAccepted);
        socket1.on("peer:nego:needed", handleNegoNeedIncoming);
        socket1.on("peer:nego:final", handleNegoNeedFinal);
        socket1.on("peer-disconnect", handlePeerDisconnect);

        return () => {
            socket1.off("user:joined", handleUserJoined);
            socket1.off("incoming:call", handleIncomingCall);
            socket1.off("call:accepted", handleCallAccepted);
            socket1.off("peer:nego:needed", handleNegoNeedIncoming);
            socket1.off("peer:nego:final", handleNegoNeedFinal);
            socket1.on("peer-disconnect", handlePeerDisconnect);
        };
    }, [
        socket1,
        handleUserJoined,
        handleIncomingCall,
        handleCallAccepted,
        handleNegoNeedIncoming,
        handleNegoNeedFinal,
    ]);

    const [isMicMuted, setIsMicMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const toggleMic = () => {
        if (myStream) {
            let tempStream = myStream;
            tempStream.getAudioTracks().forEach((track) => {
                track.enabled = !isMicMuted;
            });
            setMyStream(tempStream);
            setIsMicMuted(!isMicMuted);
        }
        console.log(myStream);
    };

    const toggleVideo = () => {
        if (myStream) {
            let tempStream = myStream;
            myStream.getVideoTracks().forEach((track) => {
                track.enabled = !isVideoOff;
            });
            setMyStream(tempStream);
            setIsVideoOff(!isVideoOff);
            console.log(myStream);
        }
    };

    return (
        <div className='room'>
            <div class="container">
                <div class="toppane">
                    <RoomHeader
                        handleLanguage={handleLanguage}
                        language={language}
                        languagesAvailable={languagesAvailable}
                        codeKeyBinding={codeKeyBinding}
                        handleCodeKeyBinding={handleCodeKeyBinding}
                        codeKeyBindingsAvailable={codeKeyBindingsAvailable}
                        fetchedUsers={fetchedUsers}
                        generateRandomColor={generateRandomColor}
                        copyToClipboard={copyToClipboard}
                        roomId={roomId}
                        compile={compile}
                        handleLeave={handleLeave}
                    />
                </div>
                <div class="leftpane">
                    {/* left */}
                    <div className="roomSidebar">
                        <div className="roomSidebarUsersWrapper">
                            <ConnectedUsers fetchedUsers={fetchedUsers} generateRandomColor={generateRandomColor} />
                        </div>
                    </div>
                </div>
                <div class="middlepane">
                    {/* middle */}
                    <CodeEditor
                        AceEditorRef={AceEditorRef}
                        language={language}
                        codeKeyBinding={codeKeyBinding}
                        code={code}
                        handleChange={handleChange}
                        input={input}
                        InputHandler={InputHandler}
                        output={output}
                    />
                </div>
                <div class="rightpane">
                    {/* right */}
                    <div className="roomSidebar">
                        <div className="roomSidebarUsersWrapper">
                            <WebCam
                                remoteSocketId={remoteSocketId}
                                myStream={myStream}
                                hidebtn={hidebtn}
                                sendStreams={sendStreams}
                                handleCallUser={handleCallUser}
                                remoteStream={remoteStream}
                                toggleVideo={toggleVideo}
                                toggleMic={toggleMic}
                            />
                        </div>
                        <ChatBot socket={socket} other={other} />
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Room;