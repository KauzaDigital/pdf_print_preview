# -*- encoding: utf-8 -*-
{
    "name": "Pdf Print Preview",
    "version": "19.0.1.0", # Actualizado a v19
    "depends": ["web"],
    "author": "itechgroup",
    "category": "web",
    "license": "OPL-1",
    "data": [
        "views/res_users.xml",
        "report/ir_actions_report_templates.xml",
        "report/ir_actions_report.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "pdf_print_preview/static/src/scss/dialog.scss",
            # ELIMINADO: web/static/src/legacy/... (Esto causaba el error)
            
            # ORDEN CRÍTICO: Primero el diálogo, luego el handler
            "pdf_print_preview/static/src/js/pdf_preview_dialog.js",
            "pdf_print_preview/static/src/js/pdf_print_preview.js",
            "pdf_print_preview/static/src/js/user_menu.js",
            
            # XML de OWL
            "pdf_print_preview/static/src/xml/pdf_preview_dialog.xml",
        ],
    },
    "installable": True,
    "application": True,
}