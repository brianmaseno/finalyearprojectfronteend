/* eslint-disable */
import {useState, useEffect} from 'react';

export const usePendingLab = () => {
  const [pending, setPending] = useState("")

  useEffect(() => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/patient/lab/tests/requests`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Requests Found") {
            setPending(data.data.length)
            console.log(data.data.length);
        }
        else{
            console.log("no Lab Record");
        }
    })
  }, [])

  return { pending }
}
