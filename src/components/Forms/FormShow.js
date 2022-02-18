import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  postShow,
  postTicket,
  postNewsletterShow,
  theaterDetail,
} from "../../redux/actions/index.js";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import SeatForm from "../Seats/SeatForm.js";
import { useDispatch, useSelector } from "react-redux";
import style from "./FormShow.module.css";
import swal from "sweetalert";

const FormShow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const theater = useSelector((state) => state.theatersDetail);
  let { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const minfecha = new Date(Date());
  const minfechaaño = minfecha.getFullYear();
  const minfechames = minfecha.getMonth() + 1;
  let minfechames1 = minfechames.length !== 1 ? `0${minfechames}` : minfechames;
  const minfechadia = minfecha.getDate();
  const maxfechadia = minfecha.getDate() + 2;
  const fechadehoy = new String(
    `${minfechaaño}-${minfechames1}-${minfechadia}`
  );
  const fechadepasado = new String(
    `${minfechaaño}-${minfechames1}-${maxfechadia}`
  );

  useEffect(() => {
    dispatch(theaterDetail(id));
  }, [dispatch, id]);
  const [input] = useState({
    theaterName: theater.name,
  });
  const [seatsavailable, setSeatAvailable] = useState([]);
  const [form] = useState(true);
  console.log(seatsavailable, "seats");
  console.log(id);

  const onSubmit = (data) => {
    postNewsletterShow(theater.name);
    swal({
      icon: "warning",
      buttons: ['Cancelar', 'Confirmar'],
    })
    .then((res) => {
      console.log(res)
      if (res) {
        const inputs = {
          ...input,
          theaterName: theater.name,
          name: data.name,
          summary: data.summary,
          genre: data.genre,
          length: data.length,
          image: data.image,
          ticketsQty: seatsavailable.length,
          rated: data.rated,
          date: data.date,
          time: data.time,
          originPrice: data.originPrice,
        };
        //let tickets={}
        console.log("input", inputs);
        postShow(inputs);
        for (var i = 0; i < seatsavailable.length; i++) {
          const tickets = {
            price: data.originPrice,
            seatNumber: seatsavailable[i],
            nameShow: data.name,
          };
          console.log("ticket", tickets);
          postTicket(tickets);
        }
        swal("Espectaculo agregado!", {
          icon: "success",
        });
        history.push(`/theaterHome/${id}`);
      } else {
        swal("Tomate tu tiempo");
      }
    });
  };

  return (
    <div className={style.formShowContainer}>
      <Link to={`/theaterHome/${id}`}>
        <button className="btn btn-secondary">Volver</button>
      </Link>

      <div className={style.formShowCreate}>
        <div className="text-center padding">
          <h1>Agrega un Espectaculo</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Nombre</label>
            <input
              title="Nombre del Espectaculo"
              type="text"
              name="name"
              placeholder="Nombre de la obra"
              className="form-control"
              {...register("name", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.name && errors.name.message}
            </span>
          </div>
          <div className="col-md-12">
            <label className="form-label">Descripcion</label>
            <textarea
              title="Descripcion del espectaculo 1000 caracteres max"
              type="text"
              name="summary"
              width="100"
              height="30"
              maxLength="1000"
              placeholder="Descripcion de la Obra. Max 1000 caracteres."
              className="form-control"
              {...register("summary", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                maxLength: {
                  value: 1000,
                  message: "No se pueden mas de 1000 caracteres",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.summary && errors.summary.message}
            </span>
          </div>

          <div className="col-md-6">
            <label className="form-label col-lg-12">Genero</label>
            <select
              defaultValue=""
              name="genre"
              className="form-control "
              {...register("genre", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            >
              <option selected disabled="disabled" value="">
                
                Selecciona un genero
              </option>
              
                <option>Comedia</option>
                <option>Drama</option>
                <option>Tragedia</option>
                <option>Tragicomedia</option>
                <option>Monólogo</option>
                <option>Ópera</option>
                <option>Musical</option>
                <option>Danza</option>
            </select>
            <span className="text-danger text-small d-block mb-2">
              {errors.genre && errors.genre.message}
            </span>
          </div>

          <div className="col-md-6">
            <label className="form-label col-lg-12">Tipo de Publico</label>
            <select
              defaultValue=""
              name="rated"
              className="form-control "
              {...register("rated", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            >
              {" "}
              <option selected disabled="disabled" value="">
                Selecciona el Tipo de Publico
              </option>
              <option>Todas las edades</option>
              <option>Apta para mayores de 13 años</option>
              <option>Apta para mayores de 16 años</option>
              <option>Apta para mayores de 18 años</option>
              <option>Exhibición condicionada</option>
            </select>
            <span className="text-danger text-small d-block mb-2">
              {errors.rated && errors.rated.message}
            </span>
          </div>

          <div className="col-md-4">
            <label className="form-label">Hora</label>
            <input
              title="Ingrese la hora del comienzo del espectaculo"
              type="time"
              name="time"
              className="form-control "
              {...register("time", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.time && errors.time.message}
            </span>
          </div>

          <div className="col-md-4">
            <label className="form-label col-lg-12">Duracion</label>
            <input
              title="No se admiten numeros negativos ni decimales"
              type="number"
              name="length"
              placeholder="Minutos de la Obra"
              className="form-control "
              {...register("length", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                pattern: {
                  value: /^(0|[1-9][0-9]*)$/,
                  message: "No se pueden numero negativos ni decimales",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.length && errors.length.message}
            </span>
          </div>

          <div className="col-md-4">
            <label className="form-label col-lg-12">Fecha</label>
            <input
              title="Solo se puden agregar espectaculos con un max de 48h del comienzo del espectaculo"
              type="date"
              name="date"
              min={fechadehoy}
              max={fechadepasado}
              className="form-control "
              {...register("date", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.date && errors.date.message}
            </span>
          </div>

          <div className="col-md-6">
            <label className="form-label col-lg-12">Imagen</label>
            <input
              type="url"
              name="image"
              className="form-control "
              {...register("image",{
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.image && errors.image.message}
            </span>
          </div>

          <div className="col-md-6">
            <label className="form-label col-lg-12">Precio Original</label>
            <input
              title="Precio original de la obra, el descuento se hace dinamicamente cada 6h empieza con 30% y termina en un 10%"
              type="number"
              name="originPrice"
              className="form-control "
              placeholder="Precio por entrada"
              {...register("originPrice", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.originPrice && errors.originPrice.message}
            </span>
          </div>

          <div className="col-md-12">
            <label className="form-label col-lg-12">Asientos disponibles</label>
            <SeatForm
              seatsavailable={seatsavailable}
              setSeatAvailable={setSeatAvailable}
              form={form}
            ></SeatForm>

            <small>
              Selecciona los asientos disponibles para el espectaculo
            </small>
          </div>

          <br />
          <div className="col-md-12">
            <button className="btn btn-dark" type="submit">
              Agregar Espectaculo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormShow;
