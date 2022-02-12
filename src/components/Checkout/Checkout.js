import React, { useEffect, useState } from "react";
import { showDetail, checkoutPay } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/logo a sala llena-sinfondo.png";
import style from "./Checkout.module.css";


export default function Checkout() {
    const show = useSelector((state) => state.showdetail);
    const dispatch = useDispatch();
    const { id } = useParams();
    const COOKIES_POLICY = "http://localhost:3000"

    useEffect(() => {
        dispatch(checkoutPay(id));
    }, [dispatch]);

    // function checkoutOnClick () {
    //     document.location.href = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=${keyMP}`
    // }

    return (
        <div>
            <Link to="/">
                <img src={logo} className={style.logo} alt="A sala llena" />
            </Link>
            <h1>{show.name}</h1>
            <div>
            <h3>Fecha: </h3>
            <h4>{show.date} </h4>
            <h3>Precio</h3>
            <h3>Cantidad de entradas</h3>
            <h3>Total:</h3>
            </div>
            {show.tickets?.map(t => {
                return (
                    <div>
                        <div class="#button-checkout" id="button-checkout" cookiePolicy={COOKIES_POLICY}></div>

                    </div>
                )
            })}
        </div>
    )

}