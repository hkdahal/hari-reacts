import React, { Component } from 'react'
import { connect } from 'react-redux'
import './TopicsScreen.css'

// Rule: Smart components are not allowed to have any logic except dispatching actions.
class TopicsScreen extends Component {
    render() {
        return (
            <h2>Where are my topics, Hari?</h2>
        )
    }
}

// which props do we want to inject, given the global store state?
function mapStateTopProps(state) {
    return {}
}

export default connect(mapStateTopProps)(TopicsScreen)