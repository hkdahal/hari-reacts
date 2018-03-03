import React, { Component } from 'react'
import { connect } from 'react-redux'
import './TopicsScreen.css'
import * as topicsActions from '../reducers/topics/actions'
import * as topicsSelectors from '../reducers/topics/reducer'
import ListView from '../components/ListView'

// Rule: Smart components are not allowed to have any logic except dispatching actions.
class TopicsScreen extends Component {

    componentDidMount() {
        this.props.dispatch(topicsActions.fetchTopics())
    }

    render() {
        if (!this.props.rowsById) return this.renderLoading()
        return (
            <div className="TopicsScreen">
                <ListView
                    rowsIdArray={this.props.rowsIdArray}
                    rowsById={this.props.rowsById}
                    renderRow={this.renderRow}/>
            </div>
        )
    }

    renderLoading() {
        return (
            <p>Loading...</p>
        )
    }

    renderRow(row) {
        return (
            <div>
                <h3>{row.title}</h3>
                <p>{row.description}</p>
            </div>
        )
    }
}

// which props do we want to inject, given the global store state?
function mapStateTopProps(state) {
    return {
        rowsById: topicsSelectors.getTopicsByUrl(state),
        rowsIdArray: topicsSelectors.getTopicsUrlArray(state)
    }
}

export default connect(mapStateTopProps)(TopicsScreen)