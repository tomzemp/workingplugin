import React, {useEffect, useState} from 'react'
import { PluginWrapper } from '@dhis2/app-runtime'
import { useAlert } from '@dhis2/app-runtime'

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
        <button onClick={()=>{setThrowInnerErrorNow(true)}}>Throw error (inner)</button>
        </>
    )
}

const MyPlugin = () => (

    <PluginWrapper requiredProps={['id']}>
        {(propsFromParent)=>{
            const [pluginWidth, setPluginWidth] = useState()
            const { show } = useAlert(
                ({ username }) => `Alert about ${username}`
            )            
            useEffect(()=>{setPluginWidth(propsFromParent.width)},[propsFromParent.width])

            const [throwErrorNow, setThrowErrorNow] = useState(false)
            useEffect(()=>{
                if(throwErrorNow){
                    throw new Error('Error from top-level PluginWrapper')
                }
            },[throwErrorNow])

            return(
                <>
                    <h3>{`Passed props ${JSON.stringify(propsFromParent)}`}</h3>
                    <div>
                        <input value={pluginWidth||''} onChange={(ev)=>{
                            setPluginWidth(ev.target.value)}}/>
                        <button onClick={()=>{propsFromParent.setWidth(pluginWidth)}}>
                            Update width
                        </button>
                        <button onClick={()=>show({username: propsFromParent.name, isCurrentUser: false})}>Show an alert</button>
                        {/* errors within the level of te PluginWrapper child function will be caught by appwrapper ErrorBoundary */}
                        <button onClick={()=>{setThrowErrorNow(true)}}>throw an error (outer)</button>
                        {/* error in components will be caught by PluginWrapper ErrorBoundary  */}
                        <InnerButton />
                    </div>
                </>
            )
        }}
    </PluginWrapper>
)

export default MyPlugin