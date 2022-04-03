import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import Scrollbar from "react-scrollbars-custom";
import { BsPencilSquare } from "react-icons/bs";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import Leftside from "../Dashbaord/LeftsidePatient";
import Room from "./VideoCall";
import { Link } from "react-router-dom";

import { Button, TextField, unsupportedProp } from "@material-ui/core";
import io from "socket.io-client";
// const socket=io.conect("http://localhost:4000");

const SidebarVideo = (props) => {
 
    console.log(props," sddsds ");

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
                 <Room props={props}/>

            </Scrollbar>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarVideo;
