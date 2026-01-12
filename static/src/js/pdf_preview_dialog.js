/** @odoo-module **/

import { Component } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class PDFPreviewDialog extends Component {
    static template = "pdf_print_preview.PreviewDialogContent";
    static components = { Dialog };
    static props = {
        url: { type: String },
        title: { type: String, optional: true },
        close: { type: Function }, // OWL requiere que esta prop se llame exactamente 'close'
    };

    get dialogProps() {
        return {
            title: this.props.title || "Vista Previa",
            size: "xl",
            // IMPORTANTE: Eliminamos 'onClose' por completo. 
            // Usamos 'close' que es la prop estándar de Odoo 19.
            close: this.props.close, 
        };
    }
}