
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Link } from "react-router-dom";

const Title = styled(Typography)`
  text-align: center;
  font-size: 2.5rem;
  color: #b38b5d;
  margin-top: 40px;
  font-weight: bold;
  
  letter-spacing: 3px;
  text-shadow: 3px 3px 6px rgba(184, 134, 11, 0.5);
  font-family: 'Garamond', serif;
`;
const FormContainer = styled(Box)`
  max-width: none;
  margin: 50px auto;
  padding: 30px;
  background-color: #faf1d7;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  border: 0.5px solid #d4af37;
  resize: both;
  overflow: hidden;
`;
const ResultContainer = styled(Box)`
  max-width: none;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: 0.5px solid #d4af37;
`;
const SubmitButton = styled(Button)`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #d4af37;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #b38b5d;
  }
`;
export const Project_download = () => {
    const images = [
        "/jpg/A_1階平面図.jpg",
        "/jpg/A_2階平面図.jpg",
        "/jpg/A_3階平面図.jpg",
        "/jpg/A_配置図.jpg",
        "/jpg/B_1階平面図.jpg",
        "/jpg/B_2階平面図.jpg",
        "/jpg/B_3階平面図.jpg",
        "/jpg/B_配置図.jpg",
        "/jpg/A_1階平面図.jpg",
        "/jpg/A_2階平面図.jpg",
        "/jpg/A_3階平面図.jpg",
        "/jpg/A_配置図.jpg",
        "/jpe/B_1階平面図.jpg",
        "/jpg/B_2階平面図.jpg",
        "/jpg/B_3階平面図.jpg",
        "/jpg/B_配置図.jpg",
    ];
    const sliderRef = useRef(null);
    const [autoSlide, setAutoSlide] = useState(true);
    const [currentFileName, setCurrentFileName] = useState(images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const [containerWidth, setContainerWidth] = useState(800); // 初期幅を設定
    const [containerHeight, setContainerHeight] = useState(400); // 初期高さを設定
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        afterChange: (current) => {
            setCurrentFileName(images[current]);
            setCurrentIndex(current);
        },
    };
    useEffect(() => {
        let slideInterval;
        if (autoSlide && sliderRef.current) {
            slideInterval = setInterval(() => {
                if (sliderRef.current) {
                    sliderRef.current.slickNext();
                }
            }, 5000);
        }
        return () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        };
    }, [autoSlide]);
    const handleClick = (index) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
        setAutoSlide(false);
        setTimeout(() => {
            setAutoSlide(true);
        }, 5000);
    };
    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
        setAutoSlide(false);
    };
    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
        setAutoSlide(false);
    };
    const toggleAutoSlide = () => {
        setAutoSlide((prev) => !prev);
    };
    const handleImageSelect = (index) => {
        const selectedImage = images[index];
        setSelectedImages((prevImages) => {
            if (prevImages.includes(selectedImage)) {
                return prevImages.filter((img) => img !== selectedImage);
            } else {
                return [...prevImages, selectedImage];
            }
        });
    };
    return (
        <>
<div>
        <h3>一覧表</h3>
        <Link to="/Project_create">createに移動する</Link><br />
        <Link to="/Project_search">searchに移動する</Link><br />
        <Link to="/Project_show">showに移動する</Link>
      </div>

        <div style={{ width: '100%' }}>
            {/* <Draggable position={position} onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}> */}
            <div style={{ width: '100%' }}>
                <ResizableBox
                    width={containerWidth}
                    height={containerHeight}
                    axis="both"
                    minConstraints={[300, 200]} // 最小幅と最小高さ
                    maxConstraints={[1800, 800]} // 最大幅と最大高さ
                    onResizeStop={(e, data) => {
                        setContainerWidth(data.size.width);
                        setContainerHeight(data.size.height);
                    }}
                    onResize={(e, data) => {
                        setContainerWidth(data.size.width);
                        setContainerHeight(data.size.height);
                    }}
                >
                    <div>
                        {/* <Title>画像スライダー</Title> */}
                        <FormContainer>
                            <Slider ref={sliderRef} {...settings}>
                                {images.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={image}
                                            alt={`slide-${index}`}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: "10px",
                                                transition: "filter 0.3s ease, border 0.3s ease",
                                                border: selectedImages.includes(image)
                                                    ? "5px solid #9B4DFF"
                                                    : "none",
                                                filter: selectedImages.includes(image) ? "brightness(0.8)" : "none",
                                            }}
                                            onClick={() => handleImageSelect(index)}
                                        />
                                    </div>
                                ))}
                            </Slider>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <strong>ファイル名:</strong> {currentFileName.split('/').pop()}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <strong>表示中:</strong> {currentIndex + 1} / {images.length}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button onClick={handlePrev}>前へ</button>
                                <button onClick={handleNext}>次へ</button>
                                <button onClick={toggleAutoSlide}>
                                    {autoSlide ? "自動スライド終了" : "自動スライド開始"}
                                </button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: '20px', flexWrap: "wrap" }}>
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            handleClick(index);
                                            handleImageSelect(index);
                                        }}
                                        style={{
                                            margin: "5px",
                                            cursor: "pointer",
                                            textAlign: "center",
                                        }}
                                    >
                                        <img
                                            src={image}
                                            alt={`thumbnail-${index}`}
                                            style={{
                                                width: "80px",
                                                height: "auto",
                                                borderRadius: "5px",
                                                boxShadow: currentIndex === index ? "0 0 20px rgba(255, 77, 77, 0.7)" : "none",
                                                filter: selectedImages.includes(image) ? "brightness(0.8)" : "none",
                                                border: selectedImages.includes(image) ? "5px solid #9B4DFF" : "none",
                                            }}
                                        />
                                        <div style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}>
                                            {image.split('/').pop()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FormContainer>
                    </div>
                </ResizableBox>
            </div>
            {/* </Draggable> */}
        </div>
        </>
    );
};

