/** @odoo-module **/

import { Component } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
import { _t } from "@web/core/l10n/translation";

export class PDFPreviewDialog extends Component {
    static template = "pdf_print_preview.PreviewDialogContent";
    static components = { Dialog };
    static props = {
        url: { type: String },
        title: { type: String, optional: true },
        close: { type: Function },
    };

    setup() {
        this.title = this.props.title || _t("Vista Previa");
        this.viewerUrl = `/web/static/lib/pdfjs/web/viewer.html?file=${encodeURIComponent(this.props.url)}`;
    }

    get dialogProps() {
        return {
            title: this.title,
            size: "xl",
            onClose: this.props.close,
        };
    }
}