import { Component, render } from "preact";
import { IproxyFunctionButton } from "../button/IproxyFunctionButton";
import { closeSidebar } from "../iirose_func/CloseSideBar";
import { SettingCard } from "./components/SettingCard";
import { IIROSEUtils } from "../iirose_func/IIROSEUtils";
import { LocalStorageUtils } from "../localStorageUtils/LocalStorageUtils";

interface IproxyInterfaceProps
{
    functionButtonWrapper: HTMLDivElement
}

interface IproxyInterfaceState
{
    showMainApp: boolean
    settingProxyDisplayValue: string
}

export class MainApp extends Component<IproxyInterfaceProps, IproxyInterfaceState>
{
    state = {
        showMainApp: true,
        settingProxyDisplayValue: '原版'
    }

    constructor()
    {
        super();
    }

    componentDidMount(): void
    {
        const { functionButtonWrapper } = this.props;
        render(<IproxyFunctionButton switchActive={this.showOrHideMainApp} />, functionButtonWrapper);

        window.addEventListener("keydown", this.keyboardCallApp);
    }

    createContent()
    {
        const { settingProxyDisplayValue } = this.state;
        return (
            <div className='bg-[rgba(224,224,224,0.8)] box-border w-full h-full'>
                <div className='p-[12px] w-full grid overflow-auto grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[12px] box-border'>
                    < SettingCard
                        title='图片代理'
                        displayValue={settingProxyDisplayValue}
                        mdicon="mdi-cog"
                        onClick={this.onClickChangeImageProxy}
                    />
                </div>

            </div>
        )
    }

    render()
    {
        const { showMainApp } = this.state;
        return (
            <div className={`flex flex-col fixed inset-0 z-[90000] transition-transform duration-250 ease-in-out origin-right ${showMainApp ? '' : 'translate-x-full'}`}>
                {this.createNavBar()}
                {this.createContent()}
            </div>
        );
    }

    onClickChangeImageProxy = () =>
    {
        const setImageProxy = (_t: HTMLElement, s: string) =>
        {
            const set = (userInput: string | null) =>
            {
                if (userInput === null) return;
                LocalStorageUtils.setSettingImageProxy(userInput);
                this.setState({ settingProxyDisplayValue: userInput });
            }

            if (s === '0')
            {
                LocalStorageUtils.setSettingImageProxy('');
                this.setState({ settingProxyDisplayValue: '原版' });
            } else if (s === '1')
            {
                const t = [`请输入代理地址，例子: example.com`, 100]
                IIROSEUtils.sync(2, t, set)
            }
        }

        const selectOption = [
            [0, '原版', `<div class="mdi-leaf" style="font-family:md;font-size:28px;text-align:center;line-height:100px;height:100px;width:100px;position:absolute;top:0;opacity:.7;left:0;"></div>`],
            [1, '自定', `<div class="mdi-square-edit-outline" style="font-family:md;font-size:28px;text-align:center;line-height:100px;height:100px;width:100px;position:absolute;top:0;opacity:.7;left:0;"></div>`]
        ]
        IIROSEUtils.buildSelect2(null, selectOption, setImageProxy, false, true, null, false, null, () => { })
    }

    createNavBar()
    {
        const navbariconclassname = `font-[md]! pl-[10] mr-[20] text-[24px]`

        return (
            <div className="flex min-h-[40px] bg-transparent justify-between">
                <div className="flex">
                    <div className="flex items-center cursor-pointer bg-black/50 hover:opacity-70 text-white px-[20px] transition-all duration-500 ease-in-out" onClick={this.showOrHideMainApp}>
                        <div className={`mdi-chevron-left ${navbariconclassname}`}></div>
                    </div>
                    <div className="px-5 flex items-center cursor-auto text-lg bg-[#fff3] text-white">
                        <span className={`mdi-server-network ${navbariconclassname}`}></span>
                        <span className="text-sm transition-all duration-500 ease-in-out font-bold">IIROSE-PROXY</span>
                    </div>
                </div>
            </div>
        );
    }

    showOrHideMainApp = () =>
    {
        closeSidebar();
        this.setState({ showMainApp: !this.state.showMainApp });
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
            this.showOrHideMainApp();
        } else if (event.key === 'Escape')
        {
            this.setState({ showMainApp: false });
        }
    }
}
