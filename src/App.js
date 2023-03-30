import { useAlert, DataQuery, Plugin } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import classes from './App.module.css'

const query = {
    me: {
        resource: 'me',
        fields: ['authorities']
    },
}

const CustomError = ({error}) => (
    <>
        <h2>App custom error component</h2>
        <p>{error?.message}</p>
    </>
)

CustomError.propTypes = {
    error: PropTypes.object,
}


const App = () => {
    const [includeId, setIncludeId] = useState(true)
    const {show} = useAlert('normal app alert')
    const [backgroundColor, setBackgroundColor] = useState('peachPuff')
    const [backgroundColorTwo, setBackgroundColorTwo] = useState('lightBlue')
    const [pluginPort, setPluginPort] = useState('3001')


    const [error,setError] = useState(null)
    const pluginInputRef = useRef()

    return (
        <div className={classes.container}>
            <DataQuery query={query}>
                {({ data }) => {

                    if (data) {
                        return (
                        <>
                            <h1>
                                Test plugins
                            </h1>
                            <button className={classes.appAlertButton} onClick={show}>show alert in app</button>                    

                            <div className={classes.pluginExampleContainer}>
                                <h2>Plugin 1</h2>
                                <h3>The app has custom handling for errors from this plugin and specifies that it should show alerts in the iframe</h3>

                                <p>{`Current background-color (plugin1): ${backgroundColor}`}</p>
                                <input ref={pluginInputRef}/>
                                <button onClick={()=>{setPluginPort(pluginInputRef.current.value)}}>
                                    Update plugin port
                                </button>
                                <div style={{backgroundColor: `${backgroundColor}`, border: 'none'}}>
                                    {error ? (<CustomError error={error} />) :
                                        (
                                        <Plugin
                                            pluginSource={`http://localhost:${pluginPort}/plugin.html`}
                                            onError={setError}
                                            showAlertsInPlugin={true}
                                            id={data.me.id}
                                            name={`${data.me.firstName} ${data.me.surname}`}
                                            username={data.me.username}
                                            setBackgroundColor={setBackgroundColor}
                                        />
                                        )
                                    }
                                </div>
                            </div>

                                

                            <div className={classes.pluginExampleContainer}>
                                <h2>Plugin 2</h2>
                                <h3>The plugin uses the default error boundary, and has alerts show in main window (the default)</h3>
                                <h4><i>Has a fixed height of 350px</i></h4>
                                <div className={classes.passIdContainer}>
                                    <label htmlFor="includeIdInput">Pass id to plugin 2</label>
                                    <input checked={includeId} id="includeIdInput" type="checkbox" onChange={()=>{setIncludeId(prevInclude=>!prevInclude)}}></input>
                                </div>                                
                                <p>{`Current background-color (plugin2): ${backgroundColorTwo}`}</p>
                                <div style={{backgroundColor: `${backgroundColorTwo}`, border: '5px dotted blue'}}>
                                    
                                    <Plugin
                                        pluginSource='http://localhost:3001/plugin.html'
                                        id={includeId ? data.me.id : null}
                                        name={`${data.me.firstName} ${data.me.surname}`}
                                        username={data.me.username}
                                        setBackgroundColor={setBackgroundColorTwo}
                                        height={200}
                                    />
                                </div>
                            </div>
                        </>
                        )
                    }
                    return null
                }}
            </DataQuery>
        </div>
)}

export default App