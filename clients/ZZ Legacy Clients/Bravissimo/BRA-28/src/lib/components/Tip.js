import { h, render, Component } from 'preact';

export const Tip = (message) => {
    if (!message) return;

    return <span className="BV-tip">{message}</span>
}