import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Container, Button, Typography, Box, List, ListItem, ListItemText, Paper } from "@mui/material"; 
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Project_show = () => {
  const [projectData, setProjectData] = useState({
    user_id: "",
    project_name: "",
    finishing_table_name: "",
    floor_plan_name: "",
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
        user_id: project_name.user_id || "",
        project_name: project_name.project_name || "",
        finishing_table_name: project_name.drawing?.design_drawing?.finishing_table_name || "",
        floor_plan_name: project_name.drawing?.structural_diagram?.floor_plan_name || "",
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
    finishing_table_name: false,
    floor_plan_name: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    axios
      .post(`http://127.0.0.1:8000/api/Project_name/upload`, projectData)
      .then((response) => {
        alert("更新が成功しました！");
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

  if (loading) return <Typography>読み込み中...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <div>
        <h3>update</h3>
        <Link to="/Project_select">selectに移動する</Link><br />
        <Link to="/Project_create">createに移動する</Link><br />
        <Link to="/Project_search">searchに移動する</Link><br />
        <Link to="/Project_download">downloadに移動する</Link><br />
        <Link to="/">一覧表に移動する</Link>
      </div>

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
            {projectData &&
              Object.keys(projectData).map((key) => (
                <div key={key}>
                  <Typography>{key}</Typography>
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
