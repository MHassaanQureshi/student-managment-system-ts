#! /usr/bin/env node

import inquirer from "inquirer";

// Define the student type
interface Student {
  name: string;
  stdid: string;
  courses: string[];
  balance: number;
}

// Initialize the student object
const student: Student = {
  name: "",
  stdid: "",
  courses: [],
  balance: 0,
};

// Define the courses and their fees
const Course: { [key: string]: number } = {
  MSoffice: 2000,
  Python: 4000,
  Graphicdesign: 10000,
};

// Function to prompt for student name and generate student ID
async function getStudentName() {
  let name = await inquirer.prompt([
    {
      type: "input",
      name: "stdName",
      message: "Enter Student Name",
    },
  ]);

  if (name.stdName === "") {
    console.log("Invalid Name");
    return false;
  } else {
    student.name = name.stdName;
    let studid = Math.floor(Math.random() * 90000) + 10000;
    student.stdid = studid.toString();
    return true;
  }
}

// Function to handle course enrollment
async function Enroll() {
  let enrollCourse = await inquirer.prompt([
    {
      type: "list",
      name: "CourseE",
      choices: ["MSoffice", "Python", "Graphicdesign"],
      message: "Select Course you want to enroll:",
    },
  ]);

  const courseName = enrollCourse.CourseE;
  const courseFee = Course[courseName];

  console.log(`The fees of ${courseName} is ${courseFee}`);
  console.log(`Your Current Balance is ${student.balance}`);

  let enrollChoice = await inquirer.prompt([
    {
      type: "list",
      name: "enrollAns",
      choices: ["Yes", "No"],
      message: "Would you like to enroll in this course:",
    },
  ]);

  if (enrollChoice.enrollAns === "Yes") {
    let paymentMethod = await inquirer.prompt([
      {
        type: "list",
        name: "payMthd",
        choices: ["Bank Transfer", "JazzCash", "EasyPaisa"],
        message: "Please select your payment method",
      },
    ]);

    let paymentType = await inquirer.prompt([
      {
        type: "input",
        name: "payment",
        message: "Enter Amount:",
      },
    ]);

    let paymentAmount = parseFloat(paymentType.payment);
    if (paymentAmount < courseFee) {
      console.log("Insufficient payment. Enrollment failed.");
    } else {
      student.balance += paymentAmount - courseFee;
      student.courses.push(courseName);
      console.log(`You have successfully enrolled in ${courseName}.`);
      console.log(`Your New Balance is ${student.balance}`);
    }
  } else {
    console.log("Enrollment cancelled.");
  }
}

// Main function to handle the entire flow
async function main() {
  let nameValid = await getStudentName();
  if (!nameValid) {
    return;
  }

  await Enroll();

  while (true) {
    let again = await inquirer.prompt([
      {
        name: "againenroll",
        type: "list",
        choices: ["Yes", "No"],
        message: "Do you like to enroll in more courses:",
      },
    ]);

    if (again.againenroll === "Yes") {
      await Enroll();
    } else {
      console.log("Enrollment End");
      
      console.log(`Final Balance: ${student.balance}`);
      break;
    }
  }
  let status = await inquirer.prompt([
    {
      name:"status",
      type:"list",
      message:"Do you want to watch the status of the student",
      choices: ["Yes", "No"],
    }
  ])
  if(status.status == "Yes"){
    console.log(student);
  }else{
    console.log("Enrollment ended")
  }
  
}

main();
