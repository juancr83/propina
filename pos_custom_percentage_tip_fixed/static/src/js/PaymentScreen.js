console.log("productssssssssssssssssssssssssssssssssssssssssss")
odoo.define('pos_custom_percentage_tip_fixed.tips', function (require) {
    'use strict';

    var models = require('point_of_sale.models');
    var screens = require('point_of_sale.screens');

    screens.PaymentScreenWidget.include({
        Tips: 25,
        CustomTipButton: function(){
            console.log("hola mundo")
        },
        renderElement: function() {
            let self = this;
            let ret = this._super();
            this.$('.js_custom_tip_boton').click(function(){
                self.customTipBoton(self);
            });
            return ret
        },
        show: function() {
            let ret = this._super();
            // let currentOrder = this.pos.get_order();
            // const tip = currentOrder.get_tip();
            // this.addTip();
            let tip = this.pos.get_order().get_tip();
            if (tip != 0.0){
                this.$('.js_custom_tip_boton').addClass("highlight")
            }else{
                this.$('#valor_propina').text("");
                this.$('.js_custom_tip_boton').removeClass("highlight") 
            }
            return ret
        },
        currentOrder: function() {
            return this.pos.get_order();
        },
        customTipBoton: function(self) {
            let currentOrder = this.pos.get_order();
            this.addTip();
            const tip = currentOrder.get_tip();
            self.Tips = tip
            if (this.$('.js_custom_tip_boton').hasClass("highlight")) {
                this.$('#valor_propina').text("");
                this.$('.js_custom_tip_boton').removeClass("highlight") 
                this.removeTip();
            }else {
                this.$('#valor_propina').text("("+tip+")");
                this.$('.js_custom_tip_boton').addClass("highlight")
            }
        },
        removeTip() {
            var tip_product = this.pos.db.get_product_by_id(this.pos.config.tip_product_id[0]);
            let currentOrder = this.pos.get_order();
            var lines = currentOrder.get_orderlines();
            if (!tip_product) {
                return;
            } else {
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].get_product() === tip_product) {
                        currentOrder.remove_orderline(lines[i]);
                    }
                }
                return 0;
            }
        },
        addTip: function() {
            // click_tip
            let currentOrder = this.pos.get_order();
            const tip = currentOrder.get_tip();
            const change = currentOrder.get_change();
            let value = tip === 0 && change > 0 ? change : tip;
            currentOrder.calcular_tip();

            // if(this.env.pos.config.desactivar_vista_propina == false) {
            //     const { confirmed, payload } = await this.showPopup('NumberPopup', {
            //         title: tip ? this.env._t('Change Tip') : this.env._t('Add Tip'),
            //         startingValue: value,
            //         isInputSelected: true,
            //     });
    
            //     if (confirmed) {
            //         this.currentOrder.set_tip(parse.float(payload));
            //     }
            // }
            // if(this.env.pos.config.desactivar_vista_propina == true){
            //     this.currentOrder.calcular_tip();
            // }
            
        }
    });
   
});