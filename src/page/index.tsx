import { render } from "preact";
import { MainApp } from "./MainApp";

export class Init
{
    static createComponent(systemFCItemBox: HTMLDivElement, container: HTMLDivElement)
    {
        const functionButtonWrapper = document.createElement('div');
        const firstChild = systemFCItemBox.firstChild;
        systemFCItemBox.insertBefore(functionButtonWrapper, firstChild);
        const iproxyWrapper = document.createElement('div')
        container.appendChild(iproxyWrapper)
        render(< MainApp
            functionButtonWrapper={functionButtonWrapper}
        />, iproxyWrapper)
    }
}