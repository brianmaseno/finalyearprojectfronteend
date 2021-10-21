/* eslint-disable */
import {useState, useEffect} from 'react';

export const usePatients = () => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetch("https://ehrsystembackend.herokuapp.com/KNH/patient/allpatients")
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Patients Records available") {
            setPatients(data.data)
            console.log(data.data);
        }
        else{
            console.log("no Patient");
        }
    })
  }, [])

  return { patients }
}
