import React from 'react'
import './Tools.css'

import Black from '../media/BlackPencil.png'
import Red from '../media/RedPencil.png'
import Blue from '../media/BluePencil.png'
import Eraser from '../media/Eraser.png'
import StickyNote from '../media/StickyNote.png'
import Undo from '../media/undo.png'
import Redo from '../media/redo.png'
import Save from '../media/save.png'
import Clear from '../media/clear.png'

const Tools = () => {
    return (
        <>
            <div className='tools-container animate-tools-container' id='tools-container'>
                <div className='black color tool'><img id='black' src={Black} alt="Black Pen" /></div>
                <div className='red color tool'><img id='red' src={Red} alt="Red Pen" /></div>
                <div className='blue color tool'><img id='blue' src={Blue} alt="Blue Pen" /></div>
                <div className='color tool'><img id='eraser' src={Eraser} alt="Eraser" /></div>
                <div className='tool note'>
                    <img id='createNote' src={StickyNote} alt="Note" style={{ padding: "0.2rem" }} />
                </div>
                <div className='save tool'><img id='save' src={Save} alt="save" style={{ padding: "0.3rem" }} /></div>
                <div className='undo tool'><img id='undo' src={Undo} alt="undo" style={{ padding: "0.3rem" }} /></div>
                <div className='redo tool'><img id='redo' src={Redo} alt="redo" style={{ padding: "0.3rem" }} /></div>
                <div className='clear tool'><img id='clear' src={Clear} alt="clear" style={{ padding: "0.4rem" }} /></div>
            </div>
        </>
    )
}

export default Tools