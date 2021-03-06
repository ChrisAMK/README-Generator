const inquirer = require("inquirer");
const fs = require("fs");
// Array of object questions to be asked
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
    generateFileText(title, description, installation, usage, license, contribute, tests, github, email);
})

// This function gets the license, takes out the spaces and puts in %20 for web readability
// Then Triggers the makeBadge function for the appropriate license
function getLicenseBadge(license) {
    license = license.split(" ").join("%20");
    const licenseBadge = makeBadge("license", license);
    return licenseBadge;
}

// This function makes the basic Link and puts it into the Sheilds.io URL
function makeBadge(type, title) {
    return `![${type}](https://img.shields.io/badge/${type}-${title}-blue)`;
}

// This function detects where to get the License link from
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
        licenseLink = "None";
    }

    return licenseLink;
}

// This function takes in the fileText variable that is built up with If statements, then writes to a README.md file.
function generateFile(fileText) {
    fs.writeFile("GeneratedREADME/README.md", fileText, function(err) {
        if (err) {
            return console.log(err);
        }
    });
}

// This function takes in the user values and writes to a variable called FileText, then is put into the generate file Function above
function generateFileText(title, description, installation, usage, license, contribute, tests, github, email, licenseLink) {
    
    let fileText = "";
    var missingValues = false;

    // Trimming any spare space entered by user
    title.trim();
    description.trim();
    installation.trim();
    usage.trim();
    license.trim();
    contribute.trim();
    tests.trim();
    github.trim();
    email.trim();

    // Important Error Handling
    if (title === "" || description === "" || github === "" || email === "") {
        console.log("Missing Vital Information: Title, Description, Github and Email are Mandatory");
        missingValues = true;
    }

    // let licenseBadge;
    if (license !== "None") {
        licenseBadge = getLicenseBadge(license);
        licenseLink = getLicenseLink(license);
    }
    
    // Adding the title and Badge
    if (title !== "" && license !== "None") {
        fileText += '# ' + title + "&middot; " + licenseBadge + " ![Maker's Mark](https://img.shields.io/github/repo-size/ChrisAMK/README-Generator?style=plastic)\r\r\n";
    } else if (title != "") {
        fileText += title + "\r\r\n";
    } 

    // Adding Description etc for each!
    if (description != "") {
        fileText += "## Description \r\n";
        fileText += description + "\r\r\n";
    }

    /// This is the table of contents, it is static since the user cannot change the questions asked
    fileText += "## Table of Contents \r\n";
    fileText += "* [Installation](#Installation)\n* [Usage](#Usage)\n* [License](#License)\n* [Contributions](#Contributions)\n* [Tests and Examples](#Tests)\n* [Questions](#Questions)\r\r\n";

    if (installation != "") {
        fileText += "## Installation <a name='Installation'></a> \r\n";
        fileText += installation + "\r\r\n";
    }

    
    if (usage != "") {
        fileText += "## Usage <a name='Usage'></a> \r\n";
        fileText += usage + "\r\r\n";
    }

    
    if (license != "") {
        fileText += "## License <a name='License'></a> \r\n";
        fileText += license + "\r\r\n";
        fileText += "[Click Here to go to License Site!]("+ licenseLink + ")\r\r\n";
    }
    
    if (contribute != "") {
        fileText += "## Contributions <a name='Contributions'></a> \r\n";
        fileText += "```\n" + contribute + "\r\r\n```\n";
    }

    if (tests != "") {
        fileText += "## Tests and Examples <a name='Tests'></a> \r\n";
        fileText += tests + "\r\r\n";
    }

    if (github != "" && email != "") {
        fileText += "## Questions <a name='Questions'></a> \r\n";
        fileText += "If there are any questions feel free to reach me at [Github](https://github.com/" + github + ")\r\r\n" ;
        fileText += "or E-mail me at " + email + "\r\r\n";
    }

    if (missingValues == true) {
        fileText = "## Important information was Left out \r\r\n\ Please include a Title, Description, Email and Github account as Minimum \r\n Please Try Again";
    }

    // Executes the generateFile Function with the text built in
    generateFile(fileText);

}