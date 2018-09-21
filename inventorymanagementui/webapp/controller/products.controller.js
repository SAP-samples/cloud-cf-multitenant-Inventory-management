sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("inventorymanagementui.inventorymanagementui.controller.products", {

		/*
		 * Every time your view is initialized, you get the call in this method.
		 * We setup our Data Model
		 * We setup the eventHandler for routematcher
		 */
		onInit: function () {
			var productList = new JSONModel();
			this.getView().setModel(productList, "products");

			this.getProductsList();

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("products").attachMatched(this.onRouteMatched, this);
		},

		/**
		 * Fetches the list of products for the current tenant
		 * Sets the products data to the products model
		 */
		getProductsList: function () {

			var controller = this;
			var url = '/inventorymanagementbackend/dbtask/selectMyProducts';

			controller.getView().setBusy(true); // Starts a loading animation

			jQuery
				.ajax({
					url: url, // Get tenant specific products url
					type: "GET", // Request type - Get
					dataType: "json", // Return datatype
					headers: {
						'x-csrf-token': 'fetch' // Fetch CSRF token header
					},
					complete: function (xhr) {
						sap.ui.getCore().AppContext.token = xhr.getResponseHeader("x-csrf-token"); // Set the CSRF token to a global context
					},
					success: function (response) {
						// API call was successful
						var data = {
							"productList": response
						};
						console.log(response);
						controller.getView().getModel("products").setData(data); // Set the response data to the products model (Which is used by the UI)
						controller.getView().setBusy(false); // Stops the loading animation
					},
					error: function (e) {
						// API call failed
						console.log(e.message);
						controller.getView().setBusy(false); // Stops the loading animation
					}
				});

		},

		/**
		 * We store the availability option in the DB as a boolean (true/false)
		 * In the UI, we format the data and show a more meaningful text
		 * @param  {} isProductAvailable
		 */
		formatAvailabilityOption: function (isProductAvailable) {
			if (isProductAvailable == true) {
				return "Available";
			} else {
				return "Not Available";
			}
		},

		/**
		 * Route match handler
		 * Updates the product details model.
		 */
		onRouteMatched: function () {
			this.getProductsList();
		},

		/**
		 * Event handler for Add a product button press.
		 * Navigates us to the Add product view
		 */
		onAddProductButtonPress: function () {
			this.getOwnerComponent().getRouter().navTo("addProduct");
		}
	});

});