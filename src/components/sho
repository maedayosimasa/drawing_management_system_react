import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography, AppBar, Toolbar, Link as MuiLink } from '@mui/material';
import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Styled components
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

export const Project_download = ({ filteredData }) => {
    const [projects, setProjects] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [autoSlide, setAutoSlide] = useState(true);
    const [currentFileName, setCurrentFileName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(800);
    const [containerHeight, setContainerHeight] = useState(400);
    const sliderRef = useRef(null);
    const { state } = useLocation(); // stateを受け取る
    
    useEffect(() => {
        const finalResult = state?.filteredData || filteredData;
        if (finalResult) {
            setProjects(finalResult); // jsonFinalResultまたはstateから取得したデータを設定
        }
    }, [state, filteredData]);

    useEffect(() => {
        console.log(" projects:", projects);
    }, [projects]);
    //配列に変換
    const images = Object.entries(projects);

//     const images = Object.values(projects).map(project => {
//         const viewPath = Object.values(project).find(value => value.includes("view_path"));
//         return viewPath || null; // view_pathが見つかればそれを返す
//     }).filter(uri => uri); // 空の値を除外
 console.log("images",images );
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

    const handleClick = (index) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
        setAutoSlide(false);
        setTimeout(() => {
            setAutoSlide(true);
        }, 5000);
    };

    return (
        <>
            <AppBar position="sticky" sx={{ bgcolor: "#d4af37" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                    <MuiLink component={Link} to="/Project_select" sx={{ color: "#fff", margin: "0 20px" }}>
                        選 択
                    </MuiLink>
                    <MuiLink component={Link} to="/Project_create" sx={{ color: "#fff", margin: "0 20px" }}>
                        新規入力
                    </MuiLink>
                    <MuiLink component={Link} to="/Project_search" sx={{ color: "#fff", margin: "0 20px" }}>
                        検 索
                    </MuiLink>
                    <MuiLink component={Link} to="/Project_show" sx={{ color: "#fff", margin: "0 20px" }}>
                        表 示
                    </MuiLink>
                    <MuiLink component={Link} to="/" sx={{ color: "#fff", margin: "0 20px" }}>
                        一 覧 表
                    </MuiLink>
                </Toolbar>
            </AppBar>
            <div style={{ width: '100%' }}>
                <ResizableBox
                    width={containerWidth}
                    height={containerHeight}
                    axis="both"
                    minConstraints={[300, 200]}
                    maxConstraints={[1800, 800]}
                    onResizeStop={(e, data) => {
                        setContainerWidth(data.size.width);
                        setContainerHeight(data.size.height);
                    }}
                    onResize={(e, data) => {
                        setContainerWidth(data.size.width);
                        setContainerHeight(data.size.height);
                    }}
                >
                    <FormContainer>
                        <Slider ref={sliderRef} {...settings}>
                            {images.map((imageURI, index) => (
                                <div key={index}>
                                    <img
                                        src={imageURI}  // ここでURIをsrcに設定
                                        alt={`slide-${index}`}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            borderRadius: "10px",
                                            transition: "filter 0.3s ease, border 0.3s ease",
                                            border: selectedImages.includes(imageURI) ? "5px solid #9B4DFF" : "none",
                                            filter: selectedImages.includes(imageURI) ? "brightness(0.8)" : "none",
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
                            {images.map((imageURI, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        handleClick(index);
                                        handleImageSelect(index);
                                    }}
                                    style={{
                                        margin: "5px",
                                        cursor: "pointer",
                                        border: selectedImages.includes(imageURI) ? "5px solid #9B4DFF" : "none",
                                    }}
                                >
                                    <img
                                        src={imageURI}
                                        alt={`thumb-${index}`}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                            transition: "border 0.3s ease",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </FormContainer>
                </ResizableBox>
            </div>
        </>
    );
};
