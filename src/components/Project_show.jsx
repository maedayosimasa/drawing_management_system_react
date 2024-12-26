import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Draggable from 'react-draggable';//ドラックアンドドロップ
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const project_name = location.state?.project_name || []; // stateからproject_nameを取り出す
    useEffect(() => {
        if (project_name && project_name.length > 0) {
            setProjectData(project_name); // データをセット
            setLoading(false); // 読み込み終了
        } else {
            setError("データが見つかりませんでした。");
            setLoading(false); // 読み込み終了
        }
    }, [project_name]); // project_nameが変化したときに実行

    console.log(projectData);
    // useEffect(() => {
    //     setProjectData(project_name);// projectsにproject_nameを設定
    //     }, [project_name]); // project_nameが変わるたびに実行される
   // console.log(projectData);
    // idを使用してリレーションデータを取得する関数
    // const RelatedData = async (id) => {
    //     try {
    //         const response = await axios
    //             .get(`http://127.0.0.1:8000/api/Project_name/extraction/${id}`); // APIエンドポイントを設定
    //             console.log('RelatedDate()が動いた')
    //         setProjectData(response.data); // 取得したデータを状態にセット
    //         console.log(response.data)
    //         console.log(projectData)
    //     } catch (err) {
    //         setError(err.response?.data?.message || "リレーションデータの取得に失敗しました");
    //     } finally {
    //         setLoading(false); // ローディングを解除
    //     }
    // };
    // useEffect(() => {
    //     if (project_name && project_name.id) {
    //         RelatedData(project_name.id); // idを使ってデータを取得
    //     } else {
    //         setError("データが見つかりませんでした。");
    //         setLoading(false); // ローディングを解除
    //     }
    // }, [project_name]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://127.0.0.1:8000/api/Project_name/upload`, projectData)
            .then((response) => {
                alert("更新が成功しました！react_show_upload");
                // リダイレクト情報がある場合はページ移動
                //     if (response.data.redirect) {
                //         navigate(`/${response.data.redirect}`, { state: { project_name: response.data.project_name } });
            })
            .catch((error) => {
                console.error("更新エラーreact_show_upload:", error);
                alert("更新に失敗しました。react_show_upload");
            });
    };
    if (loading) return <Typography>読み込み中...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;
    return (
        <>
            <div>
                <h3>update</h3>
                <Link to="/Project_selsct">selsctに移動する</Link><br />
                <Link to="/Project_create">createに移動する</Link><br />
                <Link to="/Project_search">searchに移動する</Link><br />
                c
                <Link to="/">一覧表 に移動する</Link>
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
