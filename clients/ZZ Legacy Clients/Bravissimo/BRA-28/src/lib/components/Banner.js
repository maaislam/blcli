import { h, render, Component } from 'preact';
import { useState, useEffect } from "preact/hooks";

export const Banner = (props) => {
    const { message, animation = false } = props;
    const [result, setResult] = useState(null)
    if (!message) return;
    if (typeof message === 'string' || message instanceof String) {
        setResult(message);
    } else {
        if (message.length > 1) {
            let tempString = null;
            message.map((messageProm) => {
                Promise.resolve(messageProm).then((res) => {
                    if (res) {
                        tempString += res;
                    }
                }).then(() => setResult(tempString));
            })
        } else {
            Promise.resolve(message).then((res) => {
                setResult(res);
            })
        }
    }
    return !!result && <span className={animation ? 'BV-banner BV-banner--animate' : 'BV-banner'}>{result.replace('null', '')}</span>
}