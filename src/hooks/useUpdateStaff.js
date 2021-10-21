/* eslint-disable */
import React, {useState, useEffect} from 'react'

export const useUpdatedStaff = (endpoint, username) => {
  const [updated, setUpdated] = useState(false)

  fetch(`https://ehrsystembackend.herokuapp.com/KNH/staff/${endpoint}?username=${username}`)
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