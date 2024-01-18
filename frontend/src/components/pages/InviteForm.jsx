import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import Layout from '../Layout/Layout';

const InviteForm = () => {
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
        <Layout>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Invite here!!
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Subject
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    autoComplete="current-password"
                                    required=""
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Message
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="message"
                                    name="message"
                                    type="text"
                                    required=""
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                                onClick={(e) => sendEmail(e)}
                            >
                                Send Email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default InviteForm