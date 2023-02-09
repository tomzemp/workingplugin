import { useAlert, DataQuery, PluginSender } from '@dhis2/app-runtime'
import React, { useState } from 'react'
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

const App = () => {
    const [includeId, setIncludeId] = useState(true)
    const {show} = useAlert('normal app alert')
    const [width, setWidth] = useState(50)
    const [otherWidth, setOtherWidth] = useState(80)
    const [error,setError] = useState(null)

    return (
        <div className={classes.container}>
            <DataQuery query={query}>
                {({ data }) => {
                    const onErrorOne = (error) => {
                        console.log('the app has received the plugin error')
                        console.error(error)
                        setError(error)
                    }

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

                                <p>{`Current width (plugin1): ${width}%`}</p>
                                <div style={{width: `${width}%`, border: '1px solid', height: '200px'}}>
                                    {error ? (<CustomError error={error} />) :
                                        (
                                        <PluginSender
                                            pluginSource='http://localhost:3001/plugin.html'
                                            onError={onErrorOne}
                                            showAlertsInPlugin={true}                                            
                                            id={data.me.id}
                                            name={`${data.me.firstName} ${data.me.surname}`}
                                            username={data.me.username}
                                            setWidth={setWidth}
                                            width={width}
                                        />
                                        )
                                    }
                                </div>
                            </div>

                            <div className={classes.pluginExampleContainer}>
                                <h2>Plugin 2</h2>
                                <h3>The plugin uses the default error boundary, and has alerts show in main window (the default)</h3>
                                <div className={classes.passIdContainer}>
                                    <label htmlFor="includeIdInput">Pass id to plugin 2</label>
                                    <input checked={includeId} id="includeIdInput" type="checkbox" onChange={()=>{setIncludeId(prevInclude=>!prevInclude)}}></input>
                                </div>                                
                                <p>{`Current width (plugin2): ${otherWidth}%`}</p>
                                <div style={{width: `${otherWidth}%`, border: '5px dotted blue', height: '200px'}}>
                                    
                                    <PluginSender
                                        pluginSource='http://localhost:3001/plugin.html'
                                        id={includeId ? data.me.id : null}
                                        name={`${data.me.firstName} ${data.me.surname}`}
                                        username={data.me.username}
                                        setWidth={setOtherWidth}
                                        width={otherWidth}
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