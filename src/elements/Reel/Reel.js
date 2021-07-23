
import React from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import style from './Reel.module.scss';


// For reference react-slic
// https://www.npmjs.com/package/react-slick
// https://react-slick.neostack.com/docs/example/auto-play-methods

const Reel = ({ dataset, onSelect }) => {

    const settings = {
        dots: false,
        lazyLoad: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const onItemClick = obj => {
        onSelect && onSelect(obj);
    }

    return (
        <div className={style.reel}>
            {/* {dataset.label && (<div className={style.title}>{dataset.label}</div>)}
            <Slider {...settings}>
                {dataset.data.map(item => {
                    const temp = Math.random();
                    return <> {
                        dataset.type == 'color' ?
                            (<div className={style.frameColor} style={{backgroundColor:item}} onClick={() => onItemClick({type:'color','data':item})}></div>) :
                            (<div className={style.frameImage} onClick={() => onItemClick({type:'image','data': `${item.thumbnail}&${temp}`})}>
                                <img src={`${item.thumbnail}&${temp}`} />
                            </div>)
                    }</>
                })}
            </Slider> */}
            
        </div>
    );
};

export default Reel;