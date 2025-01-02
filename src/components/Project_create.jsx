import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Container, AppBar, Toolbar, Link as MuiLink 
} from '@mui/material';
import { Link } from "react-router-dom";

export const Project_create = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        project_name: '',
        finishing_table_name: '',
        floor_plan_name: '',
        machinery_equipment_diagram_all_name: '',
        bim_drawing_name: '',
        meeting_log_name: '',
    });

    const [file, setFile] = useState({
        user_id: null,
        project_name: null,
        finishing_table_file: null,
        floor_plan_file: null,
        machinery_equipment_diagram_file: null,
        bim_drawing_file: null,
        meeting_log_file: null,
    });
    const [uploading, setUploading] = useState(false);

    // ファイル選択時のハンドラー 
    //ファイル選択時に、選択されたファイルをfileオブジェクトに保存します。
    const handleFileChange = (e) => {
        setFile((prevFile) => ({
            ...prevFile,
            [e.target.name]: e.target.files[0], // 選択されたファイルをセット
        }));
    };

    // フォームデータ変更時のハンドラー
    // テキスト入力の値が変更された際に、formDataを更新します。
    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    // フォーム送信時のハンドラー 
    //フォームデータとファイルを収集し、サーバーに送信する処理
    const handleSubmit = async (e) => {
        e.preventDefault();  //ページのリロードを防ぎます。

        console.log('Form Data:', formData); // フォームデータの確認
        console.log('Files:', file); // ファイルデータの確認
        //FormData オブジェクト作成:ブラウザのAPIで、キーと値のペアを簡単に送信できます。
        const data = new FormData();

        // ファイルデータをFormDataに追加
        //ファイルが選択されている場合のみFormDataに追加。
        for (const key in file) {
            if (file[key]) {
                data.append(key, file[key] || '');// ファイルが空でも空文字を追加
            }
        }

        // 他のフォームデータもFormDataに追加
        for (const key in formData) {
            data.append(key, formData[key] || '');// 空でも空文字を追加
        }

        // FormData内容をデバッグ用にコンソールに表示
        for (let pair of data.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        // setUploading(true);
        // alert('FormDataを確認しました。APIには送信されません。');
        // setUploading(false);

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
        } catch (error) {
            console.error('Error:', error.response || error.message);
            alert('プロジェクトの作成に失敗しました。react');
        }

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
            {/* <div>
                <h3>update</h3>
                <Link to="/Project_search">searchに移動する</Link><br />
                <Link to="/">一覧表 に移動する</Link>
            </div> */}

        <Container maxWidth="sm">
            <Paper
                elevation={12}
                sx={{
                    p: 4,
                    borderRadius: 8,
                    bgcolor: '#faf1d7',
                    border: '1px solid #d4af37',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: '#6b4f29',
                        fontFamily: '"Times New Roman", serif',
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
                        marginBottom: 4,
                    }}
                >
                    プロジェクト新規作成
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    {[
                        //{ label: 'User ID', name: 'user_id' },
                        { label: 'プロジェクト名', name: 'project_name' },
                        { label: '仕上げ表 Name', name: 'finishing_table_name' },
                        { label: '平面図 Name', name: 'floor_plan_name' },
                        { label: '機械設備図 All Name', name: 'machinery_equipment_diagram_all_name' },
                        { label: 'BIM Name', name: 'bim_drawing_name' },
                        { label: '打合せ簿 Name', name: 'meeting_log_name' },
                    ].map((field) => (
                        <div key={field.name}>

                            <Typography  >{field.label}</Typography>
                            <Container maxWidth="sm">
                                <Paper
                                    elevation={12}
                                    sx={{
                                        p: 1,
                                        borderRadius: 2,
                                        bgcolor: '#ffffff',
                                        border: '1px solidrgb(245, 244, 242)',
                                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                                    }}
                                >
                                    <input
                                        type="file"
                                        name={field.name}
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        multiple
                                        autoFocus
                                        className="file-button block"
                                        style={{
                                            marginTop: '0px',
                                            width: '100%',
                                            color: '#b8860b',
                                        }}
                                    /></Paper></Container>
                        </div>
                    ))}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: '#d4af37',
                            '&:hover': { bgcolor: '#b8860b' },
                            color: '#ffffff',
                            fontWeight: 'bold',
                            borderRadius: 3,
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        }}
                        disabled={uploading}
                    >
                        {uploading ? 'アップロード中...' : 'アップロード'}
                    </Button>
                </Box>
            </Paper>
        </Container>
        </>
    );
};

