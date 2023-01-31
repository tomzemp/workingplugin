import React from 'react'

export const PluginWrapper = ({requiredProps, children}) => {
	const propsFromParent = {setWidth:(msg)=>{console.log('cat')}}
	return children({...propsFromParent})
}