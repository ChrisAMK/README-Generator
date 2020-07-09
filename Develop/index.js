const inquirer = require("inquirer");
const fs = require("fs");
const questions = [
    {
        type: "input",
        message: "What is the name of your Project?",
        name: "title"
    },
    {
        type: "input",
        message: "Enter a Descriptioon for your Project",
        name: "description"
    },
    {
        type: "input",
        message: "What are the installation Instructions for this Project?",
        name: "installation"
    },
    {
        type: "input",
        message: "How is your Project intended to be used?",
        name: "usage"
    },
    {
        type: "list",
        message: "Choose a license for the Project: ",
        name: "license",
        choices: ["Academic Free License v3.0", "Apache license 2.0", "Mozilla Public License 2.0", "Creative Commons license family", "Boost Software License 1.0", "Eclipse Public License 1.0", "European Union Public License 1.1", "GNU General Public License family", "GNU General Public License v2.0", "GNU General Public License v3.0", "None"]
    },
    {
        type: "input",
        message: "Who has contributed to this Project? if any, please link their GitHub",
        name: "contribute"
    },
    {
        type: "input",
        message: "Write test scenerios and examples of how to use your Application",
        name: "tests"
    }
];

// Asks the User for the Project info!
inquirer.prompt(questions).then(function(response) {
    const {title, description, installation, usage, license, contribute, tests} = response;
    console.log(title)
    console.log(description)
    console.log(installation)
    console.log(usage)
    console.log(license)
    console.log(contribute)
    console.log(tests)
})



















// array of questions for user


// // function to write README file
// function writeToFile(fileName, data) {
// }

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();
