# California Health and Human Services Agency - Accenture ADPQ Vendor Pool Prototype - Technical Approach

##Team
> Assigned one leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted

We established a Delivery Lead, Michael Green, at the outset. Michael acted as Product Owner, defining what success would look like for the project, and then providing feedback, input and oversight at every stage.

> Assembled a multidisciplinary and collaborative team that includes, at a minimum, five of the labor categories as identified in Attachment C - ADPQ Vendor Pool Labor Category Descriptions

We assembled a multidisciplinary and collaborative team that included the following roles: 
 1. Delivery Lead - Michael Green 
 2. Product Manager - Z. Henry-Frazer
 3. Technical Architect - Craig Mertens
 4. Interaction Designer/User Researcher/Usability Test - David Hindman
 5. Visual Designer - Essi Salonen
 6. Front End Web Developer - Matthew McCloskey
 7. Backend Web Developer - Daniel Haab
 8. DevOps Engineer - Jeffery Miles
 9. Usability Tester/Agile Coach - Zane Sadler

## Design Process
> Understood what people needed (see Note #1), by including people in the prototype development and design process

In order to ensure the design was tailored specifically to user needs, we enlisted two subject matter experts to help with the prioritization of features, functionality, and overall look and feel. Lisa, a former caseworker, and Janay, a former foster child and caseworker offered invaluable insight into the needs of biological parents with children in foster care. 

We relied on Lisa and Janay for input on the intial design concept as well as for user testing. We received feedback from a parent as well, who gave us detailed feedback from the end user perspective.  


> Used at least three “human-centered design” techniques or tools

Research Interviews: One-on-one sessions with subject matter experts were a fundamental component of our human-centered design process. By engaging with former caseworkers, foster children, and parents we conceived of and designed a digital portal that focused on the most important outcomes.  

User Survey: To get an understanding of parent (end user) needs and to balance qualitative with quantitative feedback, we conducted an online survey with parents in the Accenture/Fjord community. With 28 respondents, we observed emerging trends about what is important for families. For a more robust project, we would target a larger audience and tailor the questions to parents that are going through trauma and transition. 

Concept Validation: With an overall concept of the service in mind, we presented high-level sketches and drawings to subject experts. We solicited feedback early and often with this process, spotting necessary changes soon and pivoting quickly in response. Concept validation was a key tool for ensuring the design process was efficient, iterative and accurate. 

> Created or used a design style guide and/or a pattern library

Style guides were used to define the overall look and feel for the product as well as to streamline the initial handoff between design and development. To maximize efficiency, we created minimal documentation and communicated early and often with developers. We kept the style guide lean and functional, and subsequent improvements were made in rapid and close dialog between team members. 

> Performed usability tests with people

We gathered feedback from people using two methods: concept validation and user testing. Concept validation sessions ensured that the design direction addressed user needs whereas user testing sessions validated that the completed designs were usable and unserstandable.

## Development Process
> Used an iterative approach, where feedback informed subsequent work or versions of the prototype

We began the project by defining the request and receiving an over view from the product owner. The team immediately collaborated to define an initial set of functionality which they felt met the goals of the effort and could be completed in the allocated time. We also established the cadence, roles and responsibilities of this specific agile development effort. We decided to implement 1 week sprints that would allow us to divide the output into finite deliverables while still provide enough time to make meaningful progress during each iteration. After establishing the initial user stories, the team focused on implementing the technical infrastructure needed to support them while also engaging in user research to further refine and prioritize those stories. This process involved capturing feedback across multiple iterations from users, the product owner and project team as the stories moved from sketches to wireframes and then visual designs. Technical development followed a similar cycle with elements of the complete application being deployed for review, testing and feedback as soon as they were available with usability testing and development happening in parallel as the team moved forward towards an MVP release. Feedback that couldn’t’ be supported for that initial release was captured in the backlog for consideration in subsequent iterations. 

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
