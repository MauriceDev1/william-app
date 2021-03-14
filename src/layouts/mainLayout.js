import React from 'react'
import Header from '../components/header.js'
import Footer from '../components/footer.js'

function mainLayout(props) {
    return (
        <div>
            <Header {...props}/>
            <div className="main h-screen">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default mainLayout
