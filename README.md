# California Health and Human Services Agency - Accenture ADPQ Vendor Pool Prototype - Technical Approach

##Prototype
http://calhhs.client-code.com/

##Team
> a. One accountable leader

We established a Delivery Lead, Michael Green, at the outset. Michael acted as Product Owner, prioritizing work, providing input, and holding sole accountability to leadership for all aspects of the prototype.

> b. Multidisciplinary and collaborative team 

We assembled a multidisciplinary and collaborative team that included the following roles: 
 1. Delivery Lead - Michael Green 
 2. Product Manager - Z. Henry-Frazer
 3. Technical Architect - Craig Mertens
 4. Interaction Designer/User Researcher/Usability Test - David Hindman
 5. Visual Designer - Essi Salonen
 6. Front End Web Developer - Matthew McCloskey
 7. Backend Web Developer - Daniel Haab
 8. DevOps Engineer - Jeffery Miles
 9. Scrum Master - Zane Sadler

## Design Process

> c. Understand people’s needs

In order to ensure the design was tailored specifically to user needs, we enlisted experienced people to provide input. Lisa, a former caseworker, and Janay, a former foster child and caseworker offered invaluable insight into the needs of biological parents with children in foster care. We received feedback from a biological parent as well, Venny, who gave us detailed feedback from the end user perspective.

We relied on Lisa, Janay, and Venny for input on the initial design concept as well as for user testing.

> d. “Human-centered design” techniques or tools

We used the following three techniques, in addition to others described in our supplementary documentation.
Research Interviews: One-on-one sessions with users were a fundamental component of our human-centered design process. By engaging with former caseworkers, foster children, and parents we conceived of and designed a digital portal, focusing on the most important outcomes.

User Survey: To get an understanding of parent (end user) needs, and to balance qualitative with quantitative feedback, we conducted an online survey with parents in our community. With 28 respondents, we observed emerging trends about what is important for families. 
Concept Validation: With an overall concept of the service in mind, we presented high-level sketches and drawings to users. We solicited feedback early and often, spotting necessary changes soon and pivoting quickly in response. Concept validation helped make the design process efficient, iterative and accurate.

> e. Design style guide 

Style guides were used to facilitate consistency in look and feel, as well as to streamline handoffs between design and development. To maximize efficiency, we kept the style guide lean and functional, and subsequent improvements were made in rapid and close dialog between team members. Our style guides were consistent with other standard style guides such as the USDS Federal style guide. 

> f. Usability tests

We conducted user testing with Janay and Venny to validate that the completed designs were usable and understandable.

## Development Process
> g. Iterative development

We began the project by defining the request and receiving an overview from the product owner. We established the cadence, roles, and responsibilities of this agile development effort. We implemented 1 week sprints to divide the output into finite iterations while providing enough time to make meaningful progress during each iteration. 

After establishing the initial user stories, the team focused on implementing the technical infrastructure to support them, while also engaging in user research to further refine and prioritize those stories. This process involved capturing feedback across multiple iterations from users, the product owner, and project team as the stories moved from sketches to wireframes to visual designs. 

Technical development followed a similar cycle with elements of the complete application being deployed for review, testing and feedback as soon as they were available.  Usability testing and development happened in parallel as the team moved forward towards an MVP release. Feedback that couldn’t be supported for a release was captured in the backlog for consideration in subsequent iterations. 

## Technology
> h. Responsive design

Our front end code is fully responsive and tested across multiple browsers and device sizes, as well as to support accessibility needs (such as CC 11135).

> i. / q. Open licensed technologies

* Front End
    * React.js
* API Server
    * NodeJS
    * Loopback
    * MySQL
    * Mocha/Chai
* Infrastructure
    * Jenkins
    * Vagrant
    * Docker
    * Sensu

## Environment
> j. Infrastructure provider

Deployed on AWS, using EC2 for the app and Sensu servers and an RDS MySQL instance as a durable repository.

> k. Automated unit tests 

Unit tests were used to validate key functionality.

> l. Continuous integration

Dockerfiles used to reliably set up containerized server environment for continuous deployment. Deployments are automatically kicked off by Jenkins, pulled from the latest develop branch, built into a container and deployed.

> m. Configuration management

Vagrant- and Dockerfiles used to configure development and deployment images.

> n. Continuous monitoring

AWS CloudWatch and Sensu monitoring was set up to monitor server and application availability and performance. 

> o. Container deployment

Application deployed to a Docker container as part of CI deployment.

##More information
For more details and artifacts related to our process, see: https://github.com/Accenture-CHHS-Team/CHHS-RFI-Web/blob/master/Supplemental_Process_Documentation_0609.pdf

To see how we followed the USDS Playbook to build our service, see: https://github.com/Accenture-CHHS-Team/CHHS-RFI-Web/blob/master/USDS%20Playbook%20Matrix.xlsx


## Setup
> p. Instructions

* [Install Node.js version 5 & npm](https://nodejs.org/)
* Install Ruby `$ apt-get install ruby` (on Ubuntu)
* Install git `$ apt-get install git` (on Ubuntu)
* Clone repository `$ git clone https://github.com/Accenture-CHHS-Team/CHHS-RFI-Web.git`
* Sign up for a [Socrata API key](https://dev.socrata.com/)
* Sign up for a [Texas A&M Geocoding (TAMU) API key](http://geoservices.tamu.edu/Services/Geocode/WebService/)

* CLIENT SOURCE:
* Install Bower `$ npm install -g bower`
* Install Gulp `$ npm install -g gulp`
* Install Sass `$ gem install sass`
* From Project Directory (CHHS-RFI-Web/client-src):
	* Run `$ npm install`
	* Run `$ bower install`
        * To serve only the client code and watch for changes:
                * Run `$ gulp serve-dev`
        * To build the client code to the server directory:
                * Run `gulp build`

* SERVER SOURCE:
* [Install Strongloop](https://strongloop.com/) `$ npm install -g strongloop`
* [Install Mocha](https://mochajs.org/) `$ npm install -g mocha`
* From Project Directory (CHHS-RFI-Web/server-src):
        * Add the Socrata and TAMU keys to ./server/datasources.json
        * Run `$ npm install`
        * To run the server in the background:
                * Run `$ node . &` to start the server
                * Run `mocha` to run unit tests