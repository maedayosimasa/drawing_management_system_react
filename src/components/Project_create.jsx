import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import {Box, TextField, Button, Typography, Paper, List, ListItem,
  ListItemText, Container, AppBar, Toolbar, Link as MuiLink, FormControl, InputLabel,
  Select, MenuItem
} from '@mui/material';
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

//import { ProjectCreateForm } from './Project_create_form';

export const Project_create = () => {
    const [formData, setFormData] = useState({
        // user_id: '',
        project_name: '',
        address: '',
        client: '',
        construction_period_start: '',
        construction_period_end: '',
        completion_date: '',
        constract_amount: '',
        use: '',
        site_area:'',
        building_area: '',
        total_floor_area: '',
        strural: '',
        floor_number_underground: '',
        floor_number_ground:'',

        finishing_table_name: '',
      layout_diagram_name: '',
      floor_plan_name: '',
      elevation_name: '',
      sectional_name: '',
      design_drawing_all_name: '',

        structural_floor_plan_name: '',
      structural_elevation_name: '',
      structural_sectional_name: '',
      structural_frame_diagram_name: '',
      structural_diagram_all_name: '',

        machinery_equipment_diagram_all_name: '',
      electrical_equipment_diagram_all_name: '',

        bim_drawing_name: '',

        meeting_log_name: '',
      delivery_documents_name: '',
      bidding_documents_name: '',
      archived_photo_name: '',
      contract_name: '',
      management_documents_name: '',

    });

    const [files, setFiles] = useState({
        // user_id: null,
        project_name: null,
        address: null,
        client: null,
        construction_period_start: null,
        construction_period_end: null,
        completion_date: null,
        constract_amount: null,
        use: null,
        site_area:null,
        building_area: null,
        total_floor_area: null,
        strural: null,
        floor_number_underground: null,
        floor_number_ground:null,

        finishing_table_name: null,
      layout_diagram_name: null,
      floor_plan_name: null,
      elevation_name: null,
      sectional_name: null,
      design_drawing_all_name: null,

      structural_floor_plan_name: null,
      structural_elevation_name: null,
      structural_sectional_name: null,
      structural_frame_diagram_name: null,
      structural_diagram_all_name: null,

        machinery_equipment_diagram_name: null,
      electrical_equipment_diagram_all_name: null,

        bim_drawing_name: null,

        meeting_log_name: null,
      delivery_documents_name: null,
      bidding_documents_name: null,
      archived_photo_name: null,
      contract_name: null,
      management_documents_name: null,
    });
  //console.log(Object.keys(formData)[0]);

    // ファイル選択時のハンドラー 
    //ファイル選択時に、選択されたファイルをfileオブジェクトに保存します。
const handleFileChange = (name, selectedFiles) => {
  setFiles((prevFiles) => ({
    ...prevFiles,
    [name]:selectedFiles, // 選択されたファイルを状態に反映
  }));
   console.log("更新されたファイルpdf:", name, selectedFiles);
};

//console.log("受け入れたファイル:");
 // 使用されていない・・・要確認
    // フォームデータ変更時のハンドラー
    // テキスト入力の値が変更された際に、formDataを更新します。
   const handleChange = (e) => {
   // console.log("フォームデータ:", formData);
    const { name, value } = e.target; // e.targetからnameとvalueを分割代入
        setFormData((prevFormData) => ({
            ...prevFormData,
           [name]: value,
        }));
        console.log("更新されたフォームデータ:", name, value);
    };

  // 日付が変更されたときのハンドラ
  const handleDateChange = (event, key) => {
    const inputDate = event.target.value; // 入力された日付
   // console.log(`Updated日付 ${key} to`, inputDate); // 変更された日付をログに出力
    setFormData((prevDate) => ({
      ...prevDate, // 既存の値を保持
      [key]: inputDate, // nameに基づいて値を更新
    }));
    //console.log("更新されたフォーム日付:", key, inputDate);
  };

  //文字数字が入力されたときのハンドラ
  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    //console.log("更新されたフォーム文字:", key, value);
  };
  //Emterで次のフィールドにフォーカスが移動
  const handleKeyDown = (e, nextFieldId) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enterキーでフォーム送信や他のデフォルト動作を防ぐ
      const nextField = document.getElementById(nextFieldId); // 次のフィールドID
      if (nextField) {
        nextField.focus(); // フォーカスを次のフィールドに移動
      }
    }
  };


    // フォーム送信時のハンドラー 
    //フォームデータとファイルを収集し、サーバーに送信する処理
    const handleSubmit = async (e) => {
        e.preventDefault();  //ページのリロードを防ぎます。
        setUploading(true);

         console.log("送信時のフォームデータ:", formData); // フォームデータの確認
         console.log('Files:', files); // ファイルデータの確認
        
        //FormData オブジェクト作成:ブラウザのAPIで、キーと値のペアを簡単に送信できます。
        const data = new FormData();

      // formData から FormData にデータを追加
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`キー: ${key}, 値: ${value}`); // 各キーと値をログに出力
        data.append(key, value || ''); // 空の場合は空文字を設定
    });

    // files から FormData にファイルを追加
    Object.entries(files).forEach(([key, fileArray]) => {
        if (fileArray) {
            fileArray.forEach((file) => {
                data.append(key, file);
            });
        }
    });

    // デバッグ用
    console.log('--- FormData Entries ---');
    for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
    }

        console.log('data:', data); 
        const url = `${import.meta.env.VITE_API_URL}/api/Project_name/upload`;
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                },
            });
            console.log('Response:', response.data);
            alert(response.data.message || 'アップロードが成功しました！react');
          setUploading(false);
          // アップロード成功時にフォームとファイルの状態をリセット
          setFormData({
            project_name: "",
            address: "",
            client: "",
            construction_period_start: "",
            construction_period_end: "",
            completion_date: "",
            constract_amount: "",
            use: "",
            site_area:"",
            building_area: "",
            total_floor_area: "",
            strural: "",
            floor_number_underground: "",
            floor_number_ground:"",

            finishing_table_name: "",
            layout_diagram_name: "",
            floor_plan_name: "",
            elevation_name: "",
            sectional_name: "",
            design_drawing_all_name: "",

            structural_floor_plan_name: "",
            structural_elevation_name: "",
            structural_sectional_name: "",
            structural_frame_diagram_name: "",
            structural_diagram_all_name: "",

            machinery_equipment_diagram_all_name: "",
            electrical_equipment_diagram_all_name: "",

            bim_drawing_name: "",

            meeting_log_name: "",
            delivery_documents_name: "",
            bidding_documents_name: "",
            archived_photo_name: "",
            contract_name: "",
            management_documents_name: "",
          });
          setFiles({
            project_name: null,
            address: null,
            client: null,
            construction_period_start: null,
            construction_period_end: null,
            completion_date: null,
            constract_amount: null,
            use: null,
            site_area:null,
            building_area: null,
            total_floor_area: null,
            strural: null,
            floor_number_underground: null,
            floor_number_ground:null,

            finishing_table_name: null,
            layout_diagram_name: null,
            floor_plan_name: null,
            elevation_name: null,
            sectional_name: null,
            design_drawing_all_name: null,

            structural_floor_plan_name: null,
            structural_elevation_name: null,
            structural_sectional_name: null,
            structural_frame_diagram_name: null,
            structural_diagram_all_name: null,

            machinery_equipment_diagram_name: null,
            electrical_equipment_diagram_all_name: null,

            bim_drawing_name: null,

            meeting_log_file: null,
            delivery_documents_name: null,
            bidding_documents_name: null,
            archived_photo_name: null,
            contract_name: null,
            management_documents_name: null,
          });
        } catch (error) {
            console.error('Error:', error.response || error.message);
            alert('プロジェクトの作成に失敗しました。react');
        }

    };


  // // 初期値を設定
   const [uploading, setUploading] = useState(false);
 

      const onDrop = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  };

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

    const fieldLabels = {
      project_name: "プロジェクト名",
      address: "住 所",
      client: "施 主",
      construction_period_start: "工期 開始年月日",
      construction_period_end: "工期 終了年月日",
      completion_date: "完成年月日",
      constract_amount: "請負金額",
      use: "用 途",
      site_area:"敷地面積㎡",
      building_area: "建築面積 (㎡)",
      total_floor_area: "延べ床面積 (㎡)",
      strural: "構 造 (W,S,RC,SRC,その他)",
      floor_number_underground: "階数  地下   ( 階)",
      floor_number_ground:"階数  地上   ( 階)",

      finishing_table_name: "仕上げ表",
      layout_diagram_name: "配置図",
      floor_plan_name: "平面図",
      elevation_name: "立面図",
      sectional_name: "断面図",
      design_drawing_all_name: "意匠図All",

      structural_floor_plan_name: "平面図",
      structural_elevation_name: "立面図",
      structural_sectional_name: "断面図",
      structural_frame_diagram_name: "軸組図",
      structural_diagram_all_name: "構造図All",

      machinery_equipment_diagram_all_name: "機械設備設備図All",
      electrical_equipment_diagram_all_name: "電気設備図All",

      bim_drawing_name: "BIM図面Name",

      meeting_log_name: "打合せ簿Name",
      delivery_documents_name: "引き渡し書類",
      bidding_documents_name: "入札書類",
      archived_photo_name: "記録写真",
      contract_name: "契約書",
      management_documents_name: "管理書類",
    };
  
    
  const [height, setHeight] = useState(0);

  // 各Paperの参照を作成
  const architecturePaperRef = useRef(null);
  const structurePaperRef = useRef(null);

  useEffect(() => {
    // 建築図のPaper高さを取得し、初期化処理を追加
    const updateHeight = () => {
      if (architecturePaperRef.current) {
        // パディングやマージンを考慮して高さを調整
        const adjustedHeight = Math.max(architecturePaperRef.current.offsetHeight - 60, 0); // 高さが負にならないように調整
        setHeight(adjustedHeight);
      }
    };

    updateHeight(); // 初回実行
    window.addEventListener("resize", updateHeight); // ウィンドウサイズ変更時にも更新

    return () => {
      window.removeEventListener("resize", updateHeight); // クリーンアップ
    };
  }, []); // 初回レンダリング時とウィンドウリサイズ時に高さを取得

    return (
        <>
          <AppBar position="sticky" sx={{ bgcolor: "#d4af37" , height: "40px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "center" , alignItems: "center",height: "40px", padding: "0 10px"}}>
                  <MuiLink component={Link} to="/Project_select" sx={{ color: "#fff", margin: "0 30px" , mt: 1, mb: 3 }}>
                    選 択
                  </MuiLink>
                  {/* <MuiLink component={Link} to="/Project_create" sx={{ color: "#fff", margin: "0 20px" }}>
                    新規入力
                  </MuiLink> */}
                  <MuiLink component={Link} to="/Project_search" sx={{ color: "#fff", margin: "0 30px", mt: 1, mb: 3 }}>
                    検 索
                  </MuiLink>
                  <MuiLink component={Link} to="/Project_download" sx={{ color: "#fff", margin: "0 30px", mt: 1, mb: 3 }}>
                    download
                  </MuiLink>
                  <MuiLink component={Link} to="/" sx={{ color: "#fff", margin: "0 30px", mt: 1, mb: 3 }}>
                    一 覧 表
                  </MuiLink>
                </Toolbar>
              </AppBar>
          
<Container maxWidth={false} disableGutters>
  {/* アップロードボタン部分 */}
  <Paper
    elevation={12}  
    sx={{
      position: "sticky", // AppBarの直後に固定されるように設定
      top: "40px", // AppBarの高さに応じた位置を設定
      zIndex: 1000, // AppBarのzIndexより小さめに設定（AppBarが1200の場合）
      p: 2,
      borderRadius: 8,
      bgcolor: "#faf1d7",
      border: "1px solidrgb(180, 156, 80)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
      marginBottom: 2,
      display: "flex", justifyContent: "center", width: "100%"
    }}
  >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    <Button
     type="button"
                onClick={handleSubmit} // 発火点をButtonに限定
      variant="contained"
      sx={{
        bgcolor: "#e6b422",
        "&:hover": { bgcolor: "#b8860b" },
        color: "#ffffff",
        fontWeight: "bold",
        borderRadius: 3,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
         width: "100%", // ボタンの幅を40%に設定,
      }}
      disabled={uploading}
    >
      {uploading ? "アップロード中..." : "アップロード"}
    </Button>
            </Box>
  </Paper>

  {/* 並列表示のフォーム部分 */}
  <Grid container spacing={2} sx={{ width: "100%", margin: "0 auto" }}>
 
  {/* プロジェクト新規作成 */}
  <Grid item xs={3}>
      <Box sx={{ width: "100%", height: "100%" }}>
            <Paper
      elevation={12}
      sx={{
        p: 4,
        borderRadius: 8,
        bgcolor: "#faf1d7",
        border: "1px solid #d4af37",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#6b4f29",
          fontFamily: '"Times New Roman", serif',
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
          marginBottom: 4,
        }}
      >
        プロジェクト新規作成
      </Typography>
         <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
 
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[0]] || Object.keys(formData)[0]}
    </Typography>
    {/* プロジェクト名入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field1" // フィールドに移動するためのID
                    value={formData[Object.keys(formData)[0]] || ""} // formDataの最初のキーを使って表示
                    onChange={(e) => handleInputChange(e, Object.keys(formData)[0])} // 値を更新する関数
                      onKeyDown={(e) => handleKeyDown(e, 'field2')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="プロジェクト名入力"
                    type="text" // または "number"（数値専用の場合）
                  // InputLabelProps={{
                  //   style: { fontSize: '0.75rem' } // フォントサイズを小さくする
                   // }}
                    />
                     </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[1]] || Object.keys(formData)[1]}
    </Typography>
    {/* 住所入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field2"  // 次のフィールドに移動するためのID
                    value={formData[Object.keys(formData)[1]] || ""} // formDataの最初のキーを使って表示
                    onChange={(e) => handleInputChange(e, Object.keys(formData)[1])} // 値を更新する関数
                    //value={files[key] || ""} // 状態の値を表示
                            onKeyDown={(e) => handleKeyDown(e, 'field3')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="住所入力"
                    type="text" // または "number"（数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[2]] || Object.keys(formData)[2]}
    </Typography>
     {/* 施主入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field3"  // 次のフィールドに移動するためのID
                    value={formData[Object.keys(formData)[2]] || ""} // formDataの最初のキーを使って表示
                    onChange={(e) => handleInputChange(e, Object.keys(formData)[2])} // 値を更新する関数
                            onKeyDown={(e) => handleKeyDown(e, 'field4')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="施主名入力"
                    type="text" // または "number"（数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[3]] || Object.keys(formData)[3]}
    </Typography>
     {/* 工期開始入力 */}
     <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                   <TextField
                   //name={[Object.keys(formData)[0]]}
                   label="Choose a Date" // ラベルを設定
                   type="date" // カレンダー入力フォーム
                    value={formData[Object.keys(formData)[3]] !== undefined ? formData[Object.keys(formData)[3]] : ""} // 初期値が""に設定
                   onChange={(event) => handleDateChange(event, Object.keys(formData)[3])} // 日付変更時の処理
                   fullWidth // フル幅に設定
                   InputLabelProps={{
                   shrink: true, // ラベルが入力欄に重ならないよう設定
                  }}
                  />
                   </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[4]] || Object.keys(formData)[4]}
    </Typography>
         {/*工期終了 */}
     <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                   <TextField
                    //name={[Object.keys(formData)[0]]}
                   label="Choose a Date" // ラベルを設定
                   type="date" // カレンダー入力フォーム
                   value={formData[Object.keys(formData)[4]] !== undefined ? formData[Object.keys(formData)[4]] : ""} // 初期値が""に設定
                   onChange={(event) => handleDateChange(event, Object.keys(formData)[4])} // 日付変更時の処理
                   fullWidth // フル幅に設定
                   InputLabelProps={{
                   shrink: true, // ラベルが入力欄に重ならないよう設定
                  }}
                  />
                   </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[5]] || Object.keys(formData)[5]}
    </Typography>
         {/*完成年月日 */}
     <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                   <TextField
                  //  name={[Object.keys(formData)[0]]}
                   label="Choose a Date" // ラベルを設定
                   type="date" // カレンダー入力フォーム
                   value={formData[Object.keys(formData)[5]] !== undefined ? formData[Object.keys(formData)[5]] : ""} // 初期値が""に設定
                   onChange={(event) => handleDateChange(event, Object.keys(formData)[5])} // 日付変更時の処理
                   fullWidth // フル幅に設定
                   InputLabelProps={{
                   shrink: true, // ラベルが入力欄に重ならないよう設定
                  }}
                  />
                   </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[6]] || Object.keys(formData)[6]}
    </Typography>
    {/* 請負金額入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field4"  // 次のフィールドに移動するためのID
                            value={formData[Object.keys(formData)[6]] || ""} // formDataの最初のキーを使って表示
                            onChange={(e) => {
                              // 数字のみ入力、マイナス禁止の条件を追加
                              const inputValue = e.target.value;
                              const numericValue = inputValue.replace(/[^0-9]/g, ''); // 数字以外を除去
                              // 数字が入力されている場合にのみ、桁表示を行う
                              if (numericValue !== inputValue) {
                                return; // 数字以外が入力された場合は更新しない
                              }
                              handleInputChange(e, Object.keys(formData)[6]);
                            }} // 値を更新する関数
                            onKeyDown={(e) => handleKeyDown(e, 'field5')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="請負金額入力"
                            type="text" // または "text" （数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[7]] || Object.keys(formData)[7]}
    </Typography>
     {/* 用途入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field5"  // 次のフィールドに移動するためのID
                    value={formData[Object.keys(formData)[7]] || ""} // formDataの最初のキーを使って表示
                    onChange={(e) => handleInputChange(e, Object.keys(formData)[7])} // 値を更新する関数
                            onKeyDown={(e) => handleKeyDown(e, 'field6')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="用途入力"
                    type="text" // または "number"（数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[8]] || Object.keys(formData)[8]}
    </Typography>
    {/* 敷地面積入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field6"  // 次のフィールドに移動するためのID
                    value={formData[Object.keys(formData)[8]] || ""} // formDataの最初のキーを使って表示
                            onChange={(e) => {
                              // 数字のみ入力、マイナス禁止の条件を追加
                              const inputValue = e.target.value;
                              const numericValue = inputValue.replace(/[^0-9]/g, ''); // 数字以外を除去
                              // 数字が入力されている場合にのみ、桁表示を行う
                              if (numericValue !== inputValue) {
                                return; // 数字以外が入力された場合は更新しない
                              }
                      handleInputChange(e, Object.keys(formData)[8]);}} // 値を更新する関数
                            onKeyDown={(e) => handleKeyDown(e, 'field7')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="敷地面積入力"
                    type="text" // または "text"（数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[9]] || Object.keys(formData)[9]}
    </Typography>
     {/* 建築面積入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field7"  // 次のフィールドに移動するためのID
                            value={formData[Object.keys(formData)[9]] || ""} // formDataの最初のキーを使って表示
                            onChange={(e) => {
                              // 数字のみ入力、マイナス禁止の条件を追加
                              const inputValue = e.target.value;
                              const numericValue = inputValue.replace(/[^0-9]/g, ''); // 数字以外を除去
                              // 数字が入力されている場合にのみ、桁表示を行う
                              if (numericValue !== inputValue) {
                                return; // 数字以外が入力された場合は更新しない
                              }
                              handleInputChange(e, Object.keys(formData)[9]);
                            }} // 値を更新する関数
                            onKeyDown={(e) => handleKeyDown(e, 'field8')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="建築面積入力 "
                            type="text" // または "text"（数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[10]] || Object.keys(formData)[10]}
    </Typography>
     {/* 延べ床面積入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field8"  // 次のフィールドに移動するためのID
                            value={formData[Object.keys(formData)[10]] || ""} // formDataの最初のキーを使って表示
                            onChange={(e) => {
                              // 数字のみ入力、マイナス禁止の条件を追加
                              const inputValue = e.target.value;
                              const numericValue = inputValue.replace(/[^0-9]/g, ''); // 数字以外を除去
                              // 数字が入力されている場合にのみ、桁表示を行う
                              if (numericValue !== inputValue) {
                                return; // 数字以外が入力された場合は更新しない
                              }
                              handleInputChange(e, Object.keys(formData)[10]);
                            }} // 値を更新する関数
                            onKeyDown={(e) => handleKeyDown(e, 'field9')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="延べ床面積入力"
                    type="text" // または "number"（数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
  <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[11]] || Object.keys(formData)[11]}
    </Typography>
    {/* 構造入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                          <FormControl fullWidth>
                            <InputLabel id="structure-select-label">構造入力</InputLabel>
                            <Select
                              labelId="structure-select-label"
                              id="structure-select"
                              value={formData[Object.keys(formData)[11]] || ""} // formDataの最初のキーを使って表示
                              onChange={(e) => handleInputChange(e, Object.keys(formData)[11])} // 値を更新する関数
                              label="構造入力"
                            >
                              <MenuItem value="W造">W造</MenuItem>
                              <MenuItem value="S造">S造</MenuItem>
                              <MenuItem value="RC造">RC造</MenuItem>
                              <MenuItem value="SRC造">SRC造</MenuItem>
                              <MenuItem value="その他">その他</MenuItem>
                            </Select>
                          </FormControl>
                     </Paper>
              </Container>
  </div> <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[12]] || Object.keys(formData)[12]}
    </Typography>
    {/* 階数　地下入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field9"  // 次のフィールドに移動するためのID
                            value={formData[Object.keys(formData)[12]] || ""} // formDataの最初のキーを使って表示
                            onChange={(e) => {
                              // 数字のみ入力、マイナス禁止の条件を追加
                              const inputValue = e.target.value;
                              const numericValue = inputValue.replace(/[^0-9]/g, ''); // 数字以外を除去
                              // 数字が入力されている場合にのみ、桁表示を行う
                              if (numericValue !== inputValue) {
                                return; // 数字以外が入力された場合は更新しない
                              }
                              handleInputChange(e, Object.keys(formData)[12]);
                            }} // 値を更新する関数
                            onKeyDown={(e) => handleKeyDown(e, 'field10')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="階数  地下入力"
                            type="text" // または "text"（数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
   <div>
    <Typography variant="h8" gutterBottom>
      {fieldLabels[Object.keys(formData)[13]] || Object.keys(formData)[13]}
    </Typography>
    {/* 階数地上入力 */}
      <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <TextField
                            id="field10"  // 次のフィールドに移動するためのID
                            value={formData[Object.keys(formData)[13]] || ""} // formDataの最初のキーを使って表示
                            onChange={(e) => {
                              // 数字のみ入力、マイナス禁止の条件を追加
                              const inputValue = e.target.value;
                              const numericValue = inputValue.replace(/[^0-9]/g, ''); // 数字以外を除去
                              // 数字が入力されている場合にのみ、桁表示を行う
                              if (numericValue !== inputValue) {
                                return; // 数字以外が入力された場合は更新しない
                              }
                              handleInputChange(e, Object.keys(formData)[13]);
                            }} // 値を更新する関数
                            onKeyDown={(e) => handleKeyDown(e, 'field1')}  // Enterで次のフィールド（field〇）に移動
                    fullWidth
                    variant="outlined"
                    label="階数地上入力"
                            type="text"// または "text" （数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
