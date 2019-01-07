var uuidv4 = require('uuid/v4');

var hdbInsertValues = function (req, PRODUCT_NAME, PRODUCT_DESC, PRODUCT_SUPPLIER, PRODUCT_PRICE, PRODUCT_AVAILABILITY, PRODUCT_QUANTITY, TENANT_ID,
	callback) {

	console.log('Insert query method invoked');

	var PRODUCT_ID = uuidv4();

	var insertValuesIntoProductsTableQuery = 'INSERT INTO \"PRODUCTS\" VALUES ( \'' + PRODUCT_ID + '\' , \'' + PRODUCT_NAME + '\' , \'' +
		PRODUCT_DESC + '\' , \'' + PRODUCT_SUPPLIER + '\' , \'' + PRODUCT_PRICE + '\' , \'' + PRODUCT_AVAILABILITY + '\' , \'' +
		PRODUCT_QUANTITY + '\' , \'' + TENANT_ID + '\' )';

	var hdb_client = req.db;

	console.log('Select query prepared : ' + insertValuesIntoProductsTableQuery + ' DB: ' + req.db);

	return hdb_client.exec(insertValuesIntoProductsTableQuery, function (error) {
		if (error) {
			console.log("Error - could not execute create table query: " + error);
			callback('failure');
		}
		callback('success');
	});
};

var hdbSelectAllProducts = function (req, callback) {

	var selectAllProductsQuery = 'SELECT * FROM \"PRODUCTS\"';

	var hdb_client = req.db;

	console.log('Executing Query : ' + selectAllProductsQuery);

	return hdb_client.exec(selectAllProductsQuery, function (error, result) {
		if (error) {
			console.log("Error - could not execute create table query: " + error);
			callback('failure');
		}
		callback(result);
	});
};

var hdbSelectTenantProducts = function (req, tenantId, callback) {

	console.log('Select query method invoked');

	var selectAllProductsQuery = 'SELECT * FROM \"PRODUCTS\" WHERE \"TENANT_ID\" = \'' + tenantId + '\'';

	var hdb_client = req.db;

	console.log('Select query prepared : ' + selectAllProductsQuery + ' DB: ' + req.db);

	return hdb_client.exec(selectAllProductsQuery, function (error, result) {
		if (error) {
			var errorMessage = "Error - could not execute create table query: " + error;
			console.log(errorMessage);
			callback(errorMessage);
		}
		callback(result);
	});
};


module.exports = {
	insertValues: hdbInsertValues,
	selectMyProducts: hdbSelectTenantProducts,
	selectAllProducts: hdbSelectAllProducts
};