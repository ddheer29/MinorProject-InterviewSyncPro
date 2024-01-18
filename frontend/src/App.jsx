import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Singnin from './components/pages/Signin'
import Signup from './components/pages/Signup'
import JoinRoom from './components/pages/JoinRoom'
import Room from './components/pages/Room'
import Modal from './components/Modal/Modal'
import { LoginContext } from './context/LoginContext'
import { PrivateRoutes } from './PrivateRoutes'
import InviteModal from './components/Modal/InviteModal'
import InviteForm from './components/pages/InviteForm'

const App = () => {
    const [userLogin, setUserLogin] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [invitemodalOpen, setInviteModalOpen] = useState(false);
    return (
        <BrowserRouter>
            <LoginContext.Provider value={{ setUserLogin, setModalOpen, userLogin, setInviteModalOpen }}>
                <Routes>
                    <Route path='/' element={<JoinRoom />} />
                    <Route path='/login' element={<Singnin />} />
                    <Route path='/register' element={<Signup />} />
                    <Route path='/invite' element={<InviteForm />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path='/room/:roomId' element={<Room />} />
                    </Route>
                </Routes>
                {invitemodalOpen && <InviteModal setInviteModalOpen={setInviteModalOpen}></InviteModal>}
                {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
            </LoginContext.Provider>
        </BrowserRouter>
    )
}

export default App