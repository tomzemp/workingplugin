import { useAlert } from '@dhis2/app-runtime'
import React, {useEffect, useState} from 'react'
import classes from './Plugin.module.css'

const InnerButton = () => {
    const [throwInnerErrorNow, setThrowInnerErrorNow] = useState(false)
    useEffect(()=>{
        if (throwInnerErrorNow) {
            throw new Error('Error from component further down')
        }
    },[throwInnerErrorNow])

    return (
        <>
        <br/>
        <button onClick={()=>{setThrowInnerErrorNow(true)}}>Throw an error (inner)</button>
        </>
    )
}

const PluginInner = (propsFromParent) => {
    const [pluginBackgroundColor, setPluginBackgroundColor] = useState()
            
    const { show } = useAlert(
        ({ username }) => `Alert about ${username}`,
        {critical: true}
    )            
    useEffect(()=>{setPluginBackgroundColor(propsFromParent.backgroundColor)},[propsFromParent.backgroundColor])

    const [throwErrorNow, setThrowErrorNow] = useState(false)
    useEffect(()=>{
        if(throwErrorNow){
            throw new Error('Error from top-level PluginWrapper')
        }
    },[throwErrorNow])

    return(
        <div id="thisIsMYInternalPlugin" className={classes.pluginContainer}>
            <span className={classes.pluginIntro}>{`👋 ${propsFromParent.name}. I am a plugin that doesn't do very much, but I can ask my parent app to reset my background-color`}</span>
            {/* <span className={classes.pluginPassedProps}>{`Passed props ${JSON.stringify(propsFromParent,null,1)}`}</span> */}
            <div>
                <div className={classes.buttonStrip}>
                    <input value={pluginBackgroundColor||''} onChange={(ev)=>{
                        setPluginBackgroundColor(ev.target.value)}}/>
                    <button onClick={()=>{propsFromParent.setBackgroundColor(pluginBackgroundColor)}}>
                        Update background-color
                    </button>
                </div>
                <div className={classes.buttonStrip}>
                    <button onClick={()=>show({username: propsFromParent.name, isCurrentUser: false})}>Show an alert</button>
                    <button onClick={()=>{setThrowErrorNow(true)}}>Throw an error (outer)</button>
                    <InnerButton />
                    
                </div>
            </div>
        </div>
    )
}

const MyPlugin = (propsFromParent) => (
    <PluginInner {...propsFromParent} />
)

export default MyPlugin