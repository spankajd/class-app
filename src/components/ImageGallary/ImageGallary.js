import React, { useState, useRef, useEffect } from 'react';
import i18n from '../../i18n';
import Slider from "react-slick";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import _ from 'lodash';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import style from './ImageGallary.module.scss';


const ImageGallary = ({ dataset, onSelect }) => {

    const [dropdownOptions, setDropdownOptions] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDataSet, setSelectedDataSet] = useState(null);
    const mainNavRef = useRef();
    const navRef = useRef();

    useEffect ( () => {
        setDropdownOptions(_.map(dataset, 'label'));
        setSelectedDataSet(dataset[0]);
    }, []);

    useEffect ( () => {
        if(dropdownOptions) {
            setSelectedOption(dropdownOptions[0]);
        }
    }, [dropdownOptions]);

    const mainNavSettings = {
        asNavFor: navRef,
        dots: false,
        lazyLoad: true,
        infinite: false,
        arrows:false
    }
    const navSettings = {
        dots: false,
        lazyLoad: true,
        infinite: false,
        arrows:false,
        // speed: 500,
        // slidesToShow: 6,
        // slidesToScroll: 1,
        // initialSlide: 1,
        asNavFor: mainNavRef,
        slidesToShow: 5,
        swipeToSlide: true,
        focusOnSelect: true,
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 3,
        //             infinite: true,
        //             dots: true
        //         }
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2,
        //             initialSlide: 1
        //         }
        //     },
        //     {
        //         breakpoint: 480,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         }
        //     }
        // ]
    };

    const onItemClick = (e,obj) => {
        onSelect && onSelect(obj);
        e.stopPropagation();
        e.preventDefault();
    }

    const onDropdownSelect = e => {
        setSelectedDataSet( _.find(dataset, [ 'label', e.value]));
    }

    return (
        <div className={style.imageGallary}>
            <div className={style.dropdownWrapper}>
                <label>{i18n.t("background.category")}</label>
                {dropdownOptions && (<Dropdown options={dropdownOptions} onChange={onDropdownSelect} value={selectedOption} className={style.dropdown} placeholder="Select an option" />)}
            </div>
            
            {selectedDataSet && (<div className={style.imageWrapper}>
                <div className={style.previewWrapper}>
                    <Slider
                        {...mainNavSettings}
                        ref={mainNavRef}
                    >
                        {selectedDataSet.data.map(item => {
                            const temp = Math.random();
                            return <> {
                                <div key={temp} className={style.frameImage} onClick={(e) => onItemClick(e, { type: 'image', 'data': `${item.thumbnail}&${temp}` })}>
                                    <img src={`${item.thumbnail}&${temp}`} />
                                </div>
                            }</>
                        })}
                    </Slider>
                </div>
                <div className={style.thumbnailWrapper}>

                    <Slider {...navSettings} ref={navRef}>
                        {selectedDataSet.data.map(item => {
                            const temp = Math.random();
                            return <> {
                                <div key={temp} className={style.frameImage} onClick={(e) => onItemClick(e, { type: 'image', 'data': `${item.thumbnail}&${temp}` })}>
                                    <img src={`${item.thumbnail}&${temp}`} />
                                </div>
                            }</>
                        })}
                    </Slider>
                </div>
            </div>)}

        </div>
    );
};

export default ImageGallary;