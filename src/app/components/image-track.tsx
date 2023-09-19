"use client"
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/ImageTrack.module.css";

type StyleState = {
    transform: string;
}

const ImageTrack = () => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseDownAt, setMouseDownAt] = useState(0);
    const [prevPercentage, setPrevPrecentage] = useState(0);
    const [dynamicStyle,setDynamicStyle] = useState<StyleState>({
        transform: "translate(0%,-50%)"
    });
    const imageTrackRef = useRef<HTMLDivElement | null>(null);
    const handleMouseDown = (event: MouseEvent) => {
        setMouseDownAt(event.clientX);
        setIsMouseDown(true);
        updateMousePosition(event);
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (isMouseDown) {
            updateMousePosition(event);
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setMouseDownAt(0);
    };

    const updateMousePosition = (event: MouseEvent) => {
        if(mouseDownAt===0) return;
        const x = event.clientX;
        const mouseDelta = mouseDownAt - x;
        const maxDelta = window.innerWidth / 2;
        const percentage = -(mouseDelta/maxDelta)*100 + prevPercentage;
        const limitedPrecentage = Math.max(Math.min(percentage,10),-50)
        if (imageTrackRef.current) {
            imageTrackRef.current.animate({
                transform: `translate(${limitedPrecentage}%, -50%)`
            }, {
                duration: 1200,
                fill: "forwards"
            });
        }
        setDynamicStyle({
            transform:`translate(${limitedPrecentage}%,-50%)`
        })
        setPrevPrecentage(limitedPrecentage)
    };

    useEffect(() => {
        // Add global event listeners
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Clean up the global listeners when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isMouseDown, mouseDownAt]);

    // const handleOnUp = () => {
    //     track.dataset.mouseDownAt = "0";
    //     track.dataset.prevPercentage = track.dataset.percentage;
    // };

    // const handleOnMove = (e) => {
    //     if (track.dataset.mouseDownAt === "0") return;

    //     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    //         maxDelta = window.innerWidth / 2;

    //     const percentage = (mouseDelta / maxDelta) * -100,
    //         nextPercentageUnconstrained =
    //             parseFloat(track.dataset.prevPercentage) + percentage,
    //         nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    //     track.dataset.percentage = nextPercentage;

    //     track.animate(
    //         {
    //             transform: `translate(${nextPercentage}%, -50%)`,
    //         },
    //         { duration: 1200, fill: "forwards" }
    //     );

    //     for (const image of track.getElementsByClassName("image")) {
    //         image.animate(
    //             {
    //                 objectPosition: `${100 + nextPercentage}% center`,
    //             },
    //             { duration: 1200, fill: "forwards" }
    //         );
    //     }
    // };

    return (
        <div
            ref={imageTrackRef}
            className={styles.imageTrack}
            style={dynamicStyle}
            data-mouse-down-at="0"
            data-prev-percentage="0"
        >
            <img
                className={styles.customImage}
                src="https://images.unsplash.com/photo-1694746027436-89bab2f0bf18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                alt=""
                draggable="false"
            />
            <img
                className={styles.customImage}
                src="https://images.unsplash.com/photo-1695027643159-e0480445c466?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3072&q=80"
                alt=""
                draggable="false"
            />
            <img
                className={styles.customImage}
                src="https://images.unsplash.com/photo-1695026069898-bcb96e060d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=900&q=60"
                alt=""
                draggable="false"
            />
            <img
                className={styles.customImage}
                src="https://images.unsplash.com/photo-1694903663907-7b28edb9a9a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3102&q=80"
                alt=""
                draggable="false"
            />
            <img
                className={styles.customImage}
                src="https://images.unsplash.com/photo-1694853175084-abb110d92894?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                alt=""
                draggable="false"
            />
        </div>
    );
};

export default ImageTrack;
