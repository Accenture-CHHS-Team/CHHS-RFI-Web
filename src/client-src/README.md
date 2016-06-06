# California Health and Human Services Agency - Accenture ADPQ Vendor Pool Prototype - Technical Approach

##Team
> Assigned one leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted

< 25 words

> Assembled a multidisciplinary and collaborative team that includes, at a minimum, five of the labor categories as identified in Attachment C - ADPQ Vendor Pool Labor Category Descriptions

< 100 words

## Design Process
> Understood what people needed (see Note #1), by including people in the prototype development and design process

< In order to ensure the design was tailored specifically to user needs, we enlisted two subject matter experts to help with the prioritization of features, functionality, and overall look and feel. Lisa, a former caseworker, and Janay, a former foster child and caseworker were able to offer invaluable insight into the needs of biological parents with children in foster care. 

We relied on Lisa and Janay for early design sketches and concept validation, as well as detailed user testing. We received feedback from a parent as well, who gave us detailed feedback from the end user perspective.  


> Used at least three “human-centered design” techniques or tools

< Research Interviews: One-on-one sessions with subject matter experts were a fundamental component of our user-centered design process. By engaging with former caseworkers, foster children, and parents we able to conceive of and design a digital portal that focuses specifically on the most important outcomes.  

User Survey: To get an understanding of parents (end user needs), and to balance qualitative with quantitative feedback, we conducted an online survey with internal parents in the Accenture/Fjord community. With 28 respondents, we were able to spot emerging trends about what is important for families that are going through trauma and transition. For a more robust project, we would target a larger audience and attempt to tailor to the specific user base. 

Concept Validation: With an overall concept of the service in mind, we brought high-level sketches and drawings in front of SMEs and users. We were able to solicit feedback early and often with this process, spotting necessary changes soon and pivoting quickly in response. Concept validation is a key tool for ensuring the design process is efficient and accurate. 


> Created or used a design style guide and/or a pattern library

< Style guides were used to streamline the initial handoff between design and development. To maximize efficiency, we created minimal documentation and communicated early and often with developers. We kept style guides lean and functional, and subsequent improvements were made in rapid and close dialog between team members. 

> Performed usability tests with people

< We gathered feedback from people in two different ways: concept validation and user testing. Concept validation sessions ensured that the design direction was accurate, whereas user testing sessions validated that completed designs were usable and understandable. 

## Development Process
> Used an iterative approach, where feedback informed subsequent work or versions of the prototype

< 200 words

## Technology
> Created a prototype that works on multiple devices, and presents a responsive design

< 25 words

> Used at least five modern (see Note #2) and open-source technologies, regardless of architectural layer (frontend, backend, etc.)

< 100 words

> Prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge

< 25 words

## Environment
> Deployed the prototype on an Infrastructure as a Service (Iaas) or Platform as Service (Paas) provider, and indicated which provider they used.

< 25 words

> Developed automated unit tests for their code

< 25 words

> Setup or used a continuous integration system to automate the running of tests and continuously deployed their code to their IaaS or PaaS provider.

< 25 words

> Setup or used configuration management

< 25 words

> Setup or used continuous monitoring
 
< 25 words

> Deployed their software in a container (i.e., utilized operating-system-level virtualization)

< 25 words

## Setup
> Provided sufficient documentation to install and run their prototype on another machine

* [Install Node.js & npm](https://nodejs.org/)
* Install Bower `$ npm install -g bower`
* Install Gulp `$ npm install -g gulp`
* From Project Directory
	* Run `$ npm install`
	* Run `$ bower install`

## Local Dev Environment
* Build project to "dist" folder: `$ gulp`
* Build project, serve at localhost:8000, and watch for changes: `$ gulp serve-dev`
