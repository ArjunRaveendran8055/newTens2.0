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

  io.on("connection", (socket) => {
    console.log("Connection established");

    socket.on("fetchstudents",async (data)=>{
      console.log("receiving fetchStudent request...");
      try {
        const students= await RegisteredStudentModel.find({student_status:false})
        console.log(students)
        if(students.length===0){
          return io.emit("no_pending_students",{msg:"No Students for In Pending list"})
        }
        return io.emit("students_list",{students})
      } catch (error) {
          return io.emit("fetch_student_error",{msg:err.message})
      }
    })

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;
