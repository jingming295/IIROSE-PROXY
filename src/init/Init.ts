import { render } from "preact";

export class Init
{
    static createComponent(systemFCItemBox: HTMLDivElement)
    {
        const functionButtonWrapper = document.createElement('div')

        systemFCItemBox.insertBefore(functionButtonWrapper, systemFCItemBox.firstChild);
        console.log(functionButtonWrapper)


    }
}