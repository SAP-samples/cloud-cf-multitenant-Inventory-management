//Using the express framework
var express = require('express');
//Using the router library in the express framework
var router = express.Router();

//Using a Database Interface file which has all the DB specific code
var dbInterface = require('../dbConnector/dbInterface');

//------------------------------------------------------------------------------------------------------------
//

/* This route is just to test that your app is running.
** There is no other value added by this route.
*/
router.get('/', function (req, res) {
	res.status(200).json("Hello from the backend");
});


//------------------------------------------------------------------------------------------------------------
// Multi-Tenant Configuration Callbacks

/* Callback - 1: On subscribing to the application, the method constructs and returns the app url for the subscriber.
*/
router.put('/callback/v1.0/tenants/*', function (req, res) {
	var consumerSubdomain = req.body.subscribedSubdomain;
	var tenantAppURL = "https:\/\/" + consumerSubdomain + "-" + "<Your back-end app URL without the protocol>";
	res.status(200).send(tenantAppURL);
});

/* Callback - 2: On unsubscribing to the application, the method deletes the subscription.
*/
router.delete('/callback/v1.0/tenants/*', function (req, res) {
	res.status(200);
});

//------------------------------------------------------------------------------------------------------------
//Database task routes

/* DB Task 1: Select all products for the current tenant
*/
router.get('/dbtask/selectMyProducts', function (req, res) {

	console.log("\n*** Select Products API Endpoint***");
	var tenantId = req.authInfo.identityZone;
	console.log("\Tenant Id\n" + tenantId + "\n\n**!!**");
	dbInterface.selectMyProducts(req, tenantId, function (result, error) {
		if (error) {
			res.send(error);
		}
		res.send(result);
	});
});

/* DB Task 2: Insert a product into the table for the current tenant
*  We pass the parameters in the body of our URL call
*/
router.put('/dbtask/insertValues', function (req, res) {
	var name = req.body.name;
	var description = req.body.description;
	var supplier = req.body.supplier;
	var price = parseFloat(req.body.price);
	var availability = "No";
	if (req.body.available === 'true'){
		availability = "Yes";
	}
	var quantity = parseInt(req.body.quantity);
	var tenantId = req.authInfo.identityZone;
	return(dbInterface.insertValues(req, name, description, supplier, price, availability, quantity, tenantId, function (result, error) {
		if (error) {
			res.send(400, "Error! Could not insert values");
		}
		if (result === 'success') {
			res.send(200, "Values inserted");
		} else {
			res.send(400, "Error! Could not insert values");
		}
	}));
});

/* DB Task 4: Select all products inside a table (without the Tenant Id clause)
*/
router.get('/dbtask/selectAllProducts', function (req, res) {
	return dbInterface.selectAllProducts(req, function (result, error) {
		if (error) {
			res.send(error);
		}
		res.send(result);
	});
});

//------------------------------------------------------------------------------------------------------------


module.exports = router;