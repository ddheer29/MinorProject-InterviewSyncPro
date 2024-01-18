import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineSend } from 'react-icons/ai'

export const ChatBot = ({ socket,other }) => {

  console.log(socket);
  const [Messgaes, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (socket != null) {
      socket.on('recieve', (messageData) => {
        setMessages([...Messgaes, { ...messageData, self: false }]);
      })
    }
  })
  function sendMessage() {
    socket.emit('message', { message: input })
    setMessages([...Messgaes, { message: input, self: true }])
    setInput("");
  }
  return (
    <div className='px-8 py-4'>
      <div className=" bg-indigo-50 flex flex-col w-max">
        <div className={open ? "w-60 h-80  flex flex-col border shadow-md bg-white" : "flex flex-col border shadow-md bg-white"}>
          <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center">
              <div className="pl-2">
                <div className="font-semibold">
                  <Link className="hover:underline" to="#">{other}</Link>
                </div>
                <div className="text-xs text-gray-600">Online</div>
              </div>
            </div>
            <div>
              <Link to='#' className="inline-flex hover:bg-indigo-50 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </Link>
              <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={() => setOpen(!open)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div></div>
          <div></div>
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            {open && Messgaes.map((msg, idx) => (
              <div key={idx} className={msg.self ? `flex items-center mb-4` : `flex items-center flex-row-reverse mb-4`}>
                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                  <img className="rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt='img' />
                  <Link to='#' className="block text-xs hover:underline"></Link>
                </div>
                <div className={((msg.self) ? (` bg-indigo-400`) : ` bg-green-200`) + ` flex-1  text-white p-2 rounded-lg mb-2 relative`}>
                  <div>{msg.message}.</div>
                </div>
              </div>

            ))
            }
          </div>
          <div className="flex items-center border-t p-2">
            <div className="w-full mx-2">
              <input className="w-full rounded-full border p-2.5 border-gray-200" type="text" value={input} placeholder="send" autofocus onChange={(e) => setInput(e.target.value)} />
            </div>
            <div>
              <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={() => sendMessage(input)}>
                <AiOutlineSend size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
