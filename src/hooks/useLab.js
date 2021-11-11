/* eslint-disable */
import {useState, useEffect} from 'react';

export const useLab = () => {
  const [lab, setLab] = useState([])

  useEffect(() => {
    fetch("https://ehrsystembackend.herokuapp.com/KNH/patient/lab/tests/report")
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Report Found") {
            setLab(data.data)
            console.log(data.data);
        }
        else{
            console.log("no Lab Record");
        }
    })
  }, [])

  return { lab }
}
