export class LocalStorageUtils
{
    public static getIproxySetting()
    {
        const setting = localStorage.getItem('iproxySetting')
        if (!setting)
        {
            const defaultSetting: IProxySetting = {
                imageProxy: ''
            }

            localStorage.setItem('iproxySetting', JSON.stringify(defaultSetting))

            return defaultSetting
        }
        return JSON.parse(setting) as IProxySetting
    }

    public static setSettingImageProxy(imageProxy: string)
    {
        const setting = this.getIproxySetting()
        setting.imageProxy = imageProxy
        localStorage.setItem('iproxySetting', JSON.stringify(setting))
    }


}