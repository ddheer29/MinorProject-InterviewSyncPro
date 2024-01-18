import React from 'react'

const oldmodal = () => {
    return (
        <div className="centered" onClick={() => setModalOpen(false)}>
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className='heading'>Confirm</h5>
                    </div>
                    <button className='closeBtn' onClick={() => setModalOpen(false)}>
                        <AiOutlineClose></AiOutlineClose>
                    </button>
                    <div className="modalContent">
                        Are you really want to Log out?
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button
                                className='logOutBtn'
                                onClick={() => {
                                    setModalOpen(false);
                                    localStorage.clear();
                                    navigate('/login')
                                }}
                            >Logout</button>
                            <button
                                className='cancelBtn'
                                onClick={() => setModalOpen(false)}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default oldmodal