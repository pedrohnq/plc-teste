// src/components/Typography/Text/Text.js
import React from "react";
import styles from './Text.module.css';


function Text({ children, className, href, onClick }){
    if (href) {
        return (
            <a href={href} className={`${styles.text} ${className || ''}`} onClick={onClick}>
                {children}
            </a>
        );
    }

    return (
        <p className={`${styles.text} ${className || ''}`} onClick={onClick}>
            {children}
        </p>
    );
};

export default Text;