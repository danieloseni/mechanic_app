import LandingNavbar from 'layouts/LandingNavbar'
import React from 'react'

interface Props {

}

export const PrivacyPolicy = (props: Props) => {
    return (
        <div className="main montserrat">

            <LandingNavbar />

            <div className="page-title main-pd2 main-mg">
                Our Privacy Policy
            </div>

            <div className="block main-pd2">
                This privacy policy is intended to inform you of the types of information collected by us.
                Please read this Policy carefully, because by using the Site, you are acknowledging that you understand and agree to the terms of this Policy, and consent to the manner in which we may collect, use and disclose the foregoing information. If you do not agree to the terms of this Policy, please do not use the Site.
                We reserve the right to change the provisions of this Policy at any time. We will alert you that changes have been made by indicating on the Policy the date it was updated. We encourage you to review this Policy from time to time to make sure that you understand how any Personal Information you provide will be used. Your continued use of the Site following the posting of changes to these terms will mean you accept those changes.

            </div>

            <div className="block main-pd2">
                <div className="title">
                    The information we collect
                </div>

                <ul className="bullet">
                    <li>	Personal information provided to Us – We only have access to and collect personal information (such as your name, number, telephone number, or email address, and email preferences (collectively, “Personal Information”) that you voluntarily give us via email or other direct contact from you. We will not sell or rent your Personal Information to anyone. We are the sole owners of the Personal Information collected on this Site.</li>

                    <li>	Information Collected by Automated Means – Whenever you use the Site, a variety of technologies may be used that automatically collect information about how the Site is accessed and used (“Usage Information”). Usage Information may include, in part, browser type, operating system, the page served, the time, how many users visited the Site, and the website you visited immediately before the Site. This statistical data provides us with information about the use of the Site, such as how many visitors visit a specific page on the Site, how long they stay on that page, and which hyperlinks, if any, they “click” on. Usage Information helps us to keep the Site fresh and interesting to our visitors and to tailor content to a visitor’s interests. Usage Information is generally non-identifying, but if we associate it with you as a specific and identifiable person, we treat it as Personal Information.</li>

                </ul>
            </div>

            <div className="block main-pd2">
                <div className="title">
                    How do we use your information?
                </div>

                <ul className="bullet">
                    <li>Registration – A user may need to first complete a registration form in order to use the Site. During registration, a user is required to give certain information (such as name and email address). This information is used to contact you about the services on our Site in which you have expressed interest.</li>

                    <li>Requests – We are likely to use the information provided to properly locate the user of our platform to provide assistance as soon as possible.</li>

                </ul>
            </div>

            <div className="block main-pd2">
                <div className="title">
                    Do we share your information?
                </div>

                We will not trade, rent, share or sell your Personal Information to third parties unless you ask or authorize us to do so.
                Unless you ask or provide your consent to do so, we will not share your Personal Information with any third party outside of our organization, other than with our service providers, including as necessary to fulfill your request. Only employees who need the Personal Information to perform a specific job (for example, billing or customer service) are granted access to Personal Information. The computers/servers in which we store Personal Information are kept in a secure environment.
                We will disclose Personal Information when we believe in good faith that such disclosures (a) are required by law, including, for example, to comply with a court order or subpoena, or (b) will help to: enforce our policies; enforce contest, sweepstakes, promotions, and/or game rules; protect your safety or security, including the safety and security of property that belongs to you; and/or, protect the safety and security of our Site or third parties

            </div>

        </div>
    )
}
