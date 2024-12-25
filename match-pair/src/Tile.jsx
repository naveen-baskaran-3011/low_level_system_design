import { useEffect, useRef, useState } from "react";

export default function Tile({ label, isOpen, onClick }) {
    const hiddenPlate = useRef(null);
    const revealPlate = useRef(null);

    useEffect(() => {
        if(isOpen) {
            hiddenPlate.current.style.transform = 'rotateY(180deg)';
            revealPlate.current.style.transform = 'rotateY(0deg)';
        } else {
            hiddenPlate.current.style.transform = 'rotateY(0deg)';
            revealPlate.current.style.transform = 'rotateY(180deg)';
        }
    }, [isOpen]);

    return <div
        onClick={onClick}
        style={{
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            backgroundColor: 'yellowgreen',
            borderRadius: '5px',
            cursor: 'pointer'
        }}>
        <div style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            transition: 'all 1s'
        }} ref={hiddenPlate} ></div>
        <div style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            transition: 'all 1s'
        }} ref={revealPlate} dangerouslySetInnerHTML={{ __html: label }}></div>
    </div>;
}