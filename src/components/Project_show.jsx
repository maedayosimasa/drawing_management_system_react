import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Container, Button, Typography, Box, List, ListItem, ListItemText, Paper, AppBar, Toolbar, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Project_show = () => {
  const [projectData, setProjectData] = useState({
    id: "",
    project_name: "",
    finishing_table_name: "",
    structural_floor_plan_name: "",
    machinery_equipment_diagram_all_name: "",
    bim_drawing_name: "",
    meeting_log_name: "",
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const project_name = location.state?.project_name;

  useEffect(() => {
    if (project_name && typeof project_name === "object") {
      setProjectData({
        id: project_name.id || "",
        project_name: project_name.project_name || "",
        finishing_table_name: project_name.drawing?.design_drawing?.finishing_table_name || "",
        structural_floor_plan_name: project_name.drawing?.structural_diagram?.structural_floor_plan_name || "",
        machinery_equipment_diagram_all_name: project_name.drawing?.equipment_diagram?.machinery_equipment_diagram_all_name || "",
        bim_drawing_name: project_name.drawing?.bim_drawing?.bim_drawing_name || "",
        meeting_log_name: project_name.meeting_log?.meeting_log_name || "",
      });
      setLoading(false);
    } else {
      setError("プロジェクトデータが存在しないか、形式が正しくありません。");
      setLoading(false);
    }
  }, [project_name, location.state]);

  const [files, setFiles] = useState({});
  const [isEditable, setIsEditable] = useState({
    project_name: false,
    finishing_table_name: false,
    structural_floor_plan_name: false,
    machinery_equipment_diagram_all_name: false,
    bim_drawing_name: false,
    meeting_log_name: false,
  });

  const handleFileChange = (name, selectedFiles) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: selectedFiles,
    }));
  };
  console.log(setFiles);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);

    // PDFファイルのみを抽出
    const filteredFiles = Object.keys(files).reduce((acc, key) => {
      const pdfFiles = files[key]?.filter((file) => file.name.toLowerCase().endsWith(".pdf")) || [];
      if (pdfFiles.length > 0) {
        acc[key] = pdfFiles;
      }
      return acc;
    }, {});

    // ファイルを送信するデータに変換
    const formData = new FormData();
    console.log("projectData.id", projectData.id);
    // project_name.id を formData に追加
    if (projectData.id) {
      formData.append("id", projectData.id); // idを追加
    } else {
      console.error("project_name.id が存在しません");
    }

    Object.keys(filteredFiles).forEach((key) => {
      filteredFiles[key].forEach((file) => {
        formData.append(key, file);
      });
    });

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/Project_name/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("更新が成功しました！");
        setUploading(false);
      })
      .catch((error) => {
        console.error("更新エラー:", error);
        alert("更新に失敗しました。");
        setUploading(false);
      });
  };

  const enableEditMode = (field) => {
    setIsEditable((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };


  const downloadFile = async () => {
    try {
      console.log("projectData.id:", projectData.id);

      // プロジェクトIDの存在チェック
      if (!projectData.id) {
        alert("プロジェクトIDが存在しません。");
        return;
      }

    // axiosを使用したAPIリクエスト
   const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/Project_name/extraction/${projectData.id}`,
      { responseType: "json" } // レスポンスをJSONとして取得
    );

      // Blobを作成し、リンクを生成してダウンロード
      // const blob = new Blob([response.data], { type: "application/pdf" });
      // const link = document.createElement("a");
      // link.href = URL.createObjectURL(blob);
      // link.download = "project_file.pdf"; // ダウンロードするファイル名
      // link.click();

      // レスポンスの内容をログに出力して確認
      console.log("Response Data:", response.data);
      // リダイレクト情報がある場合はページ移動
      if (response.data && response.data.redirect) {
        console.log("リダイレクト先:", response.data.redirect);

        // リダイレクト先に遷移
        navigate(`/${response.data.redirect}`, {
          state: { filteredData: response.data.filteredData },
        });
      } else {
        console.log("リダイレクト情報がありません。");
      }
    } catch (error) {
      console.error("ダウンロードエラー:", error);
      alert("ダウンロードに失敗しました。");
    }
  };



  if (loading) return <Typography>読み込み中...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  const fieldLabels = {
    project_name: "プロジェクト名",
    finishing_table_name: "仕上げ表Name",
    structural_floor_plan_name: "平面図Name",
    machinery_equipment_diagram_all_name: "機械設備設備図Name",
    bim_drawing_name: "BIM図面Name",
    meeting_log_name: "打合せ簿Name",
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
          <MuiLink component={Link} to="/Project_download" sx={{ color: "#fff", margin: "0 20px" }}>
            download
          </MuiLink>
          <MuiLink component={Link} to="/" sx={{ color: "#fff", margin: "0 20px" }}>
            一 覧 表
          </MuiLink>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 5 }}>
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
              marginBottom: 2,
            }}
          >
            プロジェクト編集
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
            {projectData &&
              Object.keys(projectData).map((key) => (
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
                      <Box
                        sx={{
                          cursor: "pointer",
                          padding: "8px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                        onDragEnter={() => enableEditMode(key)}
                        onClick={() => enableEditMode(key)}
                      >
                        <DropzoneField
                          name={key}
                          onFileChange={handleFileChange}
                          selectedFiles={isEditable[key] ? files[key] || [] : [{ name: projectData[key] || "ファイルが選択されていません" }]}
                        />
                      </Box>
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
            <Button
              variant="outlined"
              fullWidth
              sx={{
                bgcolor: "#6b4f29",
                color: "#fff",
                marginTop: 3,
                "&:hover": { bgcolor: "#4b3e29" },
                fontWeight: "bold",
                borderRadius: 3,
              }}
              onClick={downloadFile}
            >
              ダウンロード
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
            fontSize: "0.9rem",
          }}
        >
          PDFファイルをドラッグ＆ドロップするか、クリックして選択してください
        </Typography>
      ) : (
        <List sx={{ margin: 0, padding: 0 }}>
          {selectedFiles.map((file, index) => (
            <ListItem key={index} sx={{ padding: "4px 0" }}>
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>

  );
};
