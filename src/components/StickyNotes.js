import React, { useEffect, useState } from 'react'

import StickyNote from './StickyNote'

const StickyNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => { initCreateNote(); })

    const initCreateNote = () => {
        const createNote = document.getElementById('createNote');
        createNote.addEventListener('click', () => { create(); });
    }

    const create = () => {
        const id = notes.length;
        setNotes(notes.concat(<StickyNote key={id} idkey={id} />));

        setTimeout(() => {
            const note = document.getElementById(`sticky-note-${id}`);
            note.onmousedown = function (event) {
                dragNote(note, event);
            }

            note.ondragstart = function () {
                return false;
            };
        }, 10);
    }

    function dragNote(note, event) {
        let shiftX = event.clientX - note.getBoundingClientRect().left;
        let shiftY = event.clientY - note.getBoundingClientRect().top;

        note.style.position = 'absolute';
        note.style.zIndex = 1000;
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            note.style.left = pageX - shiftX + 'px';
            note.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) { moveAt(event.pageX, event.pageY); }
        document.addEventListener('mousemove', onMouseMove);

        note.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            note.onmouseup = null;
        };
    };

    return ( <> {notes} </> )
}

export default StickyNotes;