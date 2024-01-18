import React from 'react'
import ChatBox from '../ChatBot'


const ChatBoxModal = () => {
    return (
        <div className="darkBg">
            <div class="relative p-4 w-full max-w-md max-h-full centered">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Chat
                        </h3>
                        <button
                            type="button"
                            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* main body */}
                    <div className="">
                        <ChatBox />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBoxModal