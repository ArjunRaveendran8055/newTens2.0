const { Server } = require("socket.io");
const { RegisteredStudentModel } = require("../models/RegisteredStudentModel");
const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  let indices=[]

  io.on("connection", (socket) => {
    console.log("Connection established",socket.id);
    const indAr=indices.map(obj=> obj.index)
    io.emit("initialindex",{indAr})
    socket.on("fetchstudents",async (data)=>{
      console.log("receiving fetchStudent request...");
      try {
        const students= await RegisteredStudentModel.find({student_status:false})
        // console.log(students)
        if(students.length===0){
          return io.emit("no_pending_students",{msg:"No Students for In Pending list"})
        }
        return io.emit("students_list",{students})
      } catch (error) {
          return io.emit("fetch_student_error",{msg:err.message})
      }
    })

    //socket for emiting selected student info for other users
    socket.on("student_selected",(student)=>{
      console.log(student.index)
      const match=indices.some(obj=>obj.id===student.id)
      const objInd=indices.findIndex(obj=>obj.id===student.id)
      if(!match){
        indices.push({id:student.id,index:student.index,socketId:socket.id})
        const indAr=indices.map(obj=> obj.index)
        console.log("ind array is",indAr);      
        io.emit("student_indices",{indAr})
      }
      else{
        console.log("dum")
        if(objInd !==-1){
          indices[objInd].index=student.index
          const indAr=indices.map(obj=> obj.index)
          console.log("ind array is",indAr);
          io.emit("student_indices",{indAr})
        }
      }

      console.log(indices)
    })

    //on socket connection discontinued
    socket.on("disconnect", () => {
      const updatedIndices = indices.filter(obj => obj.socketId !== socket.id);
      indices=[...updatedIndices]
      const indAr=updatedIndices.map(obj=> obj.index)
      console.log(updatedIndices);
      console.log("ind array is",indAr);
      io.emit("student_indices",{indAr})
      
      console.log("Disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;
