sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("DropDown.controller.View1", {
		onInit: function() {
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z00_APP12_SRV/", true);
			this.getView().setModel(oModel);
			/*		var vizFrame = this.getView().byId("idcolumn");
					vizFrame.setModel(oModel);

					var oDataset = new sap.viz.ui5.data.FlattenedDataset({
						dimensions: [{
							axis: 1,
							name: 'title 1',
							value: '{stbeg}'
						}],
						measures: [{
							name: 'title 2',
							value: "{stend}"
						}],
						data: {
							path: "/stbegSet"// "/ZRGP_120NSet?$filter=calmonth eq '201501'and stbeg eq '010002' and stend eq '862201'"
								/*		parameters: {
											select: 'ProductID,Category/CategoryName',
											expand: 'Category'
										}
						}
					});

					vizFrame.setDataset(oDataset);*/

		},
		onPress: function(oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("DropDown.view.Diagram", this);
				this.getView().addDependent(this._oDialog);
				this._oDialog.open();
			} else{
				this._oDialog.open();
			}
			
		},
		closeDialog: function(oEvent){
				this._oDialog.close();
			}
	});
});