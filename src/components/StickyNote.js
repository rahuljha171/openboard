import React from 'react';
import './StickyNote.css';

const StickyNote = (props) => {
    const idNote = `sticky-note-${props.idkey}`;
    const idContent = `sticky-content-${props.idkey}`;

    const minimiseNote = () => {
        const minNote = document.getElementById(idNote);
        const minContent = document.getElementById(idContent);
        if (minNote.style.height === '15rem' || minNote.style.height === "") {
            minNote.style.height = '4.4rem';
            minContent.style.height = '2.2rem';
        } else {
            minNote.style.height = '15rem';
            minContent.style.height = '12.8rem';
        }
    }

    const deleteNote = () => {
        const delNote = document.getElementById(idNote);
        delNote.remove();
    }

    return (
        <div className='sticky-note' id={idNote}>
            <div className='sticky-header' id='sticky-header'>
                <div className='sticky-save' onClick={() => { minimiseNote() }}></div>
                <div className='sticky-close' onClick={() => { deleteNote() }}></div>
            </div>
            <div className='sticky-content' id={idContent}>
                <textarea></textarea>
            </div>
        </div>
    )
}

export default StickyNote;