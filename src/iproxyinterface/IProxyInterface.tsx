import { Component, render } from "preact";
import '../scss/IProxyInterface.scss'
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
        super()
    }

    componentDidMount(): void
    {
        const { functionButtonWrapper } = this.props
        render(< IproxyFunctionButton switchActive={this.switchActive} />, functionButtonWrapper)

        window.addEventListener("keydown", this.keyboardCallApp);
    }

    render()
    {
        const { active } = this.state
        return (
            <div className={active ? 'IProxyWrapper' : 'IProxyWrapper HideIProxyWrapper'}>
                {this.createNavBar()}

                <div className={'IProxyContent'}>

                </div>
            </div>
        )
    }

    createNavBar()
    {
        return (
            <div className={'IProxyNavigationBar'}>
                <div className={'LeftComponent'}>
                    <div className={'NavBarButton '} onClick={this.switchActive}>
                        <div className={'NavBarButtonIcon mdi-chevron-left'}></div>
                    </div>
                    <div className={'NavBarTitle'} id={'NavBarTitle'}>
                        <div className={'NavBarButtonIcon mdi-server-network'}></div>
                        <div className={"NavBarButtonText"}>IIROSE-PROXY</div>

                    </div>
                </div>
            </div>
        )
    }

    switchActive = () =>
    {
        closeSidebar()
        this.setState(
            {
                active: !this.state.active
            }
        )
    }

    keyboardCallApp = (event: KeyboardEvent) =>
    {
        console.log(event.key)
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