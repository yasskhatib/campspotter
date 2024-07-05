// src/components/common/ScrollbarWrapper.jsx
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const ScrollbarWrapper = ({ children, ...props }) => {
    return (
        <PerfectScrollbar {...props}>
            {children}
        </PerfectScrollbar>
    );
};

export default ScrollbarWrapper;
