import { getSuggestedQuery } from '@testing-library/dom'
import React from 'react'

const Message = ({ message }) => {
    let colorScheme = ''
    const messageStyle = {
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: '2px',
        backgroundColor: '#F5F5F5',
        width: '300px',
        height: '50px',
        textAlign: 'center',
        display: 'table-cell',
        verticalAlign: 'middle',
        fontWeight: 'bold'
    }
 
    if (message.includes('unsucc')) {
        messageStyle.borderColor = 'red'
        messageStyle.color = 'red'
    }
    else { // when message is successful
        messageStyle.borderColor = 'green'
        messageStyle.color = 'green'
    }

    if (message !== '') {
        return (
            <div style={{ diplay: 'table' }}>
                <p id='messageP' style={messageStyle}>{message}</p>
            </div>
        )
    }
    return <div></div>

}

export default Message
