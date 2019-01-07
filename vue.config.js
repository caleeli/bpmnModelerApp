module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "com.processmaker.modeler",
                "mac": {
                    "category": "public.app-category.developer-tools"
                },
                "icon": "src/assets/icons/processmaker.icns"
            }
        }
    }
}
