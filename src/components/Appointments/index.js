// Write your code here
import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointList: [], title: '', date: '', isFilter: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppoint = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formatDate = date ? format(new Date(date), 'dd MMMM yyyy,EEEE') : ''
    const newAppoint = {
      id: uuidv4(),
      title,
      date: formatDate,
      isFavStar: false,
    }
    this.setState(pre => ({
      appointList: [...pre.appointList, newAppoint],
      title: '',
      date: '',
    }))
  }

  onToggleStar = id => {
    this.setState(pre => ({
      appointList: pre.appointList.map(each => {
        if (id === each.id) {
          return {...each, isFavStar: !each.isFavStar}
        }
        return each
      }),
    }))
  }

  getFilteredList = () => {
    const {appointList, isFilter} = this.state
    if (isFilter) {
      return appointList.filter(each => each.isFavStar === true)
    }
    return appointList
  }

  onClickStar = () => {
    const {isFilter} = this.state
    this.setState({isFilter: !isFilter})
  }

  render() {
    const {title, date, isFilter} = this.state
    const filterClass = isFilter ? 'filter' : ''
    const filteredAppointList = this.getFilteredList()
    return (
      <div className="bg">
        <div className="bg-container">
          <div className="main-container">
            <div className="row-container">
              <div className="row-1">
                <h1 className="heading">Add Appointment</h1>
                <form className="form" onSubmit={this.onAddAppoint}>
                  <label htmlFor="title" className="title">
                    TITLE
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input"
                    id="title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                  <label htmlFor="date" className="date">
                    DATE
                  </label>
                  <input
                    type="date"
                    className="input"
                    id="date"
                    value={date}
                    onChange={this.onChangeDate}
                  />
                  <button type="submit" className="button">
                    Add
                  </button>
                </form>
              </div>
              <div className="row-2">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                  className="img"
                />
              </div>
            </div>
            <hr className="hr" />
            <div className="items-bg-1">
              <h1 className="h2">Appointments</h1>
              <button
                className={`${filterClass} btn`}
                type="button"
                onClick={this.onClickStar}
              >
                starred
              </button>
            </div>
            <ul className="ul">
              {filteredAppointList.map(each => (
                <AppointmentItem
                  key={each.id}
                  newAppointment={each}
                  onToggleStar={this.onToggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
