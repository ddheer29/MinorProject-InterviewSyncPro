import React from 'react'

const ConnectedUsers = ({fetchedUsers, generateRandomColor}) => {
    return (
        <>
            <div className="roomSidebarUsers py-4 px-6">
                {
                    fetchedUsers.map((eachUser) => (
                        <div
                            key={eachUser}
                            className="roomSidebarUsersEach"
                        >
                            <div
                                className='roomSidebarUsersEachAvatar'
                                style={{
                                    backgroundColor: `${generateRandomColor(eachUser)}`,
                                }}
                            >
                                {eachUser.slice(0, 2).toUpperCase()}
                            </div>
                            <div className='roomSidebarUsersEachName'>{eachUser}</div>
                        </div>
                    )
                    )
                }
            </div>
        </>
    )
}

export default ConnectedUsers