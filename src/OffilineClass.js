/* eslint-disable */
import React from 'react'
import internet from '../src/assets/img/nowifi.png';
import './offline.css';

export default function OffilineClass() {
  return (
    <div className="offlineContainer">
      <div className="cont2">
        <div class="cont3">
          <div className="imgInner">
            <img src={internet} alt="photo" className="offlineimg"/>
          </div>
          <p classname="offlinetxt">You are offline, check internet Connectivity</p>
        </div>
      </div>
    </div>
  )
}
