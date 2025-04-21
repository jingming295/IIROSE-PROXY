import { Init } from "./init/Init";
import './app.css'
class APP
{
    constructor()
    {
    }

    async start()
    {
        try
        {
            if (typeof document === 'undefined')
            {
                console.log(
                    `%c [Ming's IIROSE-PROXY] - FAILED `,
                    `color: #FF5733; background: black; margin: 1em 0; padding: 5px 0; font-weight: 900`
                );
                return;
            }

            const mainFrame = document.getElementById('mainFrame') as HTMLIFrameElement | null;
            const mainContainer = document.getElementById('mainContainer') as HTMLDivElement | null;
            if (!mainContainer) return;

            // 检查 mainFrame 是否存在并注入脚本
            if (mainFrame && mainFrame.contentWindow && mainFrame.contentDocument)
            {
                this.injectScriptIntoIframe(mainFrame);
            }

            const functionItemBox = document.getElementsByClassName('functionItemBox')

            if (!functionItemBox.length)
            {
                console.log(
                    `%c [Ming's IIROSE-PROXY] - FAILED: FunctionItemBox Not Found `,
                    `color: #FF5733; background: black; margin: 1em 0; padding: 5px 0; font-weight: 900`
                );
            }

            const systemFCItemBox = functionItemBox[5] as HTMLDivElement

            Init.createComponent(systemFCItemBox, mainContainer)

            console.log(
                `%c [Ming's IIROSE-PROXY] - LOADED `,
                `color: #4CAF50; background: black; margin: 1em 0; padding: 5px 0; font-weight: 900`
            );
        } catch (error)
        {
            console.log(
                `%c [Ming's IIROSE-PROXY] - FAILED: ${(error as Error).message} `,
                `color: #FF5733; background: black; margin: 1em 0; padding: 5px 0; font-weight: 900`
            );
        }

    }

    injectScriptIntoIframe(iframe: HTMLIFrameElement)
    {
        // 获取 iframe 的文档对象
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDocument)
        {
            console.log(
                `%c [Ming's IIROSE-PROXY] - UNABLE TO GET IFRAME `,
                `color: #FF5733; background: black; margin: 1em 0; padding: 5px 0; font-weight: 900`
            );

            return;
        }

        // 创建一个新的 script 标签
        const script = iframeDocument.createElement('script');
        script.type = 'module'; // 使用模块类型
        script.textContent = `
            (() => {
                
                const app = new (${APP.toString()})();
                app.init();
            })();
        `;

        // 将 script 标签插入到 iframe 的 body 中
        iframeDocument.body.appendChild(script);
    }
}

const app = new APP();
app.start();
