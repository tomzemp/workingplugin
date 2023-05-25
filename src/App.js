import { useAlert, DataQuery, Plugin } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
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

CustomError.propTypes = {
    error: PropTypes.object,
}


const App = () => {
    const [includeId, setIncludeId] = useState(true)
    const {show} = useAlert('normal app alert')
    const [backgroundColor, setBackgroundColor] = useState('peachPuff')
    const [backgroundColorTwo, setBackgroundColorTwo] = useState('lightBlue')
    const [showLongString, setShowLongString] = useState(false)


    const [error,setError] = useState(null)
    const longString = "Once_upon_a_time,_there_was_an_app_that_had_a_ridiculously_long_string._Why_did_the_people_make_me_so_long,_the_string_asked_itself?_If_I_were_written_in_a_language_without_spaces,_then_I_could_understand_the_choice_not_to_have_spaces,_but_I_am_written_in_English_and_therefore_my_creator_really_ought_to_have_used_spaces_and_not_underscores_to_separate_the_words_which_compose_me._Now_I_am_forced_to_flow_far_far_out_to_the_ends_of_the_page_and_cause_problems_for_those_who_have_to_use_me"

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
                                <h4><i>Uses auto-resizing for height</i></h4>

                                <p>{`Current background-color (plugin1): ${backgroundColor}`}</p>
                                <div style={{backgroundColor: `${backgroundColor}`, border: '1px solid black', display: 'inline-block'}}>
                                    {error ? (<CustomError error={error} />) :
                                        (
                                        <Plugin
                                            pluginSource='http://localhost:3001/plugin.html'
                                            onError={setError}
                                            showAlertsInPlugin={true}
                                            id={data.me.id}
                                            name={`${data.me.firstName} ${data.me.surname}`}
                                            username={data.me.username}
                                            setBackgroundColor={setBackgroundColor}
                                            automaticallyResize={true}
                                        />
                                        )
                                    }
                                </div>
                            </div>
                            <button onClick={()=>{setShowLongString(prev=>!prev)}}>toggle long string</button>
                            {showLongString &&
                                <span>{longString}</span>
                            }
                                

                            {/* <div className={classes.pluginExampleContainer}>
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
                                        height={350}
                                    />
                                </div>
                            </div> */}
                        </>
                        )
                    }
                    return null
                }}
            </DataQuery>
        </div>
)}

export default App