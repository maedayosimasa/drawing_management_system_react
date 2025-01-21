import React, { useState } from 'react';
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import {Box, TextField, Button, Typography, Paper, List, ListItem,
  ListItemText, Container, AppBar, Toolbar, Link as MuiLink, FormControl, InputLabel,
  Select, MenuItem
} from '@mui/material';
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export const Project_create = () => {
    const [formData, setFormData] = useState({
        // user_id: '',
        project_name: '',
        address: '',
        client: '',
        construction_period_start: '',
        construction_period_end: '',
        completion_date: '',
        contract_amount: '',
        use: '',
        site_area:'',
        building_area: '',
        total_floor_area: '',
        strural: '',
        floor_number_underground: '',
        floor_number_ground:'',
        finishing_table_name: '',
        floor_plan_name: '',
        machinery_equipment_diagram_all_name: '',
        bim_drawing_name: '',
        meeting_log_name: '',
    });

    const [files, setFiles] = useState({
        // user_id: null,
        project_name: null,
        address: null,
        client: null,
        construction_period_start: null,
        construction_period_end: null,
        completion_date: null,
        contract_amount: null,
        use: null,
        site_area:null,
        building_area: null,
        total_floor_area: null,
        strural: null,
        floor_number_underground: null,
        floor_number_ground:null,
        finishing_table_file: null,
        floor_plan_file: null,
        machinery_equipment_diagram_file: null,
        bim_drawing_file: null,
        meeting_log_file: null,
    });
    // ファイル選択時のハンドラー 
    //ファイル選択時に、選択されたファイルをfileオブジェクトに保存します。
const handleFileChange = (name, selectedFiles) => {
  setFiles((prevFiles) => ({
    ...prevFiles,
    [name]:selectedFiles, // 選択されたファイルを状態に反映
  }));
   console.log("更新されたファイル:", name, selectedFiles);
};
  // 日付が変更されたときのハンドラ
  const handleDateChange = (event) => {
    setFiles(event.target.value);
  };
  
  //文字数字が入力されたときのハンドラ
    const handleInputChange = (e, key) => {
    const { value } = e.target;
    setFiles((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

//console.log("受け入れたファイル:");

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
        const url = 'http://127.0.0.1:8000/api/Project_name/upload';
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
            contract_amount: "",
            use: "",
            site_area:"",
            building_area: "",
            total_floor_area: "",
            strural: "",
            floor_number_underground: "",
            floor_number_ground:"",
            finishing_table_name: "",
            floor_plan_name: "",
            machinery_equipment_diagram_all_name: "",
            bim_drawing_name: "",
            meeting_log_name: "",
          });
          setFiles({
            project_name: null,
            address: null,
            client: null,
            construction_period_start: null,
            construction_period_end: null,
            completion_date: null,
            contract_amount: null,
            use: null,
            site_area:null,
            building_area: null,
            total_floor_area: null,
            strural: null,
            floor_number_underground: null,
            floor_number_ground:null,
            finishing_table_file: null,
            floor_plan_file: null,
            machinery_equipment_diagram_file: null,
            bim_drawing_file: null,
            meeting_log_file: null,
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
      contract_amount: "請負金額",
      use: "用 途",
      site_area:"敷地面積㎡",
      building_area: "建築面積 (㎡)",
      total_floor_area: "延べ床面積 (㎡)",
      strural: "構 造 (W,S,RC,SRC,その他)",
      floor_number_underground: "階数  地下   ( 階)",
      floor_number_ground:"階数  地上   ( 階)",
      finishing_table_name: "仕上げ表Name",
      floor_plan_name: "平面図Name",
      machinery_equipment_diagram_all_name: "機械設備設備図Name",
      bim_drawing_name: "BIM図面Name",
      meeting_log_name: "打合せ簿Name",
    };
  
  
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
    <Button
      type="submit"
      variant="contained"
      sx={{
        bgcolor: "#e6b422",
        "&:hover": { bgcolor: "#b8860b" },
        color: "#ffffff",
        fontWeight: "bold",
        borderRadius: 3,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
         width: "40%", // ボタンの幅を40%に設定,
      }}
      disabled={uploading}
    >
      {uploading ? "アップロード中..." : "アップロード"}
    </Button>
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
                    //name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
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
                   // name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
                    //value={files[key] || ""} // 状態の値を表示
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
                    //name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
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
                   // name={key}
                   label="Choose a Date" // ラベルを設定
                   type="date" // カレンダー入力フォーム
                   value={files} // 状態と連動
                   onChange={handleDateChange} // 日付変更時の処理
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
                    //name={key}
                   label="Choose a Date" // ラベルを設定
                   type="date" // カレンダー入力フォーム
                   value={files} // 状態と連動
                   onChange={handleDateChange} // 日付変更時の処理
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
                  //  name={key}
                   label="Choose a Date" // ラベルを設定
                   type="date" // カレンダー入力フォーム
                   value={files} // 状態と連動
                   onChange={handleDateChange} // 日付変更時の処理
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
                   // name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
                    fullWidth
                    variant="outlined"
                    label="請負金額入力"
                            type="number" // または "text" （数値専用の場合）
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
                   // name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
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
                   // name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
                    fullWidth
                    variant="outlined"
                    label="敷地面積入力"
                            type="number" // または "text"（数値専用の場合）
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
                   // name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
                    fullWidth
                    variant="outlined"
                    label="建築面積入力 "
                            type="number" // または "text"（数値専用の場合）
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
                   // name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
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
                              //value={formData[key] || ""} // 初期値または既存の値
                              onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
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
                   // name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
                    fullWidth
                    variant="outlined"
                    label="階数  地下入力"
                            type="number" // または "text"（数値専用の場合）
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
                   // name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
                    fullWidth
                    variant="outlined"
                    label="階数地上入力"
                            type="number"// または "text" （数値専用の場合）
                    />
                     </Paper>
              </Container>
  </div>
</Box>




      {/* <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(0, 13)  // 1〜14個目のキー（インデックス0〜13）
        //  .filter((_, index) => ![3, 4, 5, 6, 10].includes(index)) // インデックス3, 4, 5, 6, 10を除外
          .map((key) => ( */}



            
            {/* <div key={key}>
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
                  <TextField
                    name={key}
                    //value={values[key] || ""} // 初期値または既存の値
                    onChange={(e) => handleDateChange(e, key)} // 値を更新する関数
                    fullWidth
                    variant="outlined"
                    label="入力してください"
                    type="text" // または "number"（数値専用の場合）
                    /> */}
                  {/* カレンダー入力 */}
                   {/* <TextField
                    name={key}
                   label="Choose a Date" // ラベルを設定
                   type="date" // カレンダー入力フォーム
                   value={files} // 状態と連動
                   onChange={handleDateChange} // 日付変更時の処理
                   fullWidth // フル幅に設定
                   InputLabelProps={{
                   shrink: true, // ラベルが入力欄に重ならないよう設定
                  }}
                  /> */}
                  {/* <DropzoneField
                    name={key}
                    onFileChange={handleFileChange}
                    selectedFiles={files[key] || []}
                  /> */}
{/*                    
                      </Paper>
              </Container>
            </div> */}
          {/* ))} */}
      {/* </Box> */}
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
          .slice(14, 15)  // 14〜15個目のキー（インデックス14〜15）
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
        構造図新規作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(15, 16)  // 16〜17個目のキー（インデックス15〜16）
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
        機械・電気設備図新規作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(16, 17)  // 17〜18個目のキー（インデックス16〜17）
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
         BIM図新規作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(17, 18)  // 18〜19個目のキー（インデックス17〜18）
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
        打合せ簿新規作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.keys(formData)
          .slice(18, 19)  // 17〜18個目のキー（インデックス18〜19）
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
