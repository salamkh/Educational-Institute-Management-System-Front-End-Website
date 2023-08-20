import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import useFetch1 from "../useFetch1";
import useFetch from "../useFetch";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

export default function Feed() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const { error, isPending, data: ListData } = useFetch1(API_KEY + '/showAllAdvertisment');

  return (
    <div
      style={{
        marginRight:"-70px",
        marginTop: "50px",
        height: "30%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {ListData && ListData.Advertisment && ListData.Advertisment.map((adv) => {
        return <div key={adv.advertisementId} 
        style={{
          backgroundImage: "url(/img/info.png)",
          backgroundSize: "contain", backgroundRepeat: "no-repeat",
          width: "450px", height: "250px",
          overflowX: "hidden", overflowY: "hide",
          textAlign: "center", padding: "10px",
          direction: "rtl", justifyContent: "center",

          
        }}>
          <h3 style={{
            fontSize: "15px", width: "320px", height: "100"
            , overflowX: "hidden", overflowY: "hidden",
            marginTop:"7%",paddingRight:"10px"
          }}> <p style={{ color: "CaptionText" }}>{adv.date}</p>
            <br />
            {adv.advertismentContent}</h3>
        </div>
      })}
    </div>
  );
}
