/* eslint-disable */
import {useState, useEffect} from 'react';

export const usePrescribedDrugs = (status) => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/patient/drugs/${status}`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            setData(data.data.length)
        }
        else{
            console.log("no Record");
        }
    })
  }, [])

  return data
}
