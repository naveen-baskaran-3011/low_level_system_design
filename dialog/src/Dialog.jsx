import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";

export default function({
    showDialog,
    closeOnClickOutside,
    closeOnEsc,
    showCloseIcon,
    showBackDrop,
    onClose
}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if(showDialog) {
            dialogRef.current.showModal();
            debugger;
        } else {
            dialogRef.current.close();
        }
    }, [showDialog])

    return createPortal(<dialog
        ref={dialogRef}
        onClose={onClose}
        onKeyDown={(event) => {
            if(!closeOnEsc && event.key === 'Escape') {
                event.preventDefault();
            }
        }}
        onClick={(event) => {
            if(closeOnClickOutside && event.target === event.currentTarget) {
                onClose();
            }
        }}
        className={showBackDrop ? '' : 'no-backdrop'}>
            <section>
                <header style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <h2>Dialog Header</h2>
                    {showCloseIcon && <button
                        onClick={onClose}
                        style={{
                        height: "fit-content"}}>X</button>}
                </header>
                <div
                    className="body"
                    style={{
                        paddingBottom: "20px"
                    }}>This is modal content. You can put any content here. This has a groovy backdrop!<br />
                        You can also close this modal by clicking outside of it or pressing the escape key
                </div>
                <footer style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <button onClick={onClose}>Close</button>
                </footer>
            </section>
        </dialog>, document.body)
}