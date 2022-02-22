import React, { useEffect, useState } from "react";
import NavBarTheater from "../NavBar/NavBarTheater";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTickets,
  allShows,
  theaterDetail,
} from "../../redux/actions/index.js";
import { useParams } from "react-router-dom";
import style from "./SalesHistory.module.css";
import Card from "react-bootstrap/Card";
const SalesHistory = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const show = useSelector((state) => state.shows);
  const theater = useSelector((state) => state.theatersDetail);
  const { id } = useParams();
  const [decod, setDecod] = useState("");

  useEffect(async () => {
    await setDecod(atob(id));
    console.log("decod", decod);
  }, [id]);

  useEffect(() => {
    dispatch(getAllTickets());
    dispatch(allShows());
    dispatch(theaterDetail(decod));
  }, [dispatch, decod]);

  let filterShows = show?.filter(
    (e) => e.theaterId === theater?.id 
  );
  
  let total = filterShows?.map(e => e.total)
  console.log('total', total)
  let finalTotal = 0;
  if(total?.length > 0){
    finalTotal = total?.reduce(function (a, b) {return a + b;})
  }
  console.log("filter", filterShows);

  
  return (
    <div>
      <NavBarTheater id={decod} img={theater?.image} name={theater?.name} />
      <div className={style.cardContainer}>
        <div>
          <h1>Venta total al día de hoy: ${finalTotal} </h1>
        </div>
        {filterShows.length ? (
          filterShows?.map((e, i) => {
            return (
              <div key={e.id} className={style.card}>
                <Card border="dark" style={{ width: "18rem" }}>
                  <Card.Header>
                    Cantidad de entradas:{e.ticketsSold}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{e.name}</Card.Title>
                    <Card.Text>
                      <p>
                        Total vendido: ${e.total}
                        {/*total?.reduce(function (a, b) {
                          return a + b;
                        })*/}
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <div>
          <img src='https://media.giphy.com/media/q15kbCtGFqwx8wYx1n/giphy.gif' alt='img'/>
          {/*<p>NO HAY VENTAS PARA MOSTRAR</p>*/}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
