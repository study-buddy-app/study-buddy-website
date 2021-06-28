let time = [
    {
        id:0,
        startTime:2,
        endTime:11,
        // totalTime:`${this.endTime -  this.startTime} hours`,
        month:'5',
        day:'4'
    },
    {
        id:0,
        startTime:4,
        endTime:10,
        // totalTime:`${this.endTime -  this.startTime} hours`,
        month:'5',
        day:'4'
    }
]
let id = 2;

module.exports = {
    getTime: (req, res) => {
        res.status(200).send(time);
      },
    //   catchTime: (req,res) => {
    //       const {ttime} =req.body;

    //       ttime.id = id;
    //       id++;

    //   time.push(ttime);
    //   res.status(200).send(time);
    //   },

      addTime: (req, res) => {
          console.log(req.body)
        const {startTime, endTime, month, day } = req.body;
        const newtime = {
          id: id,
          startTime: startTime,
          endTime: endTime,
          month:month,
          day:day,
        }
        time.push(newtime);
        id++
        res.status(200).send(time);
      },

      deleteTime: (req, res) => {
        const {id} = req.params
        const index = time.findIndex((e) => {
            return e.id === +id
          })
          if(index === -1){
            return res.status(500).send("please enter value")
          }
            time.splice(index,1);
            res.status(200).send(time);
        },
  
      editTime: (req,res) => {
        const {id} = req.params
            const {startTime, endTime, month, day} = req.body

            const index = time.findIndex((e) => {
                return e.id === +id
              })
            
              time[index].startTime = startTime
              time[index].endTime = endTime
              time[index].month =month
              time[index].day = day
              res.status(200).send(time)
            }
          }