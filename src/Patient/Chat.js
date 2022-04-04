import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import Scrollbar from "react-scrollbars-custom";
import { BsPencilSquare } from "react-icons/bs";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import Leftside from "../Dashbaord/LeftsidePatient";

import { Link } from "react-router-dom";

import { Button, TextField, unsupportedProp } from "@material-ui/core";
import io from "socket.io-client";
// const socket=io.conect("http://localhost:4002");

const Chat = () => {
  const [Appointments, setAppointments] = useState([]);

  const [state, setState] = useState({ message: "", name:JSON.parse(window.localStorage.getItem("user")).name});
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(
      "https://pdp-chat.herokuapp.com/"
    );
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    console.log(34434);
    const { name, message } = state;
    
    let user= JSON.parse(window.localStorage.getItem("user"));
    let token=window.localStorage.getItem("token")
    if(message==""){
      alert("please fill any  message");
    } 
    else {
      socketRef.current.emit("message", { name:user.name, message });
      e.preventDefault();
      setState({ message: "", name:name });
    }

    e.preventDefault();
  };

  const renderChat = () => {
    // let objDiv = document.getElementsByClassName("renderingchat");
    // objDiv.scrollTop = objDiv.scrollHeight;

    return chat.map(({ name, message }, index) => (
      <div key={index}>
          
           { (name==JSON.parse(window.localStorage.getItem("user")).name)?<div><h4  style={{   display: "flex",justifyContent: "flex-end" }}> 
          {name}: <span>{message}</span>
        </h4></div>: <div>  <h4  style={{   display: "flex",justifyContent: "flex-start" }}> 
          {name}: <span>{message}</span>
        </h4> </div>}
        
      </div>
    ));
  };

  //   const fetchAppointments = async () => {

  //     const { data } = await Axios.post(
  //       `${process.env.REACT_APP_SERVER_URL}/patients/previous-appointments/`,
  //       {
  //         googleId: localStorage.getItem("googleId"),
  //       }
  //     );
  //     // console.log(data);
  //     setAppointments(data);
  //   };

  useEffect(() => {
    // fetchAppointments();
  }, []);

  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <Navbar />
      <div>
        <div className="row m-5" style={{ maxWidth: "100%" }}>
          <div
            className="col-3 col-md-3 p-4 bg-white "
            style={{ height: "80vh" }}
          >
            <Leftside />
          </div>
          <div
            className="col-9 col-md-9 p-3"
            style={{
              border: "15px solid #17a2b8 ",
              height: "80vh",
              backgroundColor: "#6c757d",
            }}
          >
            <Scrollbar
              noScrollX
              style={{ position: "", height: "73vh", width: "150vh" }}
              className="col-12 col-md-12"
            >
            <div>
              
              <h3 style={{ textTransform: "uppercase",color: "black"  }}>
            Chat
              </h3>
              <Scrollbar
              noScrollX
              style={{ position: "", height: "45vh", width: "150vh" }}
              className="col-12 col-md-12"
            >
              <div className="render-chat"  style={{ marginRight:"4px"}}>
               <div>  {renderChat()}</div>
              </div>
    </Scrollbar>
         
              <div style={{marginTop:"10vh"}} className="formName">
                <form>

                  <div>
                    <TextField
                      name="message"
                      onChange={(e) => onTextChange(e)}
                      value={state.message}
                      label="Message"
                      fullWidth={true}

                    />
                  </div>
                  <Button
                    onClick={onMessageSubmit}
                    style={{ marginTop: "2vh", color: "black",float:"right"  }}
                    variant="contained"
                    color="black"
                  >
                    {" "}
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            </Scrollbar>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
