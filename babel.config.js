module.exports = {
    "presets": [
        "@vue/cli-plugin-babel/preset"
    ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-plus",
                "styleLibraryName": "theme-chalk"
            }
        ],
        [
            "import",
            {
                libraryName: 'element-plus',
                customStyleName: (name) => {
                    return `element-plus/lib/theme-chalk/${name}.css`;
                },
            },
        ],
    ]
}
