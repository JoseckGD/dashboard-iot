import React from 'react';

const Message = ({ msg, bgColor }) => {
   let styles = {
      right: '1rem',
      top: '1rem',
      position: 'absolute',
      padding: "1rem",
      marginBottom: "1rem",
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: '1rem',
      backgroundColor: bgColor,
   };
   return (
      <div style={styles}>
         <p dangerouslySetInnerHTML={{ __html: msg }} />
      </div>
   );
}

export default Message;