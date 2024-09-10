import React from "react";

const Loading = () => {
  const dotStyle = {
    width: "10px",
    height: "10px",
    margin: "0 5px",
    borderRadius: "50%",
    backgroundColor: "#3498db",
    animation: "bounce 1.5s infinite",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={dotStyle}></div>
      <div style={{ ...dotStyle, animationDelay: "0.2s" }}></div>
      <div style={{ ...dotStyle, animationDelay: "0.4s" }}></div>
      <div style={{ ...dotStyle, animationDelay: "0.6s" }}></div>
      <div style={{ ...dotStyle, animationDelay: "0.8s" }}></div>
    </div>
  );
};

export default Loading;