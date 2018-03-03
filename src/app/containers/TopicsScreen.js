import React, { Component } from 'react'
import { connect } from 'react-redux'
import './TopicsScreen.css'
import * as topicsActions from '../reducers/topics/actions'
import * as topicsSelectors from '../reducers/topics/reducer'
import ListView from '../components/ListView'
import ListRow from '../components/ListRow'

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
                    renderRow={this.renderRow.bind(this)}/>
                {!this.props.canFinalizeSelection ? false :
                    <button className="NextScreen" onClick={this.onNextScreenClick.bind(this)} />
                }
            </div>
        )
    }

    renderLoading() {
        return (
            <p>Loading topics...</p>
        )
    }

    renderRow(rowId, row) {
        const selected = this.props.selectedIdsMap[rowId]
        return (
            <ListRow
                rowId={rowId}
                onClick={this.onRowClick.bind(this)}
                selected={selected}>
                <h3>{row.title}</h3>
                <p>{row.description}</p>
            </ListRow>
        )
    }

    onRowClick(rowId) {
        this.props.dispatch(topicsActions.selectTopic(rowId))
    }

    onNextScreenClick() {
        this.props.dispatch(topicsActions.finalizeTopicSelection())
    }
}

// which props do we want to inject, given the global store state?
function mapStateTopProps(state) {
    return {
        rowsById: topicsSelectors.getTopicsByUrl(state),
        rowsIdArray: topicsSelectors.getTopicsUrlArray(state),
        selectedIdsMap: topicsSelectors.getSelectedTopicUrlsMap(state),
        canFinalizeSelection: topicsSelectors.isTopicSelectionValid(state)
    }
}

export default connect(mapStateTopProps)(TopicsScreen)