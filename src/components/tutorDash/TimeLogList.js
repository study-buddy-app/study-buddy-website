import {Component} from 'react'
import axios from 'axios'
import Form from './Form'
import Display from './Display'


class TimeLogList extends Component{
    constructor(){
      super()
      this.state = {
          timeArray : []
      }
    }
    componentDidMount(){
        axios.get('/api/time')
        .then((res) => {
        this.setState({timeArray:res.data})
        })
    .catch((err) => {
        console.log(err)
    })
    }

    deleteTime = (id) => {
        axios.delete(`/api/time/${id}`)
        .then((res) => {
            this.setState({timeArray: res.data})
    })
    .catch((err) => {
        console.log(err)
      })
    }
    addTime =(startTime, endTime, month, day) => {
        axios.post('/api/time', {startTime,endTime, month, day})
        .then((res) => {
            this.setState({timeArray: res.data})
        })
        .catch((err) => {
            console.log(err)
          })
        }
    
    editTime = (id, startTime, endTime, month, day) => {
        axios.put(`/api/time/${id}`, {startTime,endTime, month, day})
        .then((res) => {
            this.setState({timeArray: res.data})
        })
        .catch((err) => {
            console.log(err)
          })
        }
    

       render(){
           console.log(this.state)
           let totalTime = 0
           this.state.timeArray.forEach( element => { 
             totalTime += (element.endTime - element.startTime)
           }) 
        return(
    
            <div className ="timelog">
              <div>
                 <Form addTime={this.addTime} />
                 <h4>TOTAL: {totalTime}</h4>
              </div>  
                <div className = "display">
                {this.state.timeArray.map((time) => {
                  return(
                    <Display 
                    id={time.id}
                    startTime={time.startTime} 
                    endTime={time.endTime}
                    month={time.month}
                    day={time.day}
                    deleteTime={this.deleteTime}
                    editTime={this.editTime}
                 
                     />
                  )
                })}
                </div>
              </div>
            )
       }
    }


    
    export default TimeLogList