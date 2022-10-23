const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: 'org.beaconFire.app',
                productName: 'EV-Plus', //项目名，也是生成的安装文件名
                win: {
                    icon: './public/icon.png', //图标，当前图标在根目录下
                    target: [
                        {
                            target: 'nsis', //利用nsis制作安装程序
                            arch: [
                                'x64', //64位
                            ]
                        }
                    ]
                }
            }
        }
    }
})

