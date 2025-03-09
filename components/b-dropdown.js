import { useEffect, useState } from "react";

export default function BDropdown (props) {
    const [showDropdown, setshowDropdown] = useState(false);
    const [screenResizeTimeout, setscreenResizeTimeout] = useState(null)
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        toggleBySize();
        return (() => {
            window.removeEventListener('resize', handleResize);
        })
    }, [])
    let rightDropdown = "navbar-dropdown";
    if (props.rightDropdown == true) {
        rightDropdown = "navbar-dropdown.is-right";
    }
    return (
        <div>
            <div className="navbar-item has-dropdown is-hoverable">
                <a href="#" className="navbar-link" onClick={(e) => {e.preventDefault(); toggleNavbar()}}>
                    {props.icon != undefined && (
                        <>
                            <span className="icon">
                                <span className={props.icon} />
                            </span>&nbsp;
                            {props.label}
                        </>
                    )}
                </a>
                {showDropdown == true && (
                    <div v-show="showDropdown" className={rightDropdown}>
                        <>{props.children}</>
                    </div>
                )}
            </div>
        </div>
    )
    function toggleNavbar() {
        setshowDropdown(!showDropdown)
    }
    function handleResize() {
        if (screenResizeTimeout)
            clearTimeout(screenResizeTimeout);
        setscreenResizeTimeout(setTimeout(toggleBySize, 100));
    }
    function toggleBySize() {
        const windowWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        setshowDropdown(windowWidth < 1024 ? false : true);
    }
}