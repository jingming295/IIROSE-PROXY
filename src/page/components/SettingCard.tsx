import { Attributes, Component, ComponentChildren, Ref } from "preact";

export class SettingCard extends Component
{

    render(props?: Readonly<Attributes & { children?: ComponentChildren; ref?: Ref<any> | undefined; }> | undefined, state?: Readonly<{}> | undefined, context?: any): ComponentChildren
    {
        return (
            <div className='flex flex-col h-[200px] m-[12px] shadow-[0_0_1px_rgba(0,0,0,0.12),_0_1px_1px_rgba(0,0,0,0.24)]'>
                <div className='commonBoxHead'>
                    <div className='flex font-md mdi-cog h-full text-[30px] items-center'></div>
                    <span className='font-bold flex h-full text-[20px] items-center ml-[22px]'>设置</span>
                </div>
                <div className='textColor shopItemColor h-[50%] '>
                    <div className=' font-bold whoisTouch2 text-[16px] w-full h-full flex items-center justify-center' >
                        1234567890
                    </div>

                </div>

            </div>
        )
    }

}