import { Component, render } from "preact";
import { IproxyFunctionButton } from "../components/IproxyFunctionButton";
import { closeSidebar } from "../../iirose_func/CloseSideBar";
import { SettingCard } from "../components/SettingCard";

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
        active: true
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

    createContent()
    {
        return (
            <div className='bg-[rgba(224,224,224,0.8)] box-border w-full h-full'>
                <div className='p-[12px] w-full grid overflow-auto grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[12px] box-border'>
                    < SettingCard />
                    < SettingCard />
                    < SettingCard />
                    < SettingCard />
                    < SettingCard />
                    < SettingCard />

                </div>

            </div>
        )
    }

    render()
    {
        const { active } = this.state;
        return (
            <div className={`flex flex-col fixed inset-0 z-[90000] transition-transform duration-250 ease-in-out origin-right ${active ? '' : 'translate-x-full'}`}>
                {this.createNavBar()}
                {this.createContent()}
            </div>
        );
    }

    createNavBar()
    {
        const navbariconclassname = `font-[md]! pl-[10] mr-[20] text-[24px]`

        return (
            <div className="flex min-h-[40px] bg-transparent justify-between">
                <div className="flex">
                    <div className="flex items-center cursor-pointer bg-black/50 hover:opacity-70 text-white px-[20px] transition-all duration-500 ease-in-out" onClick={this.switchActive}>
                        <div className={`mdi-chevron-left ${navbariconclassname}`}></div>
                    </div>
                    <div className="px-5 flex items-center cursor-auto text-lg bg-white/20 text-white">
                        <span className={`mdi-server-network ${navbariconclassname}`}></span>
                        <span className="text-sm transition-all duration-500 ease-in-out font-bold">IIROSE-PROXY</span>
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
