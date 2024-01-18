import React from 'react'
import Layout from '../Layout/Layout'
import InviteForm from './InviteForm'
import "./Dasboard.css"

const Dasboard = () => {
    return (
        <Layout>
            <div className="container">
                <div id="sidebar">
                    <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <button
                            aria-current="true"
                            type="button"
                            className="w-full px-4 py-2 font-medium text-left rtl:text-right text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                        >
                            Invite
                        </button>
                        <button
                            type="button"
                            className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                        >
                            Candidates
                        </button>
                    </div>
                </div>
                <div id="main-content">
                    <InviteForm />
                </div>
            </div>
        </Layout>
    )
}

export default Dasboard