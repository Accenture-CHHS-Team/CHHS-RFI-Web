# California Health and Human Services Agency - Accenture ADPQ Vendor Pool Prototype - Technical Approach

##Team
> Assigned one leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted

< 25 words

> Assembled a multidisciplinary and collaborative team that includes, at a minimum, five of the labor categories as identified in Attachment C - ADPQ Vendor Pool Labor Category Descriptions

< 100 words

## Design Process
> Understood what people needed (see Note #1), by including people in the prototype development and design process

< 100 words

> Used at least three “human-centered design” techniques or tools

< 200 words

> Created or used a design style guide and/or a pattern library

< 25 words

> Performed usability tests with people

< 25 words

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
