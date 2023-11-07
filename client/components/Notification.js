import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const notificationStyle = {
    color: notification.type === 'info' ? 'green' : 'red',
    background: 'lihtgrey',
    fontSize: 15,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}
export default Notification
