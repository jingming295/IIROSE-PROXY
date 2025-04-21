import { Component, render } from "preact";
import { IproxyFunctionButton } from "../button/IproxyFunctionButton";
import { closeSidebar } from "../iirose_func/CloseSideBar";

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
            <div className={`tw:fixed tw:inset-0 tw:z-[90000] tw:transition-transform tw:duration-250 tw:ease-in-out tw:origin-right ${active ? '' : 'tw:translate-x-full'}`}>
                {this.createNavBar()}
                <div className="tw:w-full tw:h-full tw:bg-gray-200/80"></div>
            </div>
        );
    }

    createNavBar()
    {
        return (
            <div className="tw:flex tw:min-h-[40px] tw:bg-transparent tw:justify-between">
                <div className="tw:flex">
                    <button className="tw:px-5 tw:flex tw:items-center tw:cursor-pointer tw:text-xl tw:bg-black/50 tw:text-white tw:transition-opacity tw:duration-300 tw:ease-in-out" onClick={this.switchActive}>
                        <span className="tw:text-lg tw:px-2 tw:mr-5 tw:cursor-pointer">←</span>
                    </button>
                    <div className="tw:px-5 tw:flex tw:items-center tw:cursor-auto tw:text-lg tw:bg-white/20 tw:text-white">
                        <span className="tw:text-lg tw:px-2">🖧</span>
                        <span className="tw:text-sm tw:transition-all tw:duration-500 tw:ease-in-out">IIROSE-PROXY</span>
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
