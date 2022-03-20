import LandingNavbar from 'layouts/LandingNavbar'
import React from 'react'

interface Props {

}

export const Terms = (props: Props) => {
    return (
        <div className="main montserrat">

           <LandingNavbar />
            <div className="page-title main-pd2 main-mg">
                TERMS
            </div>

            <div className="block main-pd2">
                By using the Site, you confirm that you understand and accept all the Terms and Conditions. The Site reserves the right to make modifications of these Terms and Conditions at any time. Changes will be effective once posted on the Site with no other notice provided. Your continued use of the Site following the posting of changes to these Terms and Conditions constitutes your acceptance of those changes.
            </div>
            <div className="block main-pd2">
                For the purpose of customer service improvement, we may collect information including but not limited to personal information, transaction information of the users or other, users hereby agree with our collection with the purpose mentioned herein.
            </div>

            

        </div>
    )
}
