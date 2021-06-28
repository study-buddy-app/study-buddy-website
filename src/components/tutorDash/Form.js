import {Component} from "react"

class Form extends Component {
    constructor() {
      super()
      this.state = {
        // 3 pieces of state to track the 3 input fields.
        startTime: "",
        endTime: "",
        month: "",
        day: "",
      }
    }
    // 4 hadler function one for each state
    handleStartTime = (value) => {
        this.setState({ startTime: value })
      }
    
      handleEndTime = (value) => {
        this.setState({ endTime: value })
      }
    
      handleMonth = (value) => {
        this.setState({ month: value })
      }
      handleDay= (value) => {
        this.setState({ day: value })
      }
      handleAdd = () => {
        this.props.addTime(
          this.state.startTime,
          this.state.endTime,
          this.state.month,
          this.state.day
        )
        this.setState({
            startTime: 0,
            endTime: 0,
            month: "",
            day: "",
        })
      }

      render () {
        return (
            <div className = "form">
              <input
                value={this.state.startTime}
                onChange={(e) => this.handleStartTime(e.target.value)}
                placeholder='start time'
              />
              <input
                value={this.state.endTime}
                onChange={(e) => this.handleEndTime(e.target.value)}
                placeholder="end time"
              />
              <input
                value={this.state.month}
                onChange={(e) => this.handleMonth(e.target.value)}
                placeholder="month"
              />
              <input
                value={this.state.day}
                onChange={(e) => this.handleDay(e.target.value)}
                placeholder="day"
              />
              <button className = "add"
                onClick={this.handleAdd}
              >
                add
                </button>
            </div>
            )
      }
      }



      export default Form