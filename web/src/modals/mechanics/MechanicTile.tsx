import React from 'react'

interface Props {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    id: string
}

const MechanicTile = ({firstname, lastname, email, phone, id}: Props) => {
    const cardStyle = {
        border: "1px solid #e1e1e1",
        width: "200px",
        padding: "10px 35px",
        flex: "1 1 auto",
        cursor: "pointer"
    }
    return (
        <>
            <div style={cardStyle}>
                <div>{firstname}</div>
                <div>{lastname}</div>
                <div>{email}</div>
                <div>{phone}</div>
                <button>Send Request</button>
            </div>

           
        </>
    )
}

export default MechanicTile
