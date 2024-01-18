import React, { useEffect, useState, useContext } from "react";
import {
    Navbar,
    Button,
    MobileNav,
} from "@material-tailwind/react";
import { CodeOutlined, CopyOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import RadioButton from "../RadioButton";
import { FcInvite } from "react-icons/fc";
import { IoIosExit } from "react-icons/io";



const RoomHeader = ({ handleLanguage, language, languagesAvailable, codeKeyBinding, handleCodeKeyBinding, codeKeyBindingsAvailable, copyToClipboard, roomId, compile, handleLeave, hangleToggleComponent }) => {
    const { setModalOpen, setInviteModalOpen } = useContext(LoginContext);
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-2xl px-4 lg:py-2">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <h1
                    className="mr-4 cursor-pointer py-1.5 font-bold"
                >
                    InterviewSyncPro
                </h1>

                <div className="roomSidebar">
                    <div className="navbarCenter">
                        <div className="languageFieldWrapper">
                            <select
                                className='languageField'
                                name="language"
                                id="language"
                                onChange={handleLanguage}
                                value={language}
                            >
                                {
                                    languagesAvailable.map((lang) => {
                                        return (
                                            <option key={lang} value={lang}>{lang}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="languageFieldWrapper">
                            <select
                                className='languageField'
                                name="codeKeyBinding"
                                id="codeKeyBinding"
                                value={codeKeyBinding}
                                onChange={handleCodeKeyBinding}
                            >
                                {
                                    codeKeyBindingsAvailable.map((each) => {
                                        return (
                                            <option key={each} value={each}>{each}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="group relative">
                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:text-white hover:bg-black"
                                onClick={() => {
                                    copyToClipboard(roomId)
                                    console.log(roomId)
                                }}
                            >
                                <CopyOutlined />
                            </button>
                            <div className="hidden group-hover:block absolute top-full left-0 bg-gray-200 text-sm w-24 p-2 rounded">
                                Room ID
                            </div>
                        </div>
                        <div className="group relative">
                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:text-white hover:bg-black"
                                onClick={compile}
                            >
                                <CodeOutlined />
                            </button>
                            <div className="hidden group-hover:block absolute top-full left-0 bg-gray-200 text-sm p-2 rounded">
                                Run
                            </div>
                        </div>
                        <div className="group relative">
                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:text-white hover:bg-black"
                                onClick={() => handleLeave()}
                            >
                                <IoIosExit size={25} />
                            </button>
                            <div className="hidden group-hover:block absolute top-full left-0 bg-gray-200 text-sm p-2 rounded">
                                Leave
                            </div>
                        </div>
                        <div className="group relative">
                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:text-white hover:bg-black"
                                onClick={() => setInviteModalOpen(true)}
                            >
                                <FcInvite size={30} />
                            </button>
                            <div className="hidden group-hover:block absolute top-full left-0 bg-gray-200 text-sm p-2 rounded">
                                Invite
                            </div>
                        </div>
                        <RadioButton hangleToggleComponent={hangleToggleComponent} />
                    </div>
                </div>
                <Link>
                    <Button
                        variant="gradient"
                        size="sm"
                        className="hidden lg:inline-block"
                        onClick={() => setModalOpen(true)}
                    >
                        <span>Logout</span>
                    </Button>
                </Link>
            </div>
            <MobileNav open={openNav}>
                <div className="container mx-auto">
                    <Link>
                        <Button
                            variant="gradient"
                            size="sm"
                            fullWidth
                            className="mb-2"
                            onClick={() => setModalOpen(true)}
                        >
                            <span>Logout</span>
                        </Button>
                    </Link>
                </div>
            </MobileNav>
        </Navbar>
    );
}

export default RoomHeader