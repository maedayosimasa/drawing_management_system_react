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
    //const [currentFileName, setCurrentFileName] = useState(images[0]);
    const [currentFileName, setCurrentFileName] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(1000);// 初期幅を設定
    const [containerHeight, setContainerHeight] = useState(400);// 初期高さを設定
    const sliderRef = useRef(null);
    const { state } = useLocation(); // stateを受け取る
    
    useEffect(() => {
        const finalResult = state?.filteredData || filteredData;
        if (finalResult) {
            setProjects(finalResult); // jsonFinalResultまたはstateから取得したデータを設定
        }
    }, [state, filteredData]);

    useEffect(() => {
      //  console.log(" projects:", projects);
    }, [projects]);
    //配列に変換
    const images = Object.entries(projects);

//     const images = Object.values(projects).map(project => {
//         const viewPath = Object.values(project).find(value => value.includes("view_path"));
//         return viewPath || null; // view_pathが見つかればそれを返す
//     }).filter(uri => uri); // 空の値を除外
//    console.log("images",images );
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
        const handleClick = (index) => {    //クリックしたところに移動する
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
        setAutoSlide(false);
        setTimeout(() => {
            setAutoSlide(true);
        }, 5000);
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
    const sImages = images[index];
    const [currentFileName, imageURI] = sImages; // オブジェクトのプロパティを分ける
    
    // 各変数の値を確認
    console.log("selected image index:", index);
    console.log("currentFileName:", currentFileName);
    console.log("imageURI:", imageURI);
    
    setSelectedImages((prevImages) => {
        const isSelected = prevImages.some(img => img.imageURI === imageURI);
        if (isSelected) {
            // 選択されている場合は削除
            return prevImages.filter(img => img.imageURI !== imageURI);
        } else {
            // 新しい選択を追加
            return [...prevImages, { currentFileName, imageURI }];
        }
    });
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
                            {images.map((imageData, index) => {
                                // imageData をファイル名 (currentFileName) と画像URI (imageURI) に分解
                                const [currentFileName, imageURI] = imageData;

                                // currentFileName, imageURI の値をログに出力
                                // console.log("imageData:", imageData);
                                // console.log("currentFileName:", currentFileName);  // ファイル名
                                // console.log("imageURI:", imageURI);  // 画像URI
                                // console.log("indx:", index);

                                return (
                                    
                                    <div key={index}>
                                      <img
    src={imageURI}  // ここでURIをsrcに設定
    alt={index}  // 画像のalt属性にファイル名を使用
    style={{
        width: "100%",
        height: "auto",
        borderRadius: "10px",
        transition: "filter 0.3s ease, border 0.3s ease",
        border: selectedImages.some(img => img.imageURI === imageURI) ? "5px solid #9B4DFF" : "none",  // 修正
        filter: selectedImages.some(img => img.imageURI === imageURI) ? "brightness(0.8)" : "none", // 修正
    }}
    onClick={() => handleImageSelect(index)}  // ファイル名で選択を処理
/>

                                    </div>
                                );
                            })}
                        </Slider>

                        {/* ファイル名の表示部分 */}
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <strong>ファイル名:</strong> {images[currentIndex]?.[0] || "未選択"}  {/* currentFileNameをここに表示 */}
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
                            {images.map((imageData, index) => {
                                const [currentFileName, imageURI] = imageData; // ファイル名とURLを取得

                                return (
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
                                      src={imageURI}
                                       alt={`thumbnail-${index}`}
                                      style={{
                                           width: "80px",
                                           height: "auto",
                                            borderRadius: "5px",
                                             boxShadow: currentIndex === index ? "0 0 20px rgba(255, 77, 77, 0.7)" : "none",
                                             filter: selectedImages.some(img => img.imageURI === imageURI) ? "brightness(0.8)" : "none",
                                              border: selectedImages.some(img => img.imageURI === imageURI) ? "5px solid #9B4DFF" : "none",
                                      }}
                                        />

                                          <div style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}>
                                             {imageURI.split('/').pop()}
                                          </div>
                                    </div>
                                );
                            })}
                        </div>
                    </FormContainer>
                </ResizableBox>
            </div>
        </>
    );
};
