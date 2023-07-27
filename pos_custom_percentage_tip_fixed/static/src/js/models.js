odoo.define('pos_custom_percentage_tip_fixed', function(require) {
    "use strict";
    const models = require('point_of_sale.models');

    const _super_order = models.Order.prototype;
    models.Order = models.Order.extend({
        calcular_tip() {
            let total = this.get_total_with_tax() + this.get_rounding_applied();
            let porcentaje = this.pos.config.custom_tip_percentage;
            const tip = this.get_tip();
            if (porcentaje > 0.00) {
                if (tip == 0){
                    let propina = total * (porcentaje / 100);
                    this.set_tip(parseFloat(propina+""));
                }else{
                    let total_temp = total - tip;
                    let propina_temp = total_temp * (porcentaje / 100);
                    if (propina_temp != tip) {
                        this.set_tip(parseFloat(propina_temp+""));
                    }
                }
            } else {
                this.set_tip(parse.float("0"));
            }
        }
    });
});
