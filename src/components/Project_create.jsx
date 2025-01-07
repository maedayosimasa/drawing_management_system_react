import React, { useState } from 'react';
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import {Box, TextField, Button, Typography, Paper, List, ListItem,
  ListItemText, Container, AppBar, Toolbar, Link as MuiLink 
} from '@mui/material';
import { Link } from "react-router-dom";

export const Project_create = () => {
    const [formData, setFormData] = useState({
        // user_id: '',
        project_name: '',
        finishing_table_name: '',
        floor_plan_name: '',
        machinery_equipment_diagram_all_name: '',
        bim_drawing_name: '',
        meeting_log_name: '',
    });

    const [files, setFiles] = useState({
        // user_id: null,
        project_name: null,
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
            finishing_table_name: "",
            floor_plan_name: "",
            machinery_equipment_diagram_all_name: "",
            bim_drawing_name: "",
            meeting_log_name: "",
          });
          setFiles({
            project_name: null,
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
  //console.log(getInputProps());
 
    const fieldLabels = {
      project_name: "プロジェクト名",
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
          

        <Container maxWidth="sm">
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
          variant="h4"
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {Object.keys(formData).map((key) => (
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#d4af37",
              "&:hover": { bgcolor: "#b8860b" },
              color: "#ffffff",
              fontWeight: "bold",
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
            disabled={uploading}
          >
            {uploading ? "アップロード中..." : "アップロード"}
          </Button>
        </Box>
      </Paper>
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
