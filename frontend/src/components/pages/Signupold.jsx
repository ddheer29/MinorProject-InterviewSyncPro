import React from 'react'

const Signupold = () => {
    return (
        <div>
            <div className="grid h-screen place-items-center">
                <form
                    className="w-full max-w-sm border-solid border-2 border-purple-500 rounded"
                    onSubmit={handleSumbit}
                >
                    <h1 className='text-gray-500 font-bold flex items-center justify-center m-10 text-2xl'>Create New Account</h1>
                    <div className="flex items-center justify-center mb-6">
                        <div className="md:w-2/3">
                            <input
                                type="text"
                                name='name'
                                id='name'
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder='Enter Your Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-6">
                        <div className="md:w-2/3">
                            <input
                                type="email"
                                name='email'
                                id='email'
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder='Enter Your Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-6">
                        <div className="md:w-2/3">
                            <input
                                type="password"
                                name='password'
                                id='password'
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder='Enter Your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center justify-center">
                            <button className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">
                                Sign Up
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-6">
                        Already have an Account ?
                        <Link to='/login'><span style={{ color: 'blue', cursor: 'pointer' }}> Sign In</span></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signupold