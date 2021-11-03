/* eslint-disable */
import {useState, useEffect} from 'react';

export const useDrugs = () => {
  const [drug, setDrug] = useState([])

  useEffect(() => {
    fetch("https://ehrsystembackend.herokuapp.com/KNH/patient/drugs/all")
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setDrug(data.data)
            console.log(data.data);
        }
        else{
            console.log("no Drug");
        }
    })
  }, [])

  return { drug }
}
