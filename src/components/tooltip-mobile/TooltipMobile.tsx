import React from 'react';
import "./TooltipMobile.css"

interface ITooltipMobileProps {
    image?: React.ReactNode,
    header?: string
    text: string,
}
export const TooltipMobile: React.FC<ITooltipMobileProps> = ({ image, text ,header}) => {
    const htmlDescription = text.replaceAll('%',`<span class="perCent-special-font">%</span>`);
    return (
        <div className='TooltipMobile'>
            {
                (!!header || !!image) && <>
                <span className='TooltipMobile-header'>
                    {!!header ? header : ""}
                    {!!image ? image : <></>}
                </span>
                <hr />
                </>
            }
            <span className='TooltipMobile-info' dangerouslySetInnerHTML={ {__html: htmlDescription}} />
        </div>
    );
};