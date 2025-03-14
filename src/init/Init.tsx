import { render } from "preact";
import { IProxyInterface } from "../iproxyinterface/IProxyInterface";

export class Init
{
    static createComponent(systemFCItemBox: HTMLDivElement, container: HTMLDivElement)
    {
        const functionButtonWrapper = document.createElement('div');

        const firstChild = systemFCItemBox.firstChild;
        systemFCItemBox.insertBefore(functionButtonWrapper, firstChild);
        const iproxyWrapper = document.createElement('div')
        container.appendChild(iproxyWrapper)
        render(< IProxyInterface
            functionButtonWrapper={functionButtonWrapper}
        />, iproxyWrapper)
    }
}