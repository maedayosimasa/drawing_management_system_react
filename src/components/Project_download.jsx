import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Box, Button, Typography, AppBar, Toolbar, Link as MuiLink } from '@mui/material';
import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProjectArray from './Common/Project_array';

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
    const [selectedFiles, setSelectedFiles] = useState([]);  // ダウンロード用の画像情報の状態
    
    useEffect(() => {
        const finalResult = state?.filteredData || filteredData;
        if (finalResult) {
            setProjects(finalResult); // jsonFinalResultまたはstateから取得したデータを設定
        }
    }, [state, filteredData]);
<<<<<<< HEAD

     // 子コンポーネントからデータを受け取る
    const handleProjectData = (index, id, id_sub, name, imageURI, pdfURL, created_at, updated_at) => {
        // 必要に応じてプロジェクトデータを更新または処理
        const updatedProjects = [...projects];
        updatedProjects[index] = {
            index, id, id_sub, name, imageURI, pdfURL, created_at, updated_at
        };
        setProjects(updatedProjects);  // 更新されたプロジェクトデータを設定
    };
    
    useEffect(() => {
    console.log(" projects:", projects);
    }, [projects]);
    //配列に変換
    const images = Object.entries(projects);
    // const imeg_origin = Object.entries(projects);
    // const [index, images] = imeg_origin;
    //console.log(" index 配列に変換:", index);
=======
    
    useEffect(() => {
        console.log(" projects:", projects);
    }, [projects]);
    //配列に変換
    const images = Object.entries(projects);
