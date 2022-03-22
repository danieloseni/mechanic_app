import LandingNavbar from 'layouts/LandingNavbar'
import React from 'react';
import CheckEngine from 'images/check-engine.jpg';
import FuelSymbol from 'images/fuel-symbol.jpg';

interface Props {

}

export const FAQ = (props: Props) => {
    return (
        <div className="main montserrat">

            <LandingNavbar />

            <div className="page-title main-pd2 main-mg">
                FAQs
            </div>

            <div className="faq-box main-pd2">
                <div className="faq-group">
                    <div className="question">
                        What does this symbol mean? <img src={FuelSymbol} alt="" />
                    </div>

                    <div className="answer">
                        It simply means your vehicle is running low on fuel.
                    </div>
                </div>

                <div className="faq-group">
                    <div className="question">
                        What does this symbol mean? <img src={CheckEngine} alt="" />
                    </div>

                    <div className="answer">
                        This symbol is known as the check engine light and it may appear for a wide range of reasons such as an open, loose or cracked gas cap, which causes fuel to evaporate or a much serious issue such as low oil pressure or overheating! (NOTE: Some car dashboards will display the words “CHECK ENGINE” instead of this)

                        If the check engine light is red and/or flashing, it is advised to request assistance! As a flashing check engine light signals that you have a major problem that could cause serious damage to your engine if you ignore it.

                    </div>
                </div>
                <div className="faq-group">
                    <div className="question">
                        My brakes make noise when I engage them. Is this an issue?
                    </div>

                    <div className="answer">
                        If your brakes make a grinding or squeaking noise, it normally means your brake pads are worn out and need to be changed.  It is always best to have any noise your brakes make looked at by one of our technicians.
                    </div>
                </div>
               
                <div className="faq-group">
                    <div className="question">
                        How do I change my car’s battery?
                    </div>

                    <div className="answer">
                        <ul className="itemization">
                            <li>Locate the battery – The battery should be located in an accessible part on either side of the car’s frame. The battery is a rectangular box with two cables attached to it. In some European cars the battery is under the matting in the trunk.</li>
                            <li>	Identify battery terminals – Locate the positive and the negative terminals. The positive terminal will have a plus sign and the negative terminal will have a minus sign.</li>
                            <li>Disconnect the negative terminal – Loosen the negative clamp with a wrench and slide it off of the terminal. It is important that you disconnect the negative terminal socket before the positive terminal socket. Otherwise, you may short circuit the positive terminal to a grounded part of the car.</li>
                            <li>	Disconnect the positive terminal</li>
                            <li>Remove the car battery and put in the new battery.</li>
                            <li>		Reconnect the positive and negative terminal.</li>
                            <li>	Tighten the clamps using a wrench.</li>
                            <li>	Close the hood – Shut the hood of your car firmly and start your car.</li>
                            <li>		Check that all the electronic devices are working properly</li>
                        </ul>
                    </div>
                </div>

                <div className="faq-group">
                    <div className="question">
                        How do I check my oil level?
                    </div>

                    <div className="answer">
                        <ul className="itemization">
                            <li>	First, make sure that you are parked on level ground, for the most accurate reading.</li>
                            <li>		Next, safely prop your hood open and find the dipstick (which generally has a brightly colored handle, usually orange, and have the word OIL labeled on them).</li>
                            <li>			Pull the dipstick out and wipe it down with a towel or rag, and then replace it into the engine, making sure that it goes all the way in.</li>
                            <li>				Now, pull the dipstick back out- and be sure NOT to turn the stick upside down to read as the oil will run and you will not have an accurate reading. The dipstick will have two marks on the bottom (usually lines or holes in the stick), and you can read the oil level by looking to see where the oily section and dry section meet. If you find this mark between the two then you are all set!</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
