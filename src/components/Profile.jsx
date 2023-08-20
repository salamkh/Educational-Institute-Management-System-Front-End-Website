import React, { useState } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import { ArrowBackIosRounded, Message } from "@material-ui/icons";

import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Profile() {

    const params = useParams();
    const id = params.id;

    const API_KEY = process.env.REACT_APP_API_KEY;

    const { error, isPending, data: ListData } = useFetch(API_KEY + '/showStudent/' + id);
    const { data: CourseData } = useFetch(API_KEY + '/showstudentCoursess/' + id);
    return (
        <Grid container >
            
            <Grid item xs={11} md={11} lg={11} style={{
                height: "100%",
                width: "100%",
                marginTop: "30px",
            }}>

                {error && <div>{error}</div>}
                {isPending && <div style={{ marginLeft: "50%" }}>Loading...</div>}
                {ListData && ListData.Student &&

                    <h3 style={{
                        fontSize: "15px", backgroundImage: "url(/img/info.png)",
                        backgroundSize: "contain", backgroundRepeat: "no-repeat",
                        width: "50%", height: "50%",
                        overflowX: "hidden", overflowY: "hidden",
                        textAlign: "center", padding: "10px",
                        direction: "rtl", justifyContent: "center", position: "absolute",
                        marginLeft: "25%"
                    }}>
                        <p style={{ marginTop: "10%" }}>
                            {ListData.Student.name}
                            <br />
                            تاريخ الميلاد : {ListData.Student.birthdate}
                            <br />
                            رقم الهاتف : {ListData.Student.phone}
                            <br />
                            العنوان : {ListData.Student.address}
                            <br />
                            الجنس : {ListData.Student.gender}
                            <br />
                            الحالة : {ListData.Student.myStatus}
                        </p>
                    </h3>
                }
            </Grid>
            <Grid item xs={1} md={1} lg={1}>
                {ListData && ListData.Student &&
                    <Tooltip title="الرسائل المستلمة">
                        <a href={"/components/MessagesInbox/" + ListData.Student.phone}>
                            <Message
                                style={{
                                    backgroundColor: "rgba(39,116,218,0.7)",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    color: "white",
                                    marginTop:"50%"
                                }}
                            />
                        </a>
                    </Tooltip>
                }
            </Grid>
            <Grid item xs={8} md={8} lg={8} style={{ marginLeft: "16%", marginTop: "8%" }} >
                {CourseData && CourseData.Course &&
                    <Paper >
                        <Table >
                            <TableHead >
                                <TableRow>
                                    <TableCell style={{ textAlign: "center" }}>السبب</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>الأستاذ المقييم</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>التقييم الدراسي</TableCell>
                                    <TableCell style={{ textAlign: "center" }} >التقييم السلوكي</TableCell>
                                    <TableCell style={{ textAlign: "center" }} >الجلسات</TableCell>
                                    <TableCell style={{ textAlign: "center" }} >الدورة</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {CourseData.Course.map(item => {
                                    return (
                                        <TableRow key={item.courseId}>
                                            <TableCell style={{ textAlign: "center" }} component="th" scope="row" >
                                                {item.cause}
                                            </TableCell>
                                            <TableCell style={{ textAlign: "center" }}>{item.teacher}</TableCell>
                                            <TableCell style={{ textAlign: "center" }}>{item.value}</TableCell>
                                            <TableCell style={{ textAlign: "center" }}>{item.behavior}</TableCell>
                                            <TableCell style={{ textAlign: "center" }}><a href={'/components/Session/' + item.courseId + '/' + id}><ArrowBackIosRounded /></a></TableCell>
                                            <TableCell style={{ textAlign: "center" }}>{item.subject}-{item.type}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                }
            </Grid>
           
        </Grid>
    );
}
