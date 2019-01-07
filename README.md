# Developing a SaaS Multitenant Business Application on SAP Cloud Platform in the Cloud Foundry Environment

## Description

This repository contains a sample reference application for developing and deploying a SaaS (software-as-a-service) multitenant business application on SAP Cloud Platform, Cloud Foundry environment.
Follow the instructions below to deploy the application on SAP Cloud Platform in a subaccount that is configured for the Cloud Foundry environment.

## Requirements

* [Cloud Foundry command line interface (CF CLI) tools](https://github.com/cloudfoundry/cli)
* [A subaccount on SAP Cloud Platform running in the Cloud Foundry environment](https://cloudplatform.sap.com/enterprise-paas/cloudfoundry.html)
* [Access to SAP Web IDE Full-Stack](https://www.sap.com/developer/tutorials/webide-innovation-beta.html)

This application internally uses the following libraries. Thus, you must either use the SAP Web IDE, which internally takes care of resolving the dependencies, to run this application or resolve the dependencies.

| Library        | Version           | License  |
| ------------- |-------------| -----|
|[Cookie-Parser](https://www.npmjs.com/package/cookie-parser)|1.4.3|MIT License|
|[Debug](https://www.npmjs.com/package/debug)|2.6.9|MIT License|
|[Express](https://www.npmjs.com/package/express)|4.16.0|MIT License|
|[Http-errors](https://www.npmjs.com/package/http-errors)|1.6.2|MIT License|
|[Jade](https://www.npmjs.com/package/jade)|1.11.0|MIT License|
|[Morgan](https://www.npmjs.com/package/morgan)|1.9.1|MIT License|
|[Passport](https://www.npmjs.com/package/passport)|0.4.0|MIT License © 2011-2015 Jared Hanson|
|[UUID](https://www.npmjs.com/package/uuid)|3.3.2|MIT License|
|@sap/hdi-deploy|3.7.0|SAP DEVELOPER LICENSE AGREEMENT|
|@sap/xssec|2.1.15|SAP DEVELOPER LICENSE AGREEMENT|
|@sap/xsenv|1.2.9|SAP DEVELOPER LICENSE AGREEMENT|
|@sap/hdbext|4.7.5|SAP DEVELOPER LICENSE AGREEMENT|
|@sap/hana-client|2.3.123|SAP DEVELOPER LICENSE AGREEMENT|
|@sap/approuter|3.0.1|SAP DEVELOPER LICENSE AGREEMENT|

Please note that the aforementioned libraries are not provided as a part of the sample code and that the third party licensors of these components may provide additional license rights terms and conditions and/or require certain notices

## Download and Installation

To install the app, you must clone the code from this [Github](https://github.com/SAP/cloud-cf-multitenant-Inventory-management) repository and deploy the application on your SAP Cloud Platform subaccount, running on the Cloud Foundry environment.

## Known Issues
There are no known issues with this sample application. If you encounter any issues, please reach out to us through the details highlighted in the 'How to Obtain Support' section below.

## How to Obtain Support
The purpose of this application is to illustrate the multitenancy capabilities of SAP Cloud Platform running on the Cloud Foundry environment. Thus, it is provided as-is with no official lines of support.

However, if you run into any problems with the installation or would like additional information, please drop us an e-mail:
* R, Hariprasauth  - hariprasauth.r@sap.com
* TDS, Sandeep - sandeep.tds@sap.com

## To-Do (upcoming changes)

As a part of our future development, we plan to add functionality to the application that is based on the role of the logged-in user.

## License

Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.

This file is licensed under the SAP Sample Code License, except as noted otherwise in the [LICENSE file](./LICENSE.txt)
