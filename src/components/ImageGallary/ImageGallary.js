import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import _ from 'lodash';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img_1 from '../../assets/images/backgrounds/210527_Classroom_Helper_background_5120x2880_1.png';
import img_2 from '../../assets/images/backgrounds/210527_Classroom_Helper_background_5120x2880_2.png';
import img_3 from '../../assets/images/backgrounds/210527_Classroom_Helper_background_5120x2880_3.png';

import style from './ImageGallary.module.scss';


const ImageGallary = ({ onSelect }) => {
    const dataset = [{ label:'Topic',data:[img_1,img_2,img_3]}];
    const { t, i18n } = useTranslation();
    const [dropdownOptions, setDropdownOptions] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedDataSet, setSelectedDataSet] = useState(null);
    const mainNavRef = useRef();
    const navRef = useRef();

    // const [mainNavSettings, setMainNavSettings] = useState({
    //     asNavFor: navRef,
    //     dots: false,
    //     lazyLoad: true,
    //     infinite: false,
    //     arrows:false,
    //     swipe: false,
    // });

    const [navSettings, setNavSettings] = useState({
        dots: false,
        lazyLoad: true,
        infinite: false,
        arrows: true,
        swipe: false,
        // speed: 500,
        // slidesToShow: 6,
        // slidesToScroll: 1,
        // initialSlide: 1,
        // asNavFor: mainNavRef,
        slidesToShow: 5,
        swipeToSlide: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });

    useEffect(() => {
        setDropdownOptions(_.map(dataset, 'label'));
        setSelectedDataSet(dataset[0]);
    }, []);
    useEffect(() => {
        if (selectedDataSet) {
            // selectedDataSet.data.map(item => {
            //     item.temp = item.temp ? item.temp : Math.random()
            // });
            console.log('selectedDataSet change ?? ', selectedDataSet.data[0] );
            setSelectedImage(selectedDataSet.data[0]);
        }
    }, [selectedDataSet]);

    // useEffect ( () => {
    //     if(navRef.current && navRef.current) {
    //         setMainNavSettings({
    //             ...mainNavSettings,
    //             asNavFor: navRef
    //         });
    //         setNavSettings({
    //             ...navSettings,
    //             asNavFor: mainNavRef
    //         });
    //     }
    // }, [mainNavRef, navRef]);

    useEffect(() => {
        if (dropdownOptions) {
            setSelectedOption(dropdownOptions[0]);
        }
    }, [dropdownOptions]);

    const onItemClick = (e, obj) => {
        onSelect && onSelect(obj);
        setSelectedImage(obj.data);
        e.stopPropagation();
        e.preventDefault();
    }

    const onDropdownSelect = e => {
        setSelectedDataSet(_.find(dataset, ['label', e.value]));
    }

    return (
        <div className={style.imageGallary}>
            <div className={style.dropdownWrapper}>
                <label>{t("background.category")}</label>
                {dropdownOptions && (<Dropdown options={dropdownOptions} onChange={onDropdownSelect} value={selectedOption} className={style.dropdown} placeholder="Select an option" />)}
            </div>

            {selectedDataSet && (<div className={style.imageWrapper}>
                <div className={style.previewWrapper}>
                    {/* <Slider
                        {...mainNavSettings}
                        ref={mainNavRef}
                    >
                        {selectedDataSet.data.map(item => {
                            const temp = Math.random();
                            item.temp = item.temp ? item.temp : temp;  
                            return (<div key={'Main__'+temp} className={style.frameImage} onClick={(e) => onItemClick(e, { type: 'image', 'data': `${item.thumbnail}&${temp}` })}>
                                    <img key={'Main_'+temp} src={`${item.thumbnail}&${temp}`} />
                                </div>)
                        })}
                    </Slider> */}
                    <img className={style.previewImage} src={`${selectedImage}`} />
                </div>
                <div className={style.thumbnailWrapper}>

                    <Slider {...navSettings} ref={navRef}>
                        {selectedDataSet.data.map((item,index) => {
                            return (<div key={'Thumb__' + index} className={style.frameImage} onClick={(e) => onItemClick(e, { type: 'image', 'data': `${item}` })}>
                                <img key={'Thumb_' +index} src={item} />
                            </div>)
                        })}
                    </Slider>
                </div>
            </div>)}

        </div>
    );
};

export default ImageGallary;