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
	var tenantAppURL = "https:\/\/" + consumerSubdomain + "-" + "<Your app-router app URL without the protocol>";
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
	var tenantId = req.authInfo.identityZone;
	console.log("***!!!***\n");
	console.log("\Tenant Id\n" + tenantId + "\n\n**!!**");
	dbInterface.selectMyProducts(tenantId, function (result, error) {
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
	var availability = (req.body.available === 'true');
	var quantity = parseInt(req.body.quantity);
	var tenantId = req.authInfo.identityZone;
	res.send(dbInterface.insertValues(name, description, supplier, price, availability, quantity, tenantId, function (result, error) {
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

// //Uncomment the following code to manage your Database.
// /* DB Task 3: Delete your databse table
// */
router.get('/dbtask/dropTable', function (req, res) {
	res.send(dbInterface.dropTable());
});

// /* DB Task 4: Select all products inside a table (without the Tenant Id clause)
// */
// router.get('/dbtask/selectAllProducts', function (req, res) {
// 	dbInterface.selectAllProducts(function (result, error) {
// 		if (error) {
// 			res.send(error);
// 		}
// 		res.send(result);
// 	});
// });

// /* DB Task 5: Delete an entry from your DB table for the given product Id
// */
// router.put('/dbtask/deleteWithProductId', function (req, res) {
// 	var productId = req.body.productId;
// 	res.send(dbInterface.deleteValues(productId));
// });

//------------------------------------------------------------------------------------------------------------


module.exports = router;