sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",   
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";

         var urlObject = library.URLHelper;

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () { // onInit equivale a INITIALIZATION no sap
                let produto = {};
                let productModel = new JSONModel(produto);
                let view = this.getView();
                view.setModel(productModel, "ModeloProduto");
               
                // this no javascript = ME-> no ABAP

            },

            onClickImage: function(oEvent){
                urlObject.redirect(oEvent.getSource().getSrc(), true );
            },
            onPressBuscar: function(){
                let input;
                input = this.byId("inpBusca");
                let valor = input.getValue();
                //alert(valor);

                let parameters = {
                    url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method : "GET",
                    async : true,
                    crossDomain : true
                };
                // promisse = quando uma função retorna como parametro de exportação 
                // outra função
                $.ajax(parameters).done(function(response){
                  
                   let oProdutoModel = this.getView().getModel("ModeloProduto");

                //clear
                    oProdutoModel.setData({});
                    oProdutoModel.refresh();
                    oProdutoModel.setData(response);
                    oProdutoModel.refresh();

                }.bind(this) ) //sucesso

                .fail(function(){
                    
                }.bind(this) ); // exception            
           }  

        });
    });
