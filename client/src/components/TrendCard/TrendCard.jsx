import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData'

const TrendCard = () => {
  return (
      <div className="TrendCard">
          <h3>Trends for you</h3>
          {TrendData.map((value )=> {
              return (
                  <div className="Trend">
                      <span>#{value.name}</span>
                      <span>#{value.shares}k shares</span>
                 </div>
             ) 
          })
          }
    </div>
  )
}

export default TrendCard