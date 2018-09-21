sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("inventorymanagementui.inventorymanagementui.controller.home", {
		model: new JSONModel(),

		// Navigation panel tabs
		data: {
			navigation: [{
				title: 'Home',
				key: 'root1',
				icon: 'sap-icon://home'
			}, {
				title: 'Products',
				key: 'root2',
				icon: 'sap-icon://product'
			}]
		},

		/*
		 * Every time your view is initialized, you get the call in this method.
		 * We setup our Data Models.
		 */
		onInit: function () {
			this.model.setData(this.data);
			this.getView().setModel(this.model);
		},

		/**
		 * Every time you select a tab in the sidebar navigation panel, the callback comes to this method
		 * @param  {} oEvent
		 */
		onItemSelect: function (oEvent) {
			var item = oEvent.getParameter('item');
			switch (item.getKey()) {
			case "root1":
				this.getRouter().navTo("landingHome");
				break;
			case "root2":
				this.getRouter().navTo("products");
				break;
			default:
				//Show error page or home
				break;
			}
		},

		/**
		 * Every time you select the sidebar navigation panel button, it either expands to minimizes the sidebar
		 */
		onSideNavButtonPress: function () {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();

			this.setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		/**
		 * Perform the action of expansion or minimizing based on the current view
		 * @param  {} bLarge
		 */
		setToggleButtonTooltip: function (bLarge) {
			var toggleButton = this.getView().byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
		},

		/**
		 * Get the app router
		 */
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
	});
});