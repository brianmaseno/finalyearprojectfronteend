/* eslint-disable */
import React, {useState, useEffect} from 'react'
import { useBaseUrl } from './useBaseUrl'

export const useLabTechnicianIds = () => {
  const [data, setData] = useState([])
  const base = useBaseUrl()

  useEffect(() => {
    fetch(`${base}/KNH/staff/all`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
            console.log(data.data);
            let outP = [];
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].qualification === "Lab Technician") {
                outP.push(data.data[i]);
              }
            }

            setData(outP);
          }
          else{
            setData([])
          }
      })
  }, [base])

  return data

}