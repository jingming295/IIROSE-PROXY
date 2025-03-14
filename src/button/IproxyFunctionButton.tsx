import { Component } from "preact";

interface IproxyFunctionButtonProps
{
    switchActive: () => void
}

export class IproxyFunctionButton extends Component<IproxyFunctionButtonProps>
{
    render()
    {
        const { switchActive } = this.props
        return (
            <div className={'functionButton'}
                onClick={switchActive}
            >
                <span className={'functionBtnIcon mdi-server-network'}></span>
                <span className={'functionBtnFont'}>代理</span>
            </div>
        )
    }
}