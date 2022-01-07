/* eslint-disable */
import React from 'react'

export const useBaseUrl = () => {
  const baseUrl = "http://localhost:9000";

  if (baseUrl != "") {
    return baseUrl;
  }
  else{
    return "";
  }
  
}
