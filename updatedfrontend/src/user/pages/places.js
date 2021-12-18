import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import "./image.css"

const NewComponent  =()=>{
    const [loading,setloading] = useState(true)
    const [places,setPlaces] = useState([])

    useEffect(()=>{
        axios.post("http://localhost/userplaces", {token:localStorage.getItem("token")})
        .then((response)=>{
            setPlaces(response.data)
        setloading(false)
        }
       ).catch((err)=>{
           console.error(err)
           setloading(false)
       })
    },[])


    if(loading){
        return <h1>Loading....</h1>
    }


    if(!places.length){
        return <h1>No Places</h1>
    }



    return (
        <ul>
        { places.map((item, index, arr)=>
        {return <li key={index}>{item.location_name},{item.place_name},
        <img src={`http://localhost/public/${item.place_picture}`} className="image"/></li>}) }
        </ul>
    )

}
export default NewComponent

