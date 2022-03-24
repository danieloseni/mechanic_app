import React, {useState, useCallback, useEffect} from 'react'

interface Props { }
interface Message{
    status: "success" | "failed",
    message: string
}

let messageTimeout:any = null
const defaultSeconds = 2;

const AlertPopup = (props: Props) => {
    const [message, updateMessage] = useState<Message | null>();
    const [popupVisible, updatePopupVisibility] = useState<boolean>(false);
    const [seconds, updateSeconds] = useState<number>(defaultSeconds);

    const closePopup = useCallback(() => {
        updatePopupVisibility(false)
        clearInterval(messageTimeout)
        setTimeout(() => {
            updateMessage(null)

        }, 1000)
    }, []
)

    const startTimeout = useCallback(() => {
        messageTimeout = setInterval(() => {
            updateSeconds(seconds - 1)
            if(seconds <= 0){
                clearInterval((messageTimeout))
                updateSeconds(defaultSeconds)
                closePopup()
                messageTimeout = null
            }
        }, 1000)

    }, [closePopup, seconds])

    const showPopup = useCallback((message: Message) => {
        updateMessage(message)
        startTimeout()
        updatePopupVisibility(true)
    }, [startTimeout])

    useEffect(() => {
        //@ts-ignore
        window.showPopup = showPopup
        return () => {
            //@ts-ignore
            window.showPopup = null
        }
    }, [showPopup])

    return (
        <div className={"alert-popup-container " + (popupVisible && "show")}>
            {message !== null && <div className={"alert-popup " + (message?.status === "success" ?  "success" : "error")}>
                <div className="icon">
                    {
                        message?.status === "success"?

                        <i className="fal fa-check"></i>
                        :
                        <i className="fal fa-times"></i>

                    }
                    </div>
                {message?.message}

                <i onClick = {e => {closePopup()}} className="fa fa-times"></i>
            </div>}
        </div>
    )
}

export default AlertPopup