/*eslint-disable*/
import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import style from "./ContactMe.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcFeedback, FcServices, FcEmptyTrash } from "react-icons/fc";
import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart,
} from "variables/charts.js";
import styles from "assets/jss/material-dashboard-react/views/rtlStyle.js";
import axios from "axios";
const useStyles = makeStyles(styles);

export default function RTLPage() {
    const [state, setstate] = useState([]);
    const [email, setemail] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        getMessages().then((data) => {
            setstate(data.data);
        });
    }, []);

    const getMessages = () => {
        const res = axios.get("http://mywork.loc/api/message/contact");

        return res;
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.get(`http://mywork.loc/api/message/delete/${id}`).then((res) => {
            const newArr = state.data.filter((item) => item.id !== id);
            setstate({ data: newArr });
        });
    };


        // SEND EMAIL




    // useEffect(() => {
    //     getMessages().then((data) => {
    //         setemail(data);
    //     });
    // }, []);

    // const Sendmessage = (e, email) => {
    //     e.preventDefault();
    //     axios.get(`http://mywork.loc/api/message/send/${email}`).then((res) => {
    //     return(res.data.email);
    //     })
    // }

    return (
        <div className="container mt-5">
            <table
                className={`table table-borderless table-responsive ${style.cardTable}  p-4`}
            >
                <thead>
                    <tr className={`${style.table_tr} border-bottom`}>
                        <th>
                            {" "}
                            <span className="ml-2 ">Id</span>{" "}
                        </th>
                        <th>
                            {" "}
                            <span className="ml-2">Agent</span>{" "}
                        </th>
                        <th>
                            {" "}
                            <span className="ml-2">Customer</span>{" "}
                        </th>
                        <th>
                            {" "}
                            <span className="ml-2">Location</span>{" "}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {state.data?.length > 0 ? (
                        state.data?.map((item) => {
                            return (
                                <tr
                                    key={item.id}
                                    className={`${style.tabler} border-bottom`}
                                >
                                    <td>
                                        <div className="p-2">
                                            {" "}
                                            <span className="d-block font-weight-bold">
                                                {item.id}
                                            </span>{" "}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="p-2 d-flex flex-row align-items-center  justify-content-around mb-2">
                                            {" "}
                                            <img
                                                src="https://www.nicepng.com/png/full/514-5146455_premium-home-loan-icon-download-in-svg-png.png"
                                                className="rounded-circle"
                                                width="40"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="p-2 d-flex flex-row align-items-center  justify-content-around mb-2">
                                            <div className="d-flex flex-column  ml-2">
                                                <span className="d-block font-weight-bold ">
                                                    {item.name}
                                                </span>
                                                <small className="text-muted">
                                                    {item.email}
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        className={`${style.message_user_contact} p-2`}
                                    >
                                        {item.message}
                                    </td>

                                    <td>
                                        <div className={`p-2 ${style.icons} `}>
                                            {" "}
                                            <a href="#" onClick={(e)=>{
                                                    Sendmessage(e, item.email)
                                            }}>
                                                <FcFeedback />
                                            </a>
                                            
                                            {/* <a href="#">
                                                <FcServices />
                                            </a> */}
                                            <a
                                                href="#"
                                                onClick={(e) =>
                                                    handleDelete(e, item.id)
                                                }
                                            >
                                                <FcEmptyTrash />
                                            </a>


{/* 
                                            {
                                                email.data?.map((itememail)=>{
                                                    return(
                                                         <a href={`mailto:${itememail.email}`}>
                                                            {itememail.email}
                                                         </a>  
                                                    )
                                                })
                                            } */}
                                            


                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr className="text-center" colspan="4">
                            No Data
                        </tr>
                    )}
                    k
                </tbody>
            </table>
        </div>
    );
}
