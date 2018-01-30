
var https = require('https')
var moment = require('moment')
const PORT = process.env.PORT || 5050

var server = https.createServer()

server.on('request',(req,res)=>{
    
  //cut off the initial "/" of the get request
  var dateReq = req.url.slice(1)
  
  //reinserting white space after the get request converts it to %20
  var dateToParse = dateReq.replace(/%20/g,' ')


  var parsedDate = moment(dateToParse,["X",'MMMM D, YYYY'])   
  
  var displayDate = new Object()

  if(parsedDate.isValid()){
     displayDate.unix = +parsedDate.format("X")
     displayDate.natural = parsedDate.format("MMMM D, YYYY") 
  }
  else{
    displayDate.unix = null
    displayDate.natural = null 
  }
//    res.end(dateToParse)
  res.end(JSON.stringify(displayDate))
})

  

server.listen(PORT)
