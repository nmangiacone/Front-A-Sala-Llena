import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { editProfileT, theaterDetail} from "../../redux/actions";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";

const EditProfileTheater = () => {
  const dispatch = useDispatch()
  const {id} = useParams();
  const { theatersDetail } = useSelector(state => state)
  let { name,image,CUIT,adress,email,password,province,phoneNumber,seatsQTY,score} = theatersDetail
  const [input, setInput] = useState({
    name: name?`${name}`:'', 
    image: image?`${image}`:'',
    CUIT: CUIT?`${CUIT}`:'',
    email: email?`${email}`:'',
    password: password?`${password}`:'',
    adress: adress?`${adress}`:'', 
    province: province?`${province}`:'', 
    phoneNumber: phoneNumber?`${phoneNumber}`:'',
    seatsQTY: seatsQTY?`${seatsQTY}`:'', 
    score: score?`${score}`:'',
  });
  const provinces = ["Buenos Aires", "Cordoba", "Santa Fe", "Catamarca", "Chaco", "Chubut", "Corrientes",
  "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza","Misiones", "Neuquen", "Rio Negro",
  "Salta", "San Juan", "San Luis", "Santa Cruz", "Santiago del Estero", "Tierra del Fuego", "Tucuman",
  "CABA"]
  console.log('theatersDetail: ', theatersDetail)


  const handleChange = ({target: {name, value }}) => {
    setInput({
      ...input,
      [name]: value,
    });
  };    

  function handleSubmit (e) {
    e.preventDefault()
    dispatch(editProfileT({...input, id}))
  }
  useEffect(()=>{
    dispatch(theaterDetail(id))
  },[dispatch])

    return (
    <div>
        <form onSubmit={handleSubmit}>  
      {/* name */}
      <input name="name" type="text" value={input.name} onChange={handleChange} placeholder="Name of the theater" />
      {/* image*/}
      <input name="image" type="text" value={input.image} onChange={handleChange} placeholder="image" />
      {/*CUIT*/}
      <input name="CUIT" type="text" value={input.CUIT} onChange={handleChange} placeholder="CUIT" />
      {/* email */}
      <input name="email" type="text" value={input.email} onChange={handleChange} placeholder="email" />
      {/* password  */}
      <input name="password" type="text" value={input.password} onChange={handleChange} placeholder="Password" />
      {/* adress */}
      <input name="adress" type="text" value={input.adress} onChange={handleChange} placeholder="Adress" />
      {/* province */}
      <select onChange={handleChange} name='province' value={input.province}>
        <option value=''>Province</option>
        {provinces.map(el => <option value={el}>{el}</option>)} 
      </select>
      {/* phoneNumber */}
      <input name="phoneNumber" type="text" value={input.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
      {/* seatsQTY */}
      <input name="seatsQTY" type="number" value={input.seatsQTY} min='1'max='1000'onChange={handleChange} placeholder="Seates" />
      <input name="score" type="range" value={input.score} min='1' max='5' onChange={handleChange} placeholder="Score" />
      <lavel style={{color: 'white'}}>{input.score}</lavel>
      {/* {input.name && input.image &&
        input.adress && input.phoneNumber && input.province? 
        <button >Save</button>: 
        <button disabled>Save</button>} */}
        <button>save</button>
    </form>
    <Footer/>
    </div>
    );
  }

export default EditProfileTheater
