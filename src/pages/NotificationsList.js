import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateNotification extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/notifications/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteNotification extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the notification ${this.props.id} permanently?`,
            )
        ) {
            api.deleteNotificationById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class NotificationsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        // Actually Here You Can Use Fetch Api To Get The Notifications PLEASE REFER Ajax.Html
        // xhttp.open("GET", "https://test.venngroup.in/wp-json/wp/v2/notification", true);

        await api.getAllNotifications().then(notifications => {
            this.setState({
                notifications: notifications.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { notifications, isLoading } = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteNotification id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateNotification id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!notifications.length) {
            showTable = false
        }
/*
ACTUALLY HERE WE HAVE TO RETURN THE MARQEE ELEMENTS (SCROLLING). Use the container styles given n the Ajax.html to Achieve the same.
*/
        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={notifications}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default NotificationsList