>>>>>>> 845ab9605ac1ce57ea5ccf423921796e2ef50165
    console.log(" images 配列に変換:", images);

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
            const fileName = images[current][1].finishing_table_name || images[current][1].
            floor_plan_name || images[current][1].machinery_equipment_diagram_all_name || images[current][1].
            bim_drawing_name || images[current][1].meeting_log_name;
            setCurrentFileName(fileName);
            //setCurrentFileName(images[current]);
            setCurrentIndex(current);
        },
    };
    console.log("setCurrentFileName",setCurrentFileName);
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

    const handleImageSelect = (index, currentFileName, imageURI, pdfURL) => {
    // console.log("sImages image index:", index);
    // console.log("sImages currentFileName:", currentFileName);
    // console.log("sImages imageURI:", imageURI);
    
<<<<<<< HEAD
    setSelectedImages((prevImages) => {   //prevImages（前の画像のリスト）を取得
        //isSelected は現在選択されている画像かどうかをチェックするためのブール値
        //some メソッドは、配列内に1つでも条件に合致する要素
        //img.imageURI === imageURI で、現在選択した画像と同じ画像URIが存在するかどうかを調べます
=======
    // 各変数の値を確認
    console.log(" sImages", sImages);
    console.log("sImages image index:", index);
    console.log("sImages currentFileName:", currentFileName);
    console.log("sImages imageURI:", imageURI);
    
    setSelectedImages((prevImages) => {
>>>>>>> 845ab9605ac1ce57ea5ccf423921796e2ef50165
        const isSelected = prevImages.some(img => img.imageURI === imageURI);
        if (isSelected) {
            // 選択されている場合は削除
            return prevImages.filter(img => img.imageURI !== imageURI);
        } else {
            // 既存の prevImages 配列をそのままコピーし、後ろに新しい画像オブジェクトを追加します
            return [...prevImages, { currentFileName, imageURI , pdfURL }];
        }
    });
       // ダウンロード用の変数に画像情報を追加
    setSelectedFiles((prevFiles) => {
        const isFileExist = prevFiles.some(file => file.imageURI === imageURI);
        
        if (isFileExist) {
            // すでにダウンロードリストにある場合は削除
            return prevFiles.filter(file => file.imageURI !== imageURI);
        } else {
            // ダウンロードリストに追加
            return [...prevFiles, { currentFileName, imageURI, pdfURL }];
        }
    });
};
// const handleImageSelect = (index) => {   
//     const sImages = images[index];
//     const [currentFileName, imageURI] = sImages; // オブジェクトのプロパティを分ける
    
//     // 各変数の値を確認
//     console.log(" sImages", sImages);
//     console.log("sImages image index:", index);
//     console.log("sImages currentFileName:", currentFileName);
//     console.log("sImages imageURI:", imageURI);
    
//     setSelectedImages((prevImages) => {
//         const isSelected = prevImages.some(img => img.imageURI === imageURI);
//         if (isSelected) {
//             // 選択されている場合は削除
//             return prevImages.filter(img => img.imageURI !== imageURI);
//         } else {
//             // 新しい選択を追加
//             return [...prevImages, { currentFileName, imageURI }];
//         }
//     });
// };
//    const handleImageSelect = (index, currentFileName, imageURI, pdfURI) => {
//         // 選択されたPDF URI を状態にセット
//         setSelectedPdfURI(pdfURI);
//     };
// const handleDownload = (url) => {
//     const link = document.createElement("a"); // 1. ダウンロード用リンク要素を動的に作成
//     link.href = url;                          // 2. ダウンロード対象のURLを設定
//     link.download = url.split("/").pop();     // 3. ファイル名を取得して設定
//     link.click();                             // 4. クリックイベントを発生させ、ダウンロードを開始
// };
const handleDownload = async () => {
    selectedFiles.forEach(async (file) => {
        if (file.currentFileName && file.pdfURL) {
            try {
                // pdfURLからファイルを取得
                const response = await axios.get(file.pdfURL, {
                    responseType: 'blob',  // Blobとしてレスポンスを受け取る
                });

                // Blob URLを生成
                const url = window.URL.createObjectURL(new Blob([response.data]));
                
                // ダウンロード用のリンクを作成
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.currentFileName);  // ダウンロードするファイル名
                document.body.appendChild(link);
                link.click();  // ダウンロードを実行
                document.body.removeChild(link);  // 一時的に作成したリンクを削除
            } catch (error) {
                console.error('Download failed:', error);
                alert('ダウンロードに失敗しました');
            }
        } else {
            console.warn('No valid file name or URL found for download', file);
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
            //

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
<<<<<<< HEAD
                                    {/* <div>
            <h1>Project Download</h1>
            {projects.map(([index, projectData]) => (
                <div key={index}>
                    <ProjectArray
                        index={index}
                        projectData={projectData}
                        onProjectData={handleProjectData}
                    />
                   
                    {projectData && (
                        <div>
                            <p>Index: {index}</p>
                            <p>ID: {projectData.id}</p>
                            <p>Sub ID: {projectData.drawing_id || projectData.project_id}</p>
                            <p>Name: {projectData.name}</p>
                            <p>Image URI: {projectData.imageURI}</p>
                            <p>PDF URL: {projectData.pdfURL}</p>
                            <p>Created At: {projectData.created_at}</p>
                            <p>Updated At: {projectData.updated_at}</p>
                        </div>
                    )}
                </div>
            ))}
        </div> */}


                     {Array.isArray(images) &&images.map((imageData, index) => {
                                        // imageDataが配列の場合、内容を取り出す
                                        const imageContent = Array.isArray(imageData) ? imageData[1] : imageData;

                                        // 分割代入
                                        const {
                                            id,
                                            created_at,
                                            updated_at,
                                            finishing_table_name,
                                            finishing_table_view_path,
                                            finishing_table_pdf_path,
                                            floor_plan_name,
                                            floor_plan_view_path,
                                            floor_plan_pdf_path,
                                            machinery_equipment_diagram_all_name,
                                            machinery_equipment_diagram_all_view_path,
                                            machinery_equipment_diagram_all_pdf_path,
                                            bim_drawing_name,
                                            bim_drawing_view_path,
                                            bim_drawing_pdf_path,
                                            meeting_log_name,
                                            meeting_log_view_path,
                                            meeting_log_pdf_path,
                                        } = imageContent;

                                        // 必要な値を選択  ＊＊順序注意＊＊
                                        const currentFileName =
                                            finishing_table_name ||
                                            floor_plan_name ||
                                            machinery_equipment_diagram_all_name ||
                                            bim_drawing_name ||
                                            meeting_log_name;

                                        const thmbnal =
                                            finishing_table_view_path ||
                                            floor_plan_view_path ||
                                            machinery_equipment_diagram_all_view_path ||
                                            bim_drawing_view_path ||
                                            meeting_log_view_path;

                                        const pdf_path =
                                            finishing_table_pdf_path ||
                                            floor_plan_pdf_path ||
                                            machinery_equipment_diagram_all_pdf_path ||
                                            bim_drawing_pdf_path ||
                                            meeting_log_pdf_path;

                                        // sub_idの取得
                                        const sub_id = Array.isArray(imageData) ? imageData[0] : index;

                                        // ログの出力
                                        // console.log("imageData:", imageData);
                                        // console.log("id:", id);
                                        // console.log("sub_id:", sub_id);
                                        // console.log("currentFileName:", currentFileName);
                                        // console.log("thmbnal:", thmbnal);
                                        // console.log("index:", index);

                                        const baseUrl = "http://127.0.0.1:8000/storage/";
                                        const imageURI = `${baseUrl}${thmbnal}`;
                                        const pdfURL = `${baseUrl}${pdf_path}`;

                                        // console.log("imageURI:", imageURI);
                                        // console.log("pdfURI:", pdfURL);

                                        return (
                                            <div key={index}>
                                            <img
                                                src={imageURI} // ここでURIをsrcに設定
                                                alt={currentFileName} // 画像のalt属性にファイル名を使用
                                                style={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: "10px",
                                                transition: "filter 0.3s ease, border 0.3s ease",
                                                border: selectedImages.some(
                                                    (img) => img.imageURI === imageURI
                                                )
                                                    ? "5px solid #9B4DFF"
                                                    : "none",
                                                filter: selectedImages.some(
                                                    (img) => img.imageURI === imageURI
                                                )
                                                    ? "brightness(0.8)"
                                                    : "none",
                                                }}
                                                onClick={() => handleImageSelect(index, currentFileName, imageURI, pdfURL)} // ファイル名で選択を処理
                                            />
                                            </div>
                                        );
                                        })
                                        }
                                    </Slider>
=======
                            {images.map((imageData, index_main) => {
                                // imageData をファイル名 (currentFileName) と画像URI (imageURI) に分解
                                const [datas, index] = imageData;
                                
                                const [id, sub_id, currentFileName, thmbnal, pdfURI, created_at, update_t] = datas;
                                //currentFileName, imageURI の値をログに出力
                                console.log("imageData:", imageData);
                                console.log("id:", id);
                                console.log("sub_id:", sub_id);
                                console.log("currentFileName:", currentFileName);  // ファイル名
                                console.log("thmbnal:", thmbnal);
                                console.log("index:", index);
                                console.log("datas:", datas);
                                const baseUrl = "https://storage/thumbnails/logs";
                                // 日本語をそのまま組み込んでURLを生成
                                const imageURI = `${baseUrl}${thmbnal}`;
                                //const imageURI = thmbnal;
                                console.log("imageURI:", imageURI);  // 画像URI
                                return (
                                    
                                    <div key={index}>
                                     <img
                                    src={imageURI}  // ここでURIをsrcに設定
                                      alt={currentFileName}  // 画像のalt属性にファイル名を使用
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
>>>>>>> 845ab9605ac1ce57ea5ccf423921796e2ef50165


                        {/* ファイル名の表示部分 */}
                        <div style={{ textAlign: 'center', marginTop: '20px', color: "#d4af37" }}>
<<<<<<< HEAD
                         <strong>ファイル名:</strong> {currentFileName|| "未選択"}  {/* currentFileNameをここに表示 */}
=======
                         <strong>ファイル名:</strong> {images[currentIndex]?.[0] || "未選択"}  {/* currentFileNameをここに表示 */}
>>>>>>> 845ab9605ac1ce57ea5ccf423921796e2ef50165
                        </div>


                        <div style={{ textAlign: 'center', marginTop: '5px', color: "#d4af37" }}>
                            <strong>表示中:</strong> {currentIndex + 1} / {images.length}
                        </div>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2, // ボタン間の間隔
                                marginTop: 2, // 上部の余白
                            }}
                        >
                            <Button
                                variant="contained"
                                color="#d4af37"
                                size="small"
                                sx={{
                                    fontWeight: 'bold',
                                    boxShadow: 3, // 重厚感のある影
                                    '&:hover': {
                                        boxShadow: 6, // ホバー時に影を強調
                                    },
                                }}
                                onClick={handlePrev}
                            >
                                前へ
                            </Button>
                            <Button
                                variant="contained"
                                color="#d4af37"
                                size="small"
                                sx={{
                                    fontWeight: 'bold',
                                    boxShadow: 3,
                                    '&:hover': {
                                        boxShadow: 6,
                                    },
                                }}
                                onClick={handleNext}
                            >
                                次へ
                            </Button>
                            <Button
                                variant="#d4af37"
                                color={autoSlide ? "error" : "success"} // 自動スライドの状態で色を変える
                                size="small"
                                sx={{
                                    fontWeight: 'bold',
                                    boxShadow: 3,
                                    '&:hover': {
                                        boxShadow: 6,
                                    },
                                }}
                                onClick={toggleAutoSlide}
                            >
                                {autoSlide ? "自動スライド終了" : "自動スライド開始"}
                            </Button>
<<<<<<< HEAD
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                              // disabled={!pdfURL} // PDFが選択されていない場合ボタンを無効化
                                onClick={handleDownload}
                            >
                                ダウンロード
                            </Button>

=======
>>>>>>> 845ab9605ac1ce57ea5ccf423921796e2ef50165
                        </Box>

                        <div style={{ display: "flex", justifyContent: "center", marginTop: '20px', flexWrap: "wrap" }}>
                           {Array.isArray(images) &&images.map((imageData, index) => {
                                        // imageDataが配列の場合、内容を取り出す
                                        const imageContent = Array.isArray(imageData) ? imageData[1] : imageData;

                                        // 分割代入
                                        const {
                                            id,
                                            created_at,
                                            updated_at,
                                            finishing_table_name,
                                            finishing_table_view_path,
                                            finishing_table_pdf_path,
                                            floor_plan_name,
                                            floor_plan_view_path,
                                            floor_plan_pdf_path,
                                            machinery_equipment_diagram_all_name,
                                            machinery_equipment_diagram_all_view_path,
                                            machinery_equipment_diagram_all_pdf_path,
                                            bim_drawing_name,
                                            bim_drawing_view_path,
                                            bim_drawing_pdf_path,
                                            meeting_log_name,
                                            meeting_log_view_path,
                                            meeting_log_pdf_path,
                                        } = imageContent;

                                        // 必要な値を選択  ＊＊順序注意＊＊
                                        const currentFileName =
                                            finishing_table_name ||
                                            floor_plan_name ||
                                            machinery_equipment_diagram_all_name ||
                                            bim_drawing_name ||
                                            meeting_log_name;

                                        const thmbnal =
                                            finishing_table_view_path ||
                                            floor_plan_view_path ||
                                            machinery_equipment_diagram_all_view_path ||
                                            bim_drawing_view_path ||
                                            meeting_log_view_path;

                                        const pdf_path =
                                            finishing_table_pdf_path ||
                                            floor_plan_pdf_path ||
                                            machinery_equipment_diagram_all_pdf_path ||
                                            bim_drawing_pdf_path ||
                                            meeting_log_pdf_path;

                                        // sub_idの取得
                                        const sub_id = Array.isArray(imageData) ? imageData[0] : index;

                                        // ログの出力
                                        // console.log("imageData:", imageData);
                                        // console.log("id:", id);
                                        // console.log("sub_id:", sub_id);
                                        // console.log("currentFileName:", currentFileName);
                                        // console.log("thmbnal:", thmbnal);
                                        // console.log("index:", index);

                                           const baseUrl = "http://127.0.0.1:8000/storage/";
                                        const imageURI = `${baseUrl}${thmbnal}`;
                                        const pdfURL = `${baseUrl}${pdf_path}`;

                                        // console.log("imageURI:", imageURI);
                                        // console.log("pdfURI:", pdfURL);



                                return (
                                 <div
                                     key={index}
                                     // onClickでcurrentFileNameとimageURIを渡す
                                        onClick={() => handleImageSelect(index, currentFileName, imageURI, pdfURL)
                                    //    onClick={() => {
                                    //     handleClick(index);
                                    //    handleImageSelect(index);
                                   }
                                     style={{
                                           margin: "5px",
                                            cursor: "pointer",
                                             textAlign: "center",
                                      }}
                                     >
                                      <img
                                      src={imageURI}
                                            alt={currentFileName}
                                      style={{
                                           width: "80px",
                                           height: "auto",
                                            borderRadius: "5px",
                                             boxShadow: currentIndex === index ? "0 0 20px rgba(255, 77, 77, 0.7)" : "none",
                                             filter: selectedImages.some(img => img.imageURI === imageURI) ? "brightness(0.8)" : "none",
                                              border: selectedImages.some(img => img.imageURI === imageURI) ? "5px solid #9B4DFF" : "none",
                                      }}
                                        />
                                                 {/* サムネイル画像の名前   currentFileNameの真ん中の文字*/}
                                        <div style={{ fontSize: "14px", color: "#d4af37", marginTop: "5px" }}>
<<<<<<< HEAD
                                            {currentFileName.split('/').pop().split('.')[0]}  
=======
                                            {currentFileName.split('/').pop().split('.')[1]}  
>>>>>>> 845ab9605ac1ce57ea5ccf423921796e2ef50165
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
