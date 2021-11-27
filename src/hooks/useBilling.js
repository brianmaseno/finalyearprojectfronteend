/* eslint-disable */
import {useState, useEffect} from 'react';
import { useBaseUrl } from './useBaseUrl';

export const useBilling = (status) => {
  const [bill, setBill] = useState(0)
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/patient/billing/${status}/report/all`)
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
  }, [status, base])

  return bill
}
