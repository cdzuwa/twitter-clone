import React from 'react';

interface ListviewProps {
    items: JSX.Element[];
}


const Listview = (props:ListviewProps) => {
        if (props.items.length < 1) {
            return <div>There are no items!</div>;
        } else {
            return <ul className="list-view">
                {props.items.map(function (item, itemIndex) {
                    return <li key={itemIndex}>{item}</li>;
                })}
            </ul>;
        }
}

export default Listview;
