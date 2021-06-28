// The functionality that we have here is:
// We display the time log information, 
// we have a button to delete a an entry,
// and we have a button that puts us in edit mode.
import {Component} from 'react'

class Display extends Component {
    constructor() {
      super()
      this.state = {

      editMode: false,
      startTime: "",   
      endTime: "",
      month: "",
      day: ""
   
    }
     
      }
    
    handleStartTime = (value) => {
        this.setState({ startTime: value })
      }
    handleEndTime = (value) => {
        this.setState({ endTime: value })
      }
    handleMonth = (value) => {
        this.setState({ month: value })
      }
    handleDay = (value) => {
        this.setState({ day: value })
      }
    
      toggleEdit = () => {
        this.setState({ editMode: !this.state.editMode })
      }
      handleSave = () => {
          const {startTime, endTime, month, day} = this.state
        this.props.editTime(this.props.id, startTime, endTime, month, day)
       
        this.toggleEdit()
        this.setState({startTime: ''})
        this.setState({endTime: ''})
        this.setState({month: ''})
        this.setState({day: ''})
      }
    
      render() {
        return this.state.editMode ? (
            <div className="newtime">
              <input
                value={this.state.startTime}
                onChange={(e) => this.handleStartTime(e.target.value)}
              />
               <input
                value={this.state.endTime}
                onChange={(e) => this.handleEndTime(e.target.value)}
              />
                <input
                value={this.state.month}
                onChange={(e) => this.handleMonth(e.target.value)}
              />
               <input
                value={this.state.day}
                onChange={(e) => this.handleDay(e.target.value)}
              />
              <button className = "save" onClick={this.handleSave}>Save</button>
            </div>
      ) : (
        <div className="time">
        
          <h3 className = "result1"> Start Time: {this.props.startTime}</h3>
          <h3 className = "result2">End Time : {this.props.endTime}</h3>
          <h3 className = "result3">Total Time : {this.props.endTime - this.props.startTime }</h3>
          <h3 className = "result4">Date : {this.props.month}/{this.props.day}</h3>
        
  
          <button className = "delete"
          onClick={() => this.props.deleteTime(this.props.id)}>
            delete 
          </button>

          <button className = "edit"
          onClick={this.toggleEdit}>edit</button>
        </div>
      )
    }
}
        


export default Display