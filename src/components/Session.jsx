import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { ArrowBackIosRounded } from "@material-ui/icons";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Profile() {

    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const courseId = params.courseId;
    const studentId = params.studentId;

    const { error, isPending, data: Student } = useFetch(API_KEY + '/showStudent/' + studentId);
    const { data: Course } = useFetch(API_KEY + '/showCourse/' + courseId);
    const { data: StudentData } = useFetch(API_KEY + '/showStudentTestsInCourse/' + courseId + "/" + studentId);
    return (
        <div style={{marginRight:"15%",marginTop: "3%" , width:"60%"}} >
            {error && <div>{error}</div>}
            {isPending && <div style={{ marginRight: "50%" }}>Loading...</div>}
            {Student && Course &&
                <h3  style={{ textAlign: "center", color: "rgba(39,116,218,0.5)" }}>
                    {Student.Student.name} <br />
                    {Course.Course.subject + "-" + Course.Course.type}</h3>
            }
            {StudentData && StudentData.Tests &&
                <Paper style={{width:"100%"}}>
                    <Table  style={{width:"100%"}}>
                        <TableHead >
                            <TableRow>
                                <TableCell style={{ textAlign: "center" }}>السبب</TableCell>
                                <TableCell style={{ textAlign: "center" }}>الأستاذ المسمع</TableCell>
                                <TableCell style={{ textAlign: "center" }}>التسميع </TableCell>
                                <TableCell style={{ textAlign: "center" }} >التفقد</TableCell>
                                <TableCell style={{ textAlign: "center" }} >رقم الجلسة</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {StudentData.Tests.map(item => {
                                return (
                                    <TableRow key={item.testId}>
                                        <TableCell style={{ textAlign: "center" }} component="th" scope="row" >
                                            {item.cause}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{item.teacher}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{item.value}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{item.studentStatus}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{item.sessionNumber}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            }
        </div>
    );
}
