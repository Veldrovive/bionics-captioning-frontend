'use client'

import Image from "next/image";
import styles from "./page.module.scss";
import useScreenSize from "./useScreenSize";
import { useMemo } from "react";

export default function Home() {
    const { width, height } = useScreenSize();

    const contentWidth = useMemo(() => {
        // 50% of the width of the screen while width > 1200
        // Then 600px while width > 600
        // Then 100% of the width of the screen
        if (width > 1200) {
            return width / 2;
        } else if (width > 600) {
            return 600;
        } else {
            return width;
        }
    }, [width])

    const gradioWidth = useMemo(() => {
        return Math.min(contentWidth, 600)
    }, [contentWidth])

    console.log(gradioWidth)

    const imageWidth = useMemo(() => {
        // 2/3 of the content width
        return contentWidth * 2 / 3;
    }, [contentWidth])

    return (
        <div className={styles["full-container"]}>
            <div className={styles["content-container"]} style={{ width: contentWidth }}>
                <div className={styles["image-container"]} style={{ width: imageWidth }}>
                    <Image
                        src="/next-js-pages-test/uoft_logo.webp"
                        alt="UofT Logo"
                        className={styles["image"]}
                        layout="fill"
                        priority
                    />
                </div>
                <div>
                    <iframe
                        src="https://ronniet-imagecaptioning.hf.space?__theme=dark"
                        frameBorder="0"
                        width={gradioWidth}
                        height="450"
                        style={{ width: gradioWidth, minHeight: "800px" }}
                    ></iframe>
                </div>
            </div>
        </div>
    )
}