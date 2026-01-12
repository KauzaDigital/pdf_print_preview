/** @odoo-module **/

import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";
import { session } from "@web/session";
// IMPORTACIÓN DIRECTA DE RPC (Solución definitiva para Odoo 19)
import { rpc } from "@web/core/network/rpc";
import { PDFPreviewDialog } from "@pdf_print_preview/js/pdf_preview_dialog";

function _getReportUrl(action, env, filename) {
    let url = `/report/pdf/${action.report_name}`;
    const actionContext = action.context || {};
    let safeFilename = (filename || action.name || "report").replace(/[/?%#&=]/g, "_") + ".pdf";
    
    if (action.data && JSON.stringify(action.data) !== "{}") {
        const options = encodeURIComponent(JSON.stringify(action.data));
        const context = encodeURIComponent(JSON.stringify(actionContext));
        url += `?filename=${safeFilename}&options=${options}&context=${context}`;
    } else if (actionContext.active_ids) {
        url += `/${actionContext.active_ids.join(",")}?filename=${safeFilename}`;
    }
    return url;
}

async function PdfPrintPreview(action, options, env) {
    if (action.report_type === "qweb-pdf" && (session.preview_print || session.automatic_printing)) {
        try {
            // USAR RPC IMPORTADO DIRECTAMENTE
            // Ya no dependemos de env.services.rpc que está dando error de tipo
            const result = await rpc("/pdf_print_preview/get_report_name", {
                report_name: action.report_name,
                data: JSON.stringify(action.context)
            });

            if (result && (result.wkhtmltopdf_state === "ok" || result.wkhtmltopdf_state === "upgrade")) {
                const url = _getReportUrl(action, env, result.file_name);
                
                if (session.preview_print) {
                    env.services.dialog.add(PDFPreviewDialog, {
                        url: url,
                        title: action.name,
                    });
                }
                return true; 
            }
        } catch (error) {
            console.error("Error en PDF Preview RPC:", error);
        }
    }
}

registry.category("ir.actions.report handlers").add("pdf_print_preview", PdfPrintPreview);