import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {allShows, getViewerDetail, getAllTickets, allTheaters} from '../../redux/actions/index.js';
import NavBarPerfilViewer from "../NavBar/NavBarPerfilViewer.js";
import Footer from '../Footer/Footer.js';

const ViewerHistory = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.shows);
    const viewer = useSelector((state) => state.viewerDetail);
    const ticket = useSelector((state) => state.tickets);
    const theater = useSelector((state) => state.theaters);
    const {id} = useParams();
    let showID;
    let theaterID;

    useEffect(()=>{
        dispatch(allShows())
        dispatch(getViewerDetail(id))
        dispatch(getAllTickets())
        dispatch(allTheaters())
    },[dispatch])

    console.log('show',show)
    let filterTicket = ticket?.filter(e => e.viewer.id === viewer.id)
    console.log('filterTicket',filterTicket)
    
    for (let i = 0; i < filterTicket.length; i++) {
        showID = filterTicket[i].showId
    }
    console.log(showID)

    let filterShow = show?.filter(e => e.id === showID)
    console.log('filterShow',filterShow)

    for (let j = 0; j < filterShow.length; j++) {
        theaterID = filterShow[j].theaterId
    }
    console.log('theaterID',theaterID)

    
    let total = filterTicket.map(e=> e.price)
    
    console.log(total)

    let filterTheater = theater?.find(e => e.id === theaterID)
    console.log('filterTheater',filterTheater)

    return(
        <div>
            <NavBarPerfilViewer/>
            {
                filterShow.length && filterTicket.length ?(
                    filterShow.map((e)=>{
                        return(
                            <div key={e.id}>
                                <h3>{e.name}</h3>
                                <p>{filterTheater.name} </p>
                                <p>Funcion: {e.date} {e.time}</p>
                                <h4>Cantidad: {filterTicket.length}</h4>
                                <h4>Total: ${total?.reduce(function(a, b){ return a + b; })} </h4>
                            </div>
                        )
                    })
                ) : (
                    <h1>NO HAY ENTRADAS COMPRADAS</h1>
                )
            }
            <Footer/>
        </div>
        
    )
}

export default ViewerHistory;