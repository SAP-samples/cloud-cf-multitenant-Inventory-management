<!--
SPDX-FileCopyrightText: 2020 Andrew Lunde <andrew.lunde@sap.com>

SPDX-License-Identifier: Apache-2.0
-->
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/cloud-sfsf-benefits-ext)](https://api.reuse.software/info/github.com/SAP-samples/cloud-sfsf-benefits-ext)

# Developing a SaaS Multitenant Business Application on SAP Cloud Platform in the Cloud Foundry Environment

## Warning

This code sample is deprecated in favor of a CAP based example. See [cloud-cap-multitenancy](https://github.com/SAP-samples/cloud-cap-multitenancy).

## Description

This repository contains a sample reference application for developing and deploying a SaaS (software-as-a-service) multitenant business application on SAP Cloud Platform, Cloud Foundry environment.
Follow the instructions below to deploy the application on SAP Cloud Platform in a subaccount that is configured for the Cloud Foundry environment.

This branch has code that uses PSQL as the back-end DB. For HANA DB please click [here](https://github.com/SAP/cloud-cf-multitenant-Inventory-management/tree/node-hana).

## Requirements

* [Cloud Foundry command line interface (CF CLI) tools](https://github.com/cloudfoundry/cli)
* [A subaccount on SAP Cloud Platform running in the Cloud Foundry environment](https://cloudplatform.sap.com/enterprise-paas/cloudfoundry.html)
* [Access to SAP Web IDE Full-Stack](https://www.sap.com/developer/tutorials/webide-innovation-beta.html)

## Download and Installation

To install the app, you must clone the code from this [Github](https://github.com/SAP/cloud-cf-multitenant-Inventory-management) repository and deploy the application on your SAP Cloud Platform subaccount, running on the Cloud Foundry environment.

For complete setup instructions, see the [Download and Installation](./Download_and_Installation_Instructions.md) instructions.

## Known Issues
There are no known issues with this sample application. If you encounter any issues, please reach out to us through the details highlighted in the 'How to Obtain Support' section below.

## How to Obtain Support
The purpose of this application is to illustrate the multitenancy capabilities of SAP Cloud Platform running on the Cloud Foundry environment. Thus, it is provided as-is with no official lines of support.

## To-Do (upcoming changes)

As a part of our future development, we plan to add functionality to the application that is based on the role of the logged-in user.

## License

Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the Apache Software License, version 2.0, except as noted otherwise in the [LICENSE file](./LICENSES/Apache-2.0.txt)
