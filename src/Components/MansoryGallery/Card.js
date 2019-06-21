import React from 'react';
// import LazyLoad from 'react-lazy-load';

export default function MansoryCard(props) {

    const { gameSeries, amiiboSeries, name, character } = props;
    const image = (props.image === 'N/A'
        ? "data:image/png;base64,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"
        : props.image);
    return (
        <div className="mansoryCard">
            {/* <LazyLoad
                width={100}
                height={100}
                debounce={false}
                offsetVertical={500}
            > */}
            <img className="mansoryImage" src={image} alt="img" />
            {/* </LazyLoad> */}
            <div className="description-box description-box__text-primary">
                <h3 className="cardHeader">{amiiboSeries}</h3>
                <h3 className="cardHeader">Game Series: <span className="cardDetails">{gameSeries}</span></h3>
                <h3 className="cardHeader">Name: <span className="cardDetails">{name}</span></h3>
                <h3 className="cardHeader">Character: <span className="cardDetails">{character}</span></h3>
            </div>
        </div>

    )
}

