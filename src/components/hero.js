import React from 'react'
import HeroImg from '../assets/1.jpg'

function hero() {
    return (
        <div className="bg-gray-200 h-96" style={{backgroundImage: `url(${HeroImg}`, backgroundRepeat: 'no-repeat', }}>
        </div>
    )
}

export default hero
