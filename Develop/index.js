const inquirer = require("inquirer");
const fs = require("fs");
// const axios = require("axios");
// const { title } = require("process");

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
        choices: ["Academic Free License v3.0", "Apache license 2.0", "Mozilla Public License 2.0", "Boost Software License 1.0", "Eclipse Public License 1.0", "European Union Public License 1.1", "GNU General Public  v2.0", "GNU General Public License v3.0", "None"]
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
    },
    {
        type: "input",
        message: "Please enter your Github Profile name: ",
        name: "github"
    },
    {
        type: "input",
        message: "Please enter your Email Address",
        name: "email"
    }
];

// Asks the User for the Project info!
inquirer.prompt(questions).then(function(response) {
    const {title, description, installation, usage, license, contribute, tests, github, email} = response;
    console.log(title)
    console.log(description)
    console.log(installation)
    console.log(usage)
    console.log(license)
    console.log(contribute)
    console.log(tests)
    generateFileText(title, description, installation, usage, license, contribute, tests, github, email)
})


function getLicenseBadge(license) {
    license = license.split(" ").join("%20");
    const licenseBadge = createBadge(license);
    return licenseBadge
}

function createBadge(title) {
    return "(https://img.shields.io/badge/" + title + "-blue)"
}

function getLicenseLink(license) {
    let licenseLink = ""
    if (license === "Academic Free License v3.0") {
        licenseLink = "https://opensource.org/licenses/AFL-3.0";
    } else if (license === "Apache license 2.0") {
        licenseLink = "https://www.apache.org/licenses/LICENSE-2.0.html";
    } else if (license === "Mozilla Public License 2.0") {
        licenseLink = "https://www.mozilla.org/en-US/MPL/2.0/";
    } else if (license === "Boost Software License 1.0") {
        licenseLink = "http://zone.ni.com/reference/en-XX/help/373194E-01/cdaq-foss/boost-license-v-1-0/";
    } else if (license === "Eclipse Public License 1.0") {
        licenseLink = "https://opensource.org/licenses/EPL-1.0";
    } else if (license === "European Union Public License 1.1") {
        licenseLink = "https://spdx.org/licenses/EUPL-1.1.html";
    } else if (license === "GNU General Public  v2.0") {
        licenseLink = "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html";
    } else if (license === "GNU General Public License v3.0") {
        licenseLink = "https://www.gnu.org/licenses/gpl-3.0.en.html";
    } else {
        licenseLink = "None"
    }

    return licenseLink;
}

function generateFile(fileText) {
    fs.writeFile("README.md", fileText, function(err) {
        if (err) {
            return console.log(err)
        }
    })
}

function generateFileText(title, description, installation, usage, license, contribute, tests, github, email) {
    
    let fileText = "";

    title.trim();
    description.trim();
    installation.trim();
    usage.trim();
    license.trim();
    contribute.trim();
    tests.trim();
    github.trim();
    email.trim();

    let licenseBadge;
    let licenseLink;
    if (license !== "None") {
        licenseBadge = getLicenseBadge(license);
        licenseLink = getLicenseLink(license);
        //console.log(licenseBadge)
        //console.log(licenseLink)
    
    }
    
    // Adding the title and Badge
    if (title !== "" && license !== "None") {
        fileText += '# $' + title + "&middot;" + licenseBadge + "\r\r\n";
    } else if (title != "") {
        fileText += title + "\r\r\n";
    } 

    // Adding Description etc for each!
    if (description != "") {
        fileText += "## Description \r\n";
        fileText += "```\n" + description + "\r\r\n```\n";
    }

    fileText += "## Table of Contents \r\n";
    fileText += "```\n* Installation\n* Usage\n* License\n* Contributions\n* Tests\r\r\n```\n"

    if (installation != "") {
        fileText += "## Installation \r\n";
        fileText += installation + "\r\r\n";
    }

    
    if (usage != "") {
        fileText += "## Usage \r\n"
        fileText += usage + "\r\r\n"
    }

    
    if (license != "") {
        fileText += "## License \r\n"
        fileText += license + "\r\r\n"
    }

    
    if (contribute != "") {
        fileText += "## Contributions \r\n"
        fileText += contribute + "\r\r\n"
    }

    
    if (tests != "") {
        fileText += "## Tests and Examples \r\n"
        fileText += tests + "\r\r\n"
    }

    if (github != "" && email != "") {
        fileText += "## Questions \r\n"
        fileText += "If there are any questions feel free to reach me at https://github.com/" + github + " or E-mail me at " + email

    }



    generateFile(fileText)

}
















// array of questions for user


// // function to write README file
// function writeToFile(fileName, data) {
// }

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();
