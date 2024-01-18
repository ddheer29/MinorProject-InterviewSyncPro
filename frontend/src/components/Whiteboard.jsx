import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import rough from 'roughjs';
import { ClearOutlined } from '@ant-design/icons';
import { FaPencilAlt } from "react-icons/fa";
import { LuPencilRuler } from "react-icons/lu";
import { FaShapes } from "react-icons/fa";
import { LuEraser } from "react-icons/lu";
import { IoColorPaletteOutline } from "react-icons/io5";


const roughGenerator = rough.generator();

const Whiteboard = ({ socket }) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [tool, setTool] = useState('pencil');
    const [color, setColor] = useState('black');
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctxRef.current = ctx;
    }, []);

    useEffect(() => {
        socket.on('beginDrawingClient', (elements) => {
            setElements(elements);
        })

        socket.on('drawStrokeClient', (elements) => {
            setElements(elements);
        })

        socket.on('clearCanvasClient', () => {
            ctxRef.current.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
            setElements([]);
        })

    }, []);

    useEffect(() => {
        ctxRef.current.strokeStyle = color;
    }, [color]);

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current);

        if (elements.length > 0) {
            ctxRef.current.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
        }

        elements.forEach((element) => {
            if (element.type === 'pencil') {
                roughCanvas.linearPath(element.path,
                    {
                        stroke: element.stroke,
                        strokeWidth: 5,
                        roughness: 0
                    });
            } else if (element.type === 'line') {
                roughCanvas.draw(
                    roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height,
                        {
                            stroke: element.stroke,
                            strokeWidth: 5,
                            roughness: 0
                        })
                );
            } else if (element.type === 'rectangle') {
                roughCanvas.draw(
                    roughGenerator.rectangle(
                        element.offsetX,
                        element.offsetY,
                        element.width,
                        element.height,
                        {
                            stroke: element.stroke,
                            strokeWidth: 5,
                            roughness: 0
                        }
                    )
                )
            } else if (element.type === 'eraser') {
                roughCanvas.linearPath(element.path,
                    {
                        stroke: 'white',
                        strokeWidth: 30,
                        roughness: 0
                    });
            }
        })
    }, [elements]);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (tool === 'pencil') {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: 'pencil',
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: color
                }
            ])
        } else if (tool === 'line') {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: 'line',
                    offsetX,
                    offsetY,
                    width: offsetX,
                    height: offsetY,
                    stroke: color
                }
            ])
        } else if (tool === 'rectangle') {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: 'rectangle',
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: color
                }
            ])
        } else if (tool === 'eraser') {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: 'eraser',
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: 'white'
                }
            ])
        }
        socket.emit('beginDrawing', elements);
        setIsDrawing(true);
    }

    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (isDrawing) {
            // console.log(offsetX, offsetY);
            if (tool === 'pencil') {
                const { path } = elements[elements.length - 1];
                const newPath = [...path, [offsetX, offsetY]];
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                path: newPath
                            }
                        } else {
                            return ele;
                        }
                    })
                )
            } else if (tool === 'line') {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                width: offsetX,
                                height: offsetY
                            }
                        } else {
                            return ele;
                        }
                    })
                )
            } else if (tool === 'rectangle') {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                width: offsetX - ele.offsetX,
                                height: offsetY - ele.offsetY
                            }
                        } else {
                            return ele;
                        }
                    })
                )
            } else if (tool === 'eraser') {
                const { path } = elements[elements.length - 1];
                const newPath = [...path, [offsetX, offsetY]];
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                path: newPath
                            }
                        } else {
                            return ele;
                        }
                    })
                );
            }
            socket.emit('drawStroke', elements);
        }
    }

    const handleMouseUp = (e) => {
        setIsDrawing(false);
    }

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillRect = 'white';
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setElements([]);
        socket.emit('clearCanvas');
    }

    return (
        // <canvas
        //     ref={canvasRef}
        //     id='whiteboard'
        //     style={{ width: '100%', height: '700px' }}
        // />
        <div className='h-5/6'>
            <div className="tools flex justify-between rounded-xl h-12 bg-[#D6D6D6] mx-2 my-2 px-10 ">
                <div className="tool-selector flex items-center justify-evenly w-60 bg-white rounded-2xl p-4 h-10 mt-1">
                    <label htmlFor="pencil">
                        <FaPencilAlt size={20} />
                    </label>
                    <input type="radio" value='pencil' id='pencil' name='tool-selector' onChange={(e) => { setTool(e.target.value) }} />
                    &nbsp;
                    <label htmlFor="line" >
                        <LuPencilRuler size={20} />
                    </label>
                    <input type="radio" value='line' id='line' name='tool-selector' onChange={(e) => { setTool(e.target.value) }} />
                    &nbsp;
                    <label htmlFor="rectangle">
                        <FaShapes size={20} />
                    </label>
                    <input type="radio" value='rectangle' id='rectangle' name='tool-selector' onChange={(e) => { setTool(e.target.value) }} />
                    &nbsp;
                    <label htmlFor="eraser">
                        <LuEraser size={20} />
                    </label>
                    <input type="radio" value='eraser' id='eraser' name='tool-selector' onChange={(e) => { setTool(e.target.value) }} />
                </div>
                <div className="select-color flex items-center  w-40">
                    <label htmlFor="color-selector" className='px-3'>
                        <IoColorPaletteOutline size={25} />
                    </label>
                    <input type="color" id='color-selector' value={color} onChange={(e) => { setColor(e.target.value) }} />
                </div>
                <div className="control-buttons flex justify-between items-center">
                    <div className="group relative">
                        <button
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:text-white hover:bg-gray-900"
                            onClick={handleClearCanvas}
                        >
                            <ClearOutlined />
                        </button>
                        <div className="hidden group-hover:block absolute top-full left-0 bg-gray-200 text-sm p-2 rounded">
                            Clear
                        </div>
                    </div>
                </div>
            </div>
            <div className="whiteboard border box-border border-black mx-2 h-100">
                <div
                    className='w-100 h-100 overflow-hidden'
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}>
                    <canvas
                        ref={canvasRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default Whiteboard;