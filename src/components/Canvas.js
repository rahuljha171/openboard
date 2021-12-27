import React, { useEffect } from 'react'
import './Canvas.css'
import ToggleTool from '../media/toggleTool.png'

const Canvas = () => {
    var mouseDown = false;
    var isEraser = false;
    var isClear = false;

    const initCanvas = () => {
        //yes, I admit it does not quite looks like "ReactJS", 
        //but i also dont want to add the redux in this
        const canvas = document.getElementById('myCanvas');
        const black = document.getElementById('black');
        const red = document.getElementById('red');
        const blue = document.getElementById('blue');
        const eraser = document.getElementById('eraser');
        const size = document.getElementById('pen-size-slider');
        const pointer = document.getElementById('pointer');
        const save = document.getElementById('save');
        const undo = document.getElementById('undo');
        const redo = document.getElementById('redo');
        const clear = document.getElementById('clear');
        const toggleTool = document.getElementById('toggleTool');
        const toolContainer = document.getElementById('tools-container');
        toggleTool.style.transform = 'rotate(180deg)';
        disableComponent(redo);
        disableComponent(undo);

        let points = [];
        let pathsry = [];
        let redoArray = [];
        var mouse = { x: 0, y: 0 };

        pointer.style.top = `${window.innerHeight / 2 - size.value / 2}px`;
        pointer.style.left = `${window.innerWidth / 2 - size.value / 2}px`;

        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;

        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const pen = canvas.getContext('2d');
        pen.scale(2, 2);
        pen.strokeStyle = 'black';
        pen.lineJoin = 'round'
        pen.lineCap = 'round'

        canvas.addEventListener("mousedown", (event) => {
            enableComponent(undo);
            disableComponent(redo);
            redoArray = [];

            pen.lineWidth = size.value;
            mouseDown = true;
            pen.beginPath();
            pen.moveTo(event.clientX, event.clientY);

            mouse = oMousePos(canvas, event);
            points = [];
            points.push({})

            points.push({
                x: mouse.x,
                y: mouse.y,
                size: size.value,
                color: pen.strokeStyle,
                mode: isEraser ? "destination-out" : "source-over"
            });
        })

        canvas.addEventListener("mousemove", (event) => {
            if (mouseDown) {
                pen.lineTo(event.clientX, event.clientY);
                pen.stroke();
                mouse = oMousePos(canvas, event);
                points.push({
                    x: mouse.x,
                    y: mouse.y,
                    size: size.value,
                    color: pen.strokeStyle,
                    mode: isEraser ? "destination-out" : "source-over"
                });
            }
        })

        canvas.addEventListener("mouseup", () => {
            mouseDown = false;
            pathsry.push(points);
        })

        red.addEventListener("click", () => { brush(pen, "red", "source-over", false); })
        blue.addEventListener("click", () => { brush(pen, "blue", "source-over", false); })
        black.addEventListener("click", () => { brush(pen, "black", "source-over", false); })
        eraser.addEventListener("click", () => { brush(pen, "", "destination-out", true); })

        size.addEventListener('mousedown', () => {
            pointer.style.display = 'block';
            pointer.style.backgroundColor = isEraser ? 'white' : pen.strokeStyle;
        })

        size.addEventListener('mousemove', () => {
            pointer.style.top = `${window.innerHeight / 2 - size.value / 2}px`;
            pointer.style.left = `${window.innerWidth / 2 - size.value / 2}px`;

            pointer.style.height = `${size.value}px`;
            pointer.style.width = `${size.value}px`;
        })

        size.addEventListener('mouseup', () => { pointer.style.display = 'none'; })

        save.addEventListener("click", (e) => {
            const url = canvas.toDataURL();
            const a = document.createElement("a");
            a.href = url;
            a.download = "board.jpg";
            a.click();
        })

        undo.addEventListener('click', () => {
            if (pathsry.length > 0) {
                if(!isClear){
                    enableComponent(redo);
                    redoArray.push(pathsry.pop());    
                }
                isClear = false;
                redrawAll();
            }
            if (pathsry.length === 0) disableComponent(undo);
        })

        redo.addEventListener('click', () => {
            if (redoArray.length > 0) {
                enableComponent(undo);
                pathsry.push(redoArray.pop());
                redrawAll();
            }
            if (redoArray.length === 0) disableComponent(redo);
        })

        clear.addEventListener('click', () => {
            pen.clearRect(0, 0, canvas.width, canvas.height);
            disableComponent(redo);
            redoArray = [];
            isClear = true;
        })

        toggleTool.addEventListener('click', () => {
            const transformButton = toggleTool.style.transform;
            if (transformButton === 'rotate(180deg)') {
                toggleTool.style.transform = 'rotate(0deg)';
                toolContainer.style.transform = 'translateY(-6.5rem)';
            } else {
                toggleTool.style.transform = 'rotate(180deg)';
                toolContainer.style.transform = 'translateY(0rem)';
            }
        })

        const redrawAll = () => {
            pen.clearRect(0, 0, canvas.width, canvas.height);

            pathsry.forEach(path => {
                pen.beginPath();
                pen.strokeStyle = path[0].color;
                pen.lineWidth = path[0].size;
                pen.globalCompositeOperation = path[0].mode;
                pen.moveTo(path[0].x, path[0].y);
                for (let i = 1; i < path.length; i++) {
                    pen.strokeStyle = path[i].color;
                    pen.lineWidth = path[i].size;
                    pen.globalCompositeOperation = path[i].mode;
                    pen.lineTo(path[i].x, path[i].y);
                }
                pen.stroke();
            });
        }

        const oMousePos = (canvas, event) => {
            var ClientRect = canvas.getBoundingClientRect();
            return {
                x: Math.round(event.clientX - ClientRect.left),
                y: Math.round(event.clientY - ClientRect.top)
            }
        }
    }

    const brush = (pen, color, composition, erase) => {
        pen.globalCompositeOperation = composition;
        pen.strokeStyle = color;
        isEraser = erase;
    }

    const disableComponent = (component) => {
        component.style.opacity = 0.7;
        component.style.pointerEvents = 'none';
    }

    const enableComponent = (component) => {
        component.style.opacity = 1;
        component.style.pointerEvents = 'auto';
    }

    useEffect(() => { initCanvas(); })

    return (
        <div className='myCanvas'>
            <div id='pointer'></div>
            <div className='toggleTool'>
                <img className='animateThis' id='toggleTool' src={ToggleTool} alt="toggle" />
            </div>
            <canvas id='myCanvas' />
            <div id='credits'>
                <div>Free icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a></div>
                <div>& <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
        </div>
    )
}

export default Canvas;