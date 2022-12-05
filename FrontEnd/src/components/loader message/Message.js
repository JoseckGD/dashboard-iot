import React from 'react';

const Message = ({ msg, bgColor, active }) => {
  let styles1 = {
    right: '1rem',
    top: '5rem',
    position: 'absolute',
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: '1rem',
    backgroundColor: bgColor,
  };


  let styles2 = {
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

    !active ?
      <div style={styles2}>
        < p dangerouslySetInnerHTML={{ __html: msg }
        } />
      </div >
      :
      <div style={styles1} >
        <p dangerouslySetInnerHTML={{ __html: msg }} />
      </div>

  );
}

export default Message;