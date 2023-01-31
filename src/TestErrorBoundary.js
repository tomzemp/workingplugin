import * as React from 'react'

export class TestErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log('i am the test error boundary in the plugin')
      this.setState({error})
    }
  
    render() {
      if (this.state.error) {
        return <h1>test boundary?</h1>;
      }
  
      return this.props.children; 
    }
  }
  