import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'
// import octane from '../assets/octane.png'

class App extends React.Component {
    render() {
        return (
            <div className="application">
                <Helmet>
                    <style>{'body { background-color: #953036; }'}</style>
                </Helmet>
                <Header />
            </div>
        )
    }
}

export default App