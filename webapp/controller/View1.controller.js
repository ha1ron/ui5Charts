sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("DropDown.controller.View1", {
		onInit: function() {
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z00_APP12_SRV/", true);
			this.getView().setModel(oModel);

			//			var myModel = this.getOwnerComponent().getModel();
			//			myModel.setSizeLimit(10000);
			var input = this.getView().byId("inputEndStation");
			input.setFilterFunction(function(sTerm, oItem) {
				if (sTerm.length > 2) {
					return oItem.getText().match(new RegExp(sTerm, "i"));
				}
			});
		},

		handleSuggest: function(oEvent) {
			var sTerm = oEvent.getParameter("suggestValue");
			var aFilters = [];
			if (sTerm) {
				aFilters.push(new sap.ui.model.Filter("st_spr", sap.ui.model.FilterOperator.Contains, sTerm));
				aFilters.push(new sap.ui.model.Filter("Txtlg", sap.ui.model.FilterOperator.Contains, sTerm));
			}
			oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
		},

		onPress: function(oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("DropDown.view.Diagram", this);
				this.getView().addDependent(this._oDialog);
				this._oDialog.open();
			} else {
				this._oDialog.open();
			}

		},
		closeDialog: function(oEvent) {
			this._oDialog.close();
		},
		onPressPDF: function(oEvent) {
			//Step 1: Export chart content to svg
			var oVizFrame = this.getView().byId("DueDateGridFrame");
			var sSVG = oVizFrame.exportToSVGString({
				width: 1500,
				height: 1500
			});

			sSVG = sSVG.replace(/translate /gm, "translate");
			

			//Step 2: Create Canvas html Element to add SVG content
			var oCanvasHTML = document.createElement("canvas");
			canvg(oCanvasHTML, sSVG); // add SVG content to Canvas

			// STEP 3: Get dataURL for content in Canvas as PNG/JPEG
			var sImageData = oCanvasHTML.toDataURL("image/png");

			// STEP 4: Create PDF using library jsPDF
			var oPDF = new jsPDF();
			//oPDF.addImage(sImageData, "PNG", 15, 40, 180, 160);
			oPDF.addImage(sImageData, "PNG", 60, 20, 100, 100, "alias");
			oPDF.save("test.pdf");

		},
		
		press: function(oEvent){
			var mChart = this.getView().byId("mChart");
			mChart.setPercentage(2.4);
			
		}
	});
});