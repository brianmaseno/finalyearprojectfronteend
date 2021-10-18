/* eslint-disable */
import React, {useState, useEffect} from 'react'

export const useDataStatus = (data) => {
  
  const [loading, setLoading] = useState(false)

    useEffect(() => {
      if (data.length > 0) {
        setLoading(true);
      }
      else{
        setLoading(false)
      }
    }, [data])

    return { loading }

}