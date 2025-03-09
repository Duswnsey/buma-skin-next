import { useState } from "react"

export default function BNotification (props) {
    const [destroyed, setdestroyed] = useState(false)
    return (
        <>
            {destroyed == false && (
                <div className={"notification " + props.color+" "+ (props.light ? 'is-light' : "")}>
                    {props.deleteButton != true && (
                        <button onClick={(e) => {e.preventDefault(); deleteMyself();}} className="delete"></button>
                    )}
                    {props.children}
                </div>
            )}
        </>
    )
    function deleteMyself() {
        setdestroyed(true);
    }
}