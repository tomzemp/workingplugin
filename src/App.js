import React, { useState } from 'react'
import { DataQuery, PluginSender } from '@dhis2/app-runtime'
import classes from './App.module.css'

const query = {
    me: {
        resource: 'me',
        fields: ['authorities']
    },
}

const RealApp = () => {

    const [includeId, setIncludeId] = useState(true)

    return (
        <div className={classes.container}>
            <DataQuery query={query}>
                {({ data }) => {
                    const [width, setWidth] = useState(50)
                    const [otherWidth, setOtherWidth] = useState(80)
                    if (data) {
                        return (
                        <>
                            <h1>
                                Test plugins
                            </h1>
                            <label htmlFor="includeIdInput">Pass id to plugin 1</label>
                            <input checked={includeId} id="includeIdInput" type="checkbox" onChange={()=>{setIncludeId(prevInclude=>!prevInclude)}}></input>
                            <p>{`Current width (plugin1): ${width}%`}</p>
                            <div style={{width: `${width}%`, border: '1px solid'}}>
                                <PluginSender
                                    pluginSource='http://localhost:3001/plugin.html'
                                    id={includeId ? data.me.id : null}
                                    name={data.me.username}
                                    setWidth={setWidth}
                                    width={width}
                                />
                            </div>

                            <p>{`Current width (plugin2): ${otherWidth}%`}</p>
                            <div style={{width: `${otherWidth}%`, border: '5px dotted blue'}}>
                                
                                <PluginSender
                                    pluginSource='http://localhost:3001/plugin.html'
                                    id={data.me.id}
                                    name={data.me.username}
                                    setWidth={setOtherWidth}
                                    width={otherWidth}
                                />
                            </div>
                        </>
                        )
                    }
                    return null
                }}
            </DataQuery>
        </div>
)}

export default RealApp