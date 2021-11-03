/* eslint-disable */
import {useState, useEffect} from 'react';

export const useBilling = (status) => {
  const [bill, setBill] = useState(0)

  useEffect(() => {
    fetch(`https://ehrsystembackend.herokuapp.com/KNH/patient/billing/${status}/report/all`)
    .then(response => response.json())
    .then((data) => {
        if (data.message == "Found") {
            if (data.data.length > 0) {
              let total = 0
              for (let index = 0; index < data.data.length; index++) {
                total += parseInt(data.data[index].service_cost)
              }
              setBill(total)
            }
        }
        else{
            console.log("no Drug");
        }
    })
  }, [status])

  return bill
}
