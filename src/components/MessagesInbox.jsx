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

export default function MessagesInbox() {

    const params = useParams();
    const to = params.to;

    const API_KEY = process.env.REACT_APP_API_KEY;

    const { data: ListData } = useFetch(API_KEY + '/showAllMessagesForStudent/' + to);
    return (
        <Grid container style={{ marginTop: "30px" }}>
            <Grid item xs={8} md={8} lg={8} style={{ marginLeft: "16%", marginTop: "8%" }} >
                {ListData && ListData.studentMessages &&
                    <Paper >
                        <Table >
                            <TableHead >
                                <TableRow>
                                    <TableCell style={{ textAlign: "center" }}>الرسالة</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>التاريخ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ListData.studentMessages.map(item => {
                                    return (
                                        <TableRow key={item.messageId}>
                                            <TableCell style={{ textAlign: "center" }}>{item.msg}</TableCell>
                                            <TableCell style={{ textAlign: "center" }}>{item.sendDate}</TableCell>
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
