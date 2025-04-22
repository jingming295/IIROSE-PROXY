import { Component, render } from "preact";
import { IproxyFunctionButton } from "../button/IproxyFunctionButton";
import { closeSidebar } from "../iirose_func/CloseSideBar";
import '../app.css'

interface IproxyInterfaceProps
{
    functionButtonWrapper: HTMLDivElement
}

interface IproxyInterfaceState
{
    active: boolean
}

export class IProxyInterface extends Component<IproxyInterfaceProps, IproxyInterfaceState>
{
    state = {
        active: false
    }

    constructor()
    {
        super();
    }

    componentDidMount(): void
    {
        const { functionButtonWrapper } = this.props;
        render(<IproxyFunctionButton switchActive={this.switchActive} />, functionButtonWrapper);

        window.addEventListener("keydown", this.keyboardCallApp);
    }

    render()
    {
        const { active } = this.state;
        return (
            <div className={`fixed inset-0 z-[90000] transition-transform duration-250 ease-in-out origin-right ${active ? '' : 'translate-x-full'}`}>
                {this.createNavBar()}
                <div className="w-full h-full bg-gray-200/80"></div>
            </div>
        );
    }

    createNavBar()
    {
        const navbariconclassname = `font-[md]! text-[24] pl-5 mr-10`

        const buttonclassname = ``

        return (
            <div className="flex min-h-[40px] bg-transparent justify-between">
                <div className="flex">
                    <div className="flex items-center cursor-pointer bg-black/50 text-white transition-opacity duration-300 ease-in-out px-10" onClick={this.switchActive}>
                        <div className={`mdi-chevron-left ${navbariconclassname}`}></div>
                    </div>
                    <div className="px-5 flex items-center cursor-auto text-lg bg-white/20 text-white">
                        <span className={`mdi-server-network ${navbariconclassname}`}></span>
                        <span className="text-sm transition-all duration-500 ease-in-out">IIROSE-PROXY</span>
                    </div>
                </div>
            </div>
        );
    }

    switchActive = () =>
    {
        closeSidebar();
        this.setState({ active: !this.state.active });
    }

    keyboardCallApp = (event: KeyboardEvent) =>
    {
        console.log(event.key);
        if ((event.altKey && event.key === 'q') || (event.altKey && event.key === 'Q'))
        {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            const focusedElement = document.activeElement as HTMLElement;
            if (focusedElement && focusedElement.tagName === 'TEXTAREA')
            {
                focusedElement.blur();
            }
            this.switchActive();
        } else if (event.key === 'Escape')
        {
            this.setState({ active: false });
        }
    }
}
