// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {newAppointment, onToggleStar} = props
  const {id, title, date, isFavStar} = newAppointment

  const onChangeStar = () => {
    onToggleStar(id)
  }

  const imgUrl = isFavStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list">
      <div className="bg-1">
        <div className="row">
          <p className="h1">{title}</p>
          <button
            type="button"
            onClick={onChangeStar}
            className="bt"
            testid="star"
          >
            <img src={imgUrl} className="img1" alt="star" />
          </button>
        </div>
        <p className="date2">Date:{date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
