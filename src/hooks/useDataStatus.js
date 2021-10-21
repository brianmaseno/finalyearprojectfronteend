/* eslint-disable */
import React, {useState, useEffect} from 'react'

export const useDataStatus = (data) => {
  
  const [loading, setLoading] = useState(false)

    useEffect(() => {
      if (data == null) {
        setLoading(false);
      }
      else{
        setLoading(true)
      }
    }, [])

    return { loading }

}