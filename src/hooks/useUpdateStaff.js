/* eslint-disable */
import React, {useState, useEffect} from 'react'
import { useBaseUrl } from './useBaseUrl'

export const useUpdatedStaff = (endpoint, username) => {
  const [updated, setUpdated] = useState(false)
  const base = useBaseUrl()

  fetch(`${base}/KNH/staff/${endpoint}?username=${username}`)
    .then(response => response.json())
    .then((data) => {
        if (data.message != null) {
          setUpdated(true);
        }
        else{
          setUpdated(false)
        }
    })

  return updated

}