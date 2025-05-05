import { Component, ComponentChildren } from "preact";

interface SettingCardProps
{
    title: string;
    displayValue: string;
    mdicon: string;
    onClick: () => void;
}


export class SettingCard extends Component<SettingCardProps>
{
    constructor(props: SettingCardProps)
    {
        super(props);
    }

    handleClick = () =>
    {
        this.props.onClick();
    };

    render(): ComponentChildren
    {
        const { title, mdicon, displayValue } = this.props;

        return (
            <div className='flex flex-col h-[200px] m-[12px] shadow-[0_0_1px_rgba(0,0,0,0.12),_0_1px_1px_rgba(0,0,0,0.24)]'>
                <div className='commonBoxHead'>
                    <div className={`flex font-md ${mdicon} h-full text-[30px] items-center`}></div>
                    <span className='font-bold flex h-full text-[20px] items-center ml-[22px]'>{title}</span>
                </div>
                <div className='textColor shopItemColor h-[50%]' onClick={this.handleClick}>
                    <div className='font-bold whoisTouch2 text-[16px] w-full h-full flex items-center justify-center'>
                        {displayValue}
                    </div>
                </div>
            </div>
        );
    }
}