</Box>


    </Paper>
    </Box>
  </Grid>
   {/* <Grid container spacing={4} sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%" }}> */}
<Grid item xs={9}>
   <Grid container spacing={2} wrap="wrap" sx={{ display: 'flex', flexWrap: 'wrap' }}>
  {/* 建築図新規作成 */}
  <Grid item xs={12} sm={6} md={4}>
     <Box sx={{ width: "100%", minHeight: 100 }}>
                  <Paper
            ref={architecturePaperRef}
            elevation={12}
            sx={{
              p: 4,
              borderRadius: 8,
              bgcolor: "#faf1d7",
              border: "1px solid #d4af37",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#6b4f29",
          fontFamily: '"Times New Roman", serif',
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
          marginBottom: 4,
        }}
      >
        建築図新規作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(14, 20)  // 14〜20個目のキー（インデックス13〜19）
          .map((key) => (
            <div key={key}>
              <Typography variant="h8" gutterBottom>
                {fieldLabels[key] || key}
              </Typography>
              <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <DropzoneField
                    name={key}
                    onFileChange={handleFileChange}
                    selectedFiles={files[key] || []}
                  />
                </Paper>
              </Container>
            </div>
          ))}
      </Box>
    </Paper>
    </Box>
  </Grid>

   {/* 構造図新規作成 */}
  <Grid item xs={12} sm={6} md={4}>
    <Box sx={{ width: "100%", minHeight: 100 }}>
                    <Paper
                      ref={structurePaperRef}
                      elevation={12}
                      sx={{
                        p: 4,
                        borderRadius: 8,
                        bgcolor: "#faf1d7",
                        border: "1px solid #d4af37",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                        height: `${height}px`, // 調整後の高さを適用
                      }}
                    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#6b4f29",
          fontFamily: '"Times New Roman", serif',
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
          marginBottom: 4,
        }}
      >
        構造図新規作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(20, 25)  // 16〜17個目のキー（インデックス15〜16）
          .map((key) => (
            <div key={key}>
              <Typography variant="h8" gutterBottom>
                {fieldLabels[key] || key}
              </Typography>
              <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <DropzoneField
                    name={key}
                    onFileChange={handleFileChange}
                    selectedFiles={files[key] || []}
                  />
                </Paper>
              </Container>
            </div>
          ))}
      </Box>
    </Paper>
    </Box>
  </Grid>
    {/* 機械設備電気設備図新規作成 */}
  <Grid item xs={12} sm={6} md={4}>
    <Box sx={{ width: "100%",minHeight: 100}}>
                    <Paper
                      ref={structurePaperRef}
                      elevation={12}
                      sx={{
                        p: 4,
                        borderRadius: 8,
                        bgcolor: "#faf1d7",
                        border: "1px solid #d4af37",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                        height: `${height}px`, // 調整後の高さを適用
                      }}
                    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#6b4f29",
          fontFamily: '"Times New Roman", serif',
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
          marginBottom: 4,
        }}
      >
        機械・電気設備図新規作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(25, 27)  // 17〜18個目のキー（インデックス16〜17）
          .map((key) => (
            <div key={key}>
              <Typography variant="h8" gutterBottom>
                {fieldLabels[key] || key}
              </Typography>
              <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <DropzoneField
                    name={key}
                    onFileChange={handleFileChange}
                    selectedFiles={files[key] || []}
                  />
                </Paper>
              </Container>
            </div>
          ))}
      </Box>
    </Paper>
    </Box>
  </Grid>
   {/* BIM図新規作成 */}
  <Grid item xs={12} sm={6} md={4}>
    <Box sx={{ width: "100%", minHeight: 100 }}>
                    <Paper
                      ref={structurePaperRef}
                      elevation={12}
                      sx={{
                        p: 4,
                        borderRadius: 8,
                        bgcolor: "#faf1d7",
                        border: "1px solid #d4af37",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                        height: `${height}px`, // 調整後の高さを適用
                      }}
                    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#6b4f29",
          fontFamily: '"Times New Roman", serif',
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
          marginBottom: 4,
        }}
      >
         BIM図新規作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(27, 28)  // 18〜19個目のキー（インデックス17〜18）
          .map((key) => (
            <div key={key}>
              <Typography variant="h8" gutterBottom>
                {fieldLabels[key] || key}
              </Typography>
              <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <DropzoneField
                    name={key}
                    onFileChange={handleFileChange}
                    selectedFiles={files[key] || []}
                  />
                </Paper>
              </Container>
            </div>
          ))}
      </Box>
    </Paper>
    </Box>
  </Grid>
 {/* 打合せ簿図新規作成 */}
  <Grid item xs={12} sm={6} md={4}>
    <Box sx={{ width: "100%",minHeight: 100 }}>
                    <Paper
                      ref={structurePaperRef}
                      elevation={12}
                      sx={{
                        p: 4,
                        borderRadius: 8,
                        bgcolor: "#faf1d7",
                        border: "1px solid #d4af37",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                        height: `${height}px`, // 調整後の高さを適用
                      }}
                    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#6b4f29",
          fontFamily: '"Times New Roman", serif',
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
          marginBottom: 4,
        }}
      >
        打合せ簿新規作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(28, 35)  // 17〜18個目のキー（インデックス18〜19）
          .map((key) => (
            <div key={key}>
              <Typography variant="h8" gutterBottom>
                {fieldLabels[key] || key}
              </Typography>
              <Container maxWidth="sm">
                <Paper
                  elevation={12}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "#ffffff",
                    border: "1px solid rgb(245, 244, 242)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <DropzoneField
                    name={key}
                    onFileChange={handleFileChange}
                    selectedFiles={files[key] || []}
                  />
                </Paper>
              </Container>
            </div>
          ))}
      </Box>
    </Paper>
                  </Box>
                  {/* <ProjectCreateForm /> */}
  </Grid>
</Grid>

</Grid>
   

          </Grid>
</Container>


        </>
    );
};

const DropzoneField = ({ name, onFileChange, selectedFiles }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => {
      const pdfFiles = acceptedFiles.filter((file) =>
        file.name.toLowerCase().endsWith(".pdf")
      );
      onFileChange(name, pdfFiles);
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #b8860b",
        borderRadius: "8px",
        padding: "8px",
        textAlign: "center",
        backgroundColor: isDragActive ? "#fff7e6" : "#f9f9f9",
        color: "#b8860b",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#fff4db" },
        minHeight: "24px",
      }}
    >
      <input {...getInputProps()} />
      {selectedFiles.length === 0 ? (
        <Typography
          variant="body2"
          sx={{
            color: "#b8860b",
            opacity: 0.6,
            fontSize: "0.7rem",
          }}
        >
          PDFファイルをドラッグ＆ドロップするか、クリックして選択してください
        </Typography>
      ) : (
        <List sx={{ margin: 0, padding: 0 }}>
          {selectedFiles.map((file, index) => (
            <ListItem key={index} sx={{ padding: "4px 0" }}>
              <ListItemText
                primary={file.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>

  );
};
