sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, History, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("inventorymanagementui.inventorymanagementui.controller.addProducts", {

		/*
		 * Every time your view is initialized, you get the call in this method.
		 * We setup our Data Models.
		 */
		onInit: function () {
			this.setupUserInputProductInfoModel();
			this.setupInputFormValidationModel();
		},

		/**
		 * Setup the data model to store user's input.
		 * We defined default values for Supplier and Availability which are drop down UI elements.
		 */
		setupUserInputProductInfoModel: function () {
			this.getView().setModel(new JSONModel(), "newProductModel");
			this.getView().getModel("newProductModel").setProperty("/supplier", "PartsAreUs");
			this.getView().getModel("newProductModel").setProperty("/available", "true");
		},

		/**
		 * Setup the data model to validate user's input.
		 * We determine if the input entered by the user is valid (Correct Data type, not null, not an empty string etc.)
		 * By default all the values are set to null as there is no user input.
		 */
		setupInputFormValidationModel: function () {
			this.getView().setModel(new JSONModel(), "inputFormValidationModel");
			this.getView().getModel("inputFormValidationModel").setProperty("/isPriceValid", false);
			this.getView().getModel("inputFormValidationModel").setProperty("/isDescriptionValid", false);
			this.getView().getModel("inputFormValidationModel").setProperty("/isPriceValid", false);
			this.getView().getModel("inputFormValidationModel").setProperty("/isQuantityValid", false);
		},

		/**
		 * Clears the data from the model.
		 * @param  {} modelName - Name of the model
		 */
		resetDataModels: function () {
			this.setupUserInputProductInfoModel();
			this.setupInputFormValidationModel();
		},

		/**
		 * Validates the user's input
		 * @param  {} userInput - Input entered by the user
		 */
		isStringInvalid: function (userInput) {
			if (userInput === undefined) {
				return true;
			}

			userInput = userInput.trim();
			if (userInput === "") {
				return true;
			}

			return false;
		},

		/**
		 * Determines if the number passed is an integer or not (It can be a float too)
		 * @param  {} number - Number passed
		 */
		isNumberInteger: function(number) {
			return number % 1 === 0;
		},

		/**
		 * We enable the Save button only if all the values entered by user are valid
		 * @param  {} isNameValid - Is the name entered by user valid
		 * @param  {} isDescriptionValid - Is the description entered by user valid
		 * @param  {} isPriceValid - Is the price entered by user valid
		 * @param  {} isQuantityValid - Is the quantity entered by user valid
		 */
		formatSaveButtonEnablement: function(isNameValid, isDescriptionValid, isPriceValid, isQuantityValid) {
			if (isNameValid === undefined || isDescriptionValid === undefined || isPriceValid === undefined || isQuantityValid === undefined) {
				//If any one input is undefined or empty we do not enable the Save button
				return false;
			}
			return isNameValid && isDescriptionValid && isPriceValid && isQuantityValid;
		},

		/**
		 * Event handler for Save button press.
		 * Validates and sends the product details entered by the user to the backed, which are to be added to the DB
		 * @param  {} evt
		 */
		onSaveButtonPress: function (evt) {
			var controller = this;

			var product_name = this.getView().getModel("newProductModel").getData().name;
			var product_description = this.getView().getModel("newProductModel").getData().description;
			var product_supplier = this.getView().getModel("newProductModel").getData().supplier;
			var product_price = this.getView().getModel("newProductModel").getData().price;
			var product_availability = this.getView().getModel("newProductModel").getData().available;
			var product_quantity = this.getView().getModel("newProductModel").getData().quantity;

			// Validates each input entered by the user
			if (this.isStringInvalid(product_name) || this.isStringInvalid(product_description) || this.isStringInvalid(product_supplier) ||
				this.isStringInvalid(
					product_price) || this.isStringInvalid(product_availability) || this.isStringInvalid(product_quantity)) {
				MessageBox.error("The values you've entered are invalid. Please try again");
				return;
			}

			// Convert the JSON data into a string which will be sent to the backend
			var productDetails = JSON.stringify(this.getView().getModel("newProductModel").getData());

			var url = "/inventorymanagementbackend/dbtask/insertValues";

			jQuery.ajax({
				url: url, // Add product URL
				type: "PUT", // Request Type - PUT
				headers: {
					'x-csrf-token': sap.ui.getCore().AppContext.token // CSRF token
				},
				data: productDetails, // Details of the product entered by the user
				contentType: "application/json", // The format of the data sent
				success: function (result) {
					// API call was successful
					controller.resetDataModels();
					MessageToast.show("Product added to the catalog"); // Toast message to show that the product has been addedd to the DB
				},
				error: function (e) {
					// API call failed
					controller.resetDataModels();
					MessageBox.error("Sorry, an unknown error occurred. This could be a problem with your network connection or database. Please check and try again"); // Error message to show that there was some issue in adding the product to the DB
				}
			});

		},

		/**
		 * Each keystroke in the name input field fires a callback to this method
		 * We determine if the current value in the field is valid or not
		 * Accordingly, we set the state of the field (Error or Normal)
		 * @param  {} oEvent
		 */
		onNameChange: function(oEvent) {
			var nameInputField = oEvent.getSource();
			var currentInputValue = nameInputField.getValue();
			var nameLength = currentInputValue.length;
			if (nameLength > 255) {
				nameInputField.setValueState("Error");
				nameInputField.setValueStateText("Product name must be less than 256 characters");
			}
			var isNameInvalid = this.isStringInvalid(currentInputValue);
			if (isNameInvalid) {
				nameInputField.setValueState("Error");
				nameInputField.setValueStateText("Field is mandatory; you must enter a value");
				this.getView().getModel("inputFormValidationModel").setProperty("/isNameValid", false);
			}
			if (nameLength <= 255 && !isNameInvalid) {
				nameInputField.setValueState("None");
				this.getView().getModel("inputFormValidationModel").setProperty("/isNameValid", true);
			}
		},

		/**
		 * Each keystroke in the description input field fires a callback to this method
		 * We determine if the current value in the field is valid or not
		 * Accordingly, we set the state of the field (Error or Normal)
		 * @param  {} oEvent
		 */
		onDescriptionChange: function(oEvent) {
			var descriptionInputField = oEvent.getSource();
			var currentInputValue = descriptionInputField.getValue();
			var isDescriptionInvalid = this.isStringInvalid(currentInputValue);
			if (isDescriptionInvalid) {
				descriptionInputField.setValueState("Error");
				descriptionInputField.setValueStateText("Field is mandatory; you must enter a value");
				this.getView().getModel("inputFormValidationModel").setProperty("/isDescriptionValid", false);
			} else {
				descriptionInputField.setValueState("None");
				this.getView().getModel("inputFormValidationModel").setProperty("/isDescriptionValid", true);
			}
		},

		/**
		 * Each keystroke in the price input field fires a callback to this method
		 * We determine if the current value in the field is valid or not
		 * Accordingly, we set the state of the field (Error or Normal)
		 * @param  {} oEvent
		 */
		onPriceChange: function(oEvent) {
			var priceInputField = oEvent.getSource();
			var currentInputValue = priceInputField.getValue();
			var isPriceInvalidString = this.isStringInvalid(currentInputValue);
			if (isPriceInvalidString) {
				priceInputField.setValueState("Error");
				priceInputField.setValueStateText("Field is mandatory; you must enter a value");
				this.getView().getModel("inputFormValidationModel").setProperty("/isPriceValid", false);
			} else {
				priceInputField.setValueState("None");
				this.getView().getModel("inputFormValidationModel").setProperty("/isPriceValid", true);
			}
		},

		/**
		 * Each keystroke in the quantity input field fires a callback to this method
		 * We determine if the current value in the field is valid or not
		 * Accordingly, we set the state of the field (Error or Normal)
		 * @param  {} oEvent
		 */
		onQuantityChange: function(oEvent) {
			var qtyInputField = oEvent.getSource();
			var qtyInputValue = qtyInputField.getValue();
			var qtyNumber = parseFloat(qtyInputValue);
			var isQtyInvalidString = this.isStringInvalid(qtyInputValue);
			if (isQtyInvalidString) {
				qtyInputField.setValueState("Error");
				qtyInputField.setValueStateText("Field is mandatory; you must enter a value");
				this.getView().getModel("inputFormValidationModel").setProperty("/isPriceValid", false);
			} else {
				qtyInputField.setValueState("None");
				this.getView().getModel("inputFormValidationModel").setProperty("/isPriceValid", true);
			}
			var isQtyInt = this.isNumberInteger(qtyNumber);
			if (!isQtyInt) {
				qtyInputField.setValueState("Error");
				qtyInputField.setValueStateText(" Quantity must be a whole number");
				this.getView().getModel("inputFormValidationModel").setProperty("/isQuantityValid", false);
			} else {
				qtyInputField.setValueState("None");
				this.getView().getModel("inputFormValidationModel").setProperty("/isQuantityValid", true);
			}
		},

		/**
		 * Event handler for back button press
		 */
		onBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("products");
			}
		}
	});

});