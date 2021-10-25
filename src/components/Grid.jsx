import React from 'react';
import PropTypes from 'prop-types';

Grid.propTypes = {
    col: PropTypes.number.isRequired,
    mdCol: PropTypes.number,
    smCol: PropTypes.number,
    gap: PropTypes.number,
};

function Grid(props) {
    const { gap, col, mdCol, smCol, children } = props
    const style = {
        gap: gap ? `${gap}px` : '0'
    }

    const colVal = col ? `grid-col-${col}` : ''
    const mdColVal = mdCol ? `grid-col-md-${mdCol}` : ''
    const smColVal = smCol ? `grid-col-sm-${smCol}` : ''

    return (
        <div className={`grid ${colVal} ${mdColVal} ${smCol}`} style={style}>
            {children}
        </div>
    );
}

export default Grid;