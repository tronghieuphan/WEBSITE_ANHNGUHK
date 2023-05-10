import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./style.scss";
const Slide = () => {
    const images = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];

    return (
        <div>
            <Fade duration={1000} transitionDuration={1600}>
                <div className="each-slide">
                    <div>
                        <img src={images[0]} />
                    </div>
                    <p>
                        fsavvvvv vvv vvvvvvvvvvv vvvvvvvvv vvvvvvvvv vvvvvvv vvvvvvvvvvffff ffffffffff ffffffffffffff fffffffff ffffffffffff
                    </p>
                </div>
                <div className="each-slide">
                    <p>Second Slide</p>
                    <div>
                        <img src={images[1]} />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={images[2]} />
                    </div>
                    <p>Third Slide</p>
                </div>
                <div className="each-slide">
                    <p>Four Slide</p>
                    <div>
                        <img src={images[3]} />
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default Slide;
