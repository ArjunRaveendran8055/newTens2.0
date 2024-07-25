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

  let students = [];
  io.on("connection", (socket) => {
    console.log("Connection established", socket.id);
    //giving client initial student ids immidiately after connection
    const studentIds = students.map((obj) => obj.studentId);
    io.emit("initial_students", { studentIds });

    //fetch list of students initially for client
    socket.on("fetchstudents", async (data) => {
      console.log("receiving fetchStudent request...");
      try {
        const pipeLine=[
          {
            $match:{
              student_status:false
            }
          },
          {
            $sort:{
              createdAt:-1
            }
          }

        ]
        const students = await RegisteredStudentModel.aggregate(pipeLine)
        // console.log(students)
        if (students.length === 0) {
          return io.emit("no_pending_students", {
            msg: "No Students for In Pending list",
          });
        }
        return io.emit("students_list", { students });
      } catch (error) {
        return io.emit("fetch_student_error", { msg: err.message });
      }
    });

    //socket for emiting selected student info for other users
    socket.on("student_selected", (student) => {
      const match = students.some((obj) => obj.socketId === socket.id);
      console.log("if match ",match)
      const objInd = students.findIndex((obj) => obj.socketId === socket.id);
      if (!match) {
        students.push({
          studentId: student.studentId,
          socketId: socket.id,
        });
        const studentIds = students.map((obj) => obj.studentId);
        console.log("student id array is", studentIds);
        io.emit("student_ids", { studentIds });
      }
      else {
        console.log("dum");
        console.log("index of existing user is",objInd)
        if (objInd !== -1) {
          students[objInd].studentId = student.studentId;
          const studentIds = students.map((obj) => obj.studentId);
          console.log("id array is", studentIds);
          io.emit("student_ids", { studentIds });
        }
      }
      console.log(students);
    });

    //on socket connection discontinued
    socket.on("disconnect", () => {
      const updatedIds = students.filter(
        (obj) => obj.socketId !== socket.id
      );
      students = [...updatedIds];
      const studentIds = students.map((obj) => obj.studentId);
      console.log("ind array on disconnection", studentIds);
      io.emit("student_ids", { studentIds });
      console.log("Disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;
