import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
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
<<<<<<< HEAD
=======

>>>>>>> 121caef91953cfd7f33f59af971e302ad424f724
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
<<<<<<< HEAD
    const project_name = location.state?.project_name || {}; // stateからproject_nameを取り出す
=======
      // `project_name`の取得
    const project_name = location.state?.project_name;

    // データをログで確認
    useEffect(() => {
      //  console.log("Received location.state:", location.state);
       // console.log("Extracted project_name:", project_name);

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
>>>>>>> 121caef91953cfd7f33f59af971e302ad424f724

    useEffect(() => {
        // ここでproject_nameが正しく渡されているかをログで確認
        console.log("Received project_name:", project_name);

<<<<<<< HEAD
        if (project_name && Object.keys(project_name).length > 0) {
            setProjectData({
                user_id: project_name.user_id || "",
                project_name: project_name.project_name || "",
                finishing_table_name: project_name.drawing.design_drawing?.finishing_table_name || "", // これもproject_nameの中にある場合
                floor_plan_name: project_name.drawing.structural_diagram?.floor_plan_name || "", // 同様
                machinery_equipment_diagram_all_name: project_name.drawing.equipment_diagram?.machinery_equipment_diagram_all_name || "",
                bim_drawing_name: project_name.drawing.bim_drawing?.bim_drawing_name || "", // drawingオブジェクト内のdesign_drawingにアクセス
                meeting_log_name: project_name.meeting_log?.meeting_log_name || "", // meeting_log内にあるmeeting_log_nameにアクセス
            });
            setLoading(false); // 読み込み終了
        } else {
            setError("データが見つかりませんでした。");
            setLoading(false); // 読み込み終了
        }
    }, [project_name]); // project_nameが変化したときに実行

=======
>>>>>>> 121caef91953cfd7f33f59af971e302ad424f724
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://127.0.0.1:8000/api/Project_name/upload`, projectData)
            .then((response) => {
                alert("更新が成功しました！");
            })
            .catch((error) => {
                console.error("更新エラー:", error);
                alert("更新に失敗しました。");
            });
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
<<<<<<< HEAD
=======
                <Link to="/Project_download">downloadに移動する</Link><br />
>>>>>>> 121caef91953cfd7f33f59af971e302ad424f724
                <Link to="/">一覧表に移動する</Link>
            </div>
            <Container maxWidth="sm" sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#faf1d7" }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: "#b38b5d", fontWeight: "bold" }}>
                    プロジェクトの編集
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="User ID"
                            name="user_id"
                            value={projectData.user_id}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="プロジェクト名"
                            name="project_name"
                            value={projectData.project_name}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="仕上げ表Name"
                            name="finishing_table_name"
                            value={projectData.finishing_table_name}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="平面図Name"
                            name="floor_plan_name"
                            value={projectData.floor_plan_name}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="機械設備図AllName"
                            name="machinery_equipment_diagram_all_name"
                            value={projectData.machinery_equipment_diagram_all_name}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="BIMName"
                            name="bim_drawing_name"
                            value={projectData.bim_drawing_name}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="打合せ簿Name"
                            name="meeting_log_name"
                            value={projectData.meeting_log_name}
                            onChange={handleChange}
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: "#d4af37",
                            ":hover": { bgcolor: "#b38b5d" },
                        }}
                    >
                        更新
                    </Button>
                </form>
            </Container>
        </>
    );
};
