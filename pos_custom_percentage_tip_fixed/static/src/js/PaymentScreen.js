console.log("productssssssssssssssssssssssssssssssssssssssssss")
odoo.define('pos_custom_percentage_tip_fixed.tips', function (require) {
    'use strict';

    var models = require('point_of_sale.models');
    var screens = require('point_of_sale.screens');

    screens.PaymentScreenWidget.include({
        Tips: 25,
        CustomTipButton:async function(){
            console.log("hola mundo")
        },
    });
   
});