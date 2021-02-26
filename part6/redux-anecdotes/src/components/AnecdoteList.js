import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (id, content) => {
      console.log('vote', id)
      props.addVote(id)
      props.setNotification('You voted \'' + content + '\'', 5)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    addVote,
    setNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AnecdoteList)
export default ConnectedAnecdotes