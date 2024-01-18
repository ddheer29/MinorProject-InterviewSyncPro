import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import './Modal.css'


const InviteModal = ({ setInviteModalOpen }) => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const baseUrl = "http://localhost:8080"

    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            let dataSend = {
                email: email,
                subject: subject,
                message: message,
            }
            const res = await axios.post(`${baseUrl}/api/email/sendEmail`, dataSend, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            console.log(res);

            if (res.status >= 200 && res.status < 300) {
                alert("Email sent successfully");
                toast.success("Email sent successfully");
            }

        } catch (error) {
            console.log("Error in sending email", error);
            toast.error('Something went wrong');
        }
    }


    return (
        <>
            <div className="darkBg">
                <div class="relative p-4 w-full max-w-md max-h-full centered">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Invite Candidates
                            </h3>
                            <button
                                type="button"
                                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => setInviteModalOpen(false)}
                            >
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* main body */}
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" action="#">
                                {/* email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="name@company.com"
                                        required=""
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {/* subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Join meeting ..."
                                        required=""
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                {/* message */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        type="text"
                                        name="message"
                                        id="message"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Room Id:"
                                        required=""
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                                    onClick={(e) => {
                                        sendEmail(e)
                                        setInviteModalOpen(false);
                                    }}
                                >
                                    Invite
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InviteModal