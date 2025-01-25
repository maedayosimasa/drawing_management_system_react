import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Container, Grid, Box , AppBar, Toolbar, Link as MuiLink} from '@mui/material';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const Project_select = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

      const location = useLocation();
    const project_name = location.state?.project_name ||[]; // stateからproject_nameを取り出す

    useEffect(() => {
        setProjects(project_name);// projectsにproject_nameを設定
    }, [project_name]); // project_nameが変わるたびに実行される


  
      //console.log(project_name);
    // プロジェクトの編集データをAPIに送信
    const sendProjectEditData = async (projectId) => {
        const payload = { id: projectId, message: '編集リクエストを送信しました。react select' };
        try {
           // console.log(projectId);
            const response = await axios.get(`http://127.0.0.1:8000/api/Project_name/show/${projectId}`, { params: payload });

            console.log('編集リクエスト成功react select:', response.data);
            //alert('編集データが正常に送信されました。react select');

            // 必要に応じてリダイレクトや他の操作を実装
           // window.location.href = `/project_name/${projectId}/show`;
            console.log(response.data.redirect)
            // リダイレクト情報がある場合はページ移動
            if (response.data.redirect) {
                navigate(`/${response.data.redirect}`, { state: { project_name: response.data.project_name } });
            }
        } catch (error) {
            console.error('編集リクエスト失敗react select:', error);
            alert('編集データの送信に失敗しました。react select');
        }
    };


    return (
        <>
         <AppBar position="sticky" sx={{ bgcolor: "#d4af37", height: "40px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "center" , height: "40px"}}>
                  {/* <MuiLink component={Link} to="/Project_select" sx={{ color: "#fff", margin: "0 20px" }}>
                    選 択
                  </MuiLink> */}
                  <MuiLink component={Link} to="/Project_create" sx={{ color: "#fff", margin: "0 30px", mt: 1, mb: 3}}>
                    新規入力
                  </MuiLink>
                  <MuiLink component={Link} to="/Project_search" sx={{ color: "#fff",margin: "0 30px", mt: 1, mb: 3 }}>
                    検 索
                  </MuiLink>
                  <MuiLink component={Link} to="/Project_download" sx={{ color: "#fff", margin: "0 30px", mt: 1, mb: 3 }}>
                    download
                  </MuiLink>
                  <MuiLink component={Link} to="/" sx={{ color: "#fff",margin: "0 30px", mt: 1, mb: 3 }}>
                    一 覧 表
                  </MuiLink>
                </Toolbar>
              </AppBar>

            <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
                <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#b38b5d' }}>
                    プロジェクト選択一覧
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {/* マップ */}
                    {projects.map((project_name) => (
                        <Grid item xs={12} sm={6} md={4} key={project_name.id}>
                            <Card sx={{ boxShadow: 3, borderRadius: '12px', backgroundColor: '#fff8e1', border: '0.5px solid #d4af37' }}>
                                <CardContent>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#6e4b3b', textTransform: 'uppercase', borderBottom: '2px solid #d4af37', paddingBottom: '5px' }}>
                                        {projects.project_name}
                                    </Typography>

                                    <Typography variant="body1" sx={{ color: '#7f6b4e', lineHeight: '1.6', marginTop: '8px' }}>
                                        ユーザーID: {project_name.user_id}
                                    </Typography>

                                    <Box sx={{ borderBottom: '1px solid #d4af37', marginY: 2 }} />

                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        プロジェクト名: {project_name.project_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        プロジェクトID: {project_name.drawing?.project_name_id ?? 'no_data'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        図面ID: {project_name.drawing?.design_drawing?.drawing_id ?? 'no_data'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        仕上げ表Name: {project_name.drawing?.design_drawing?.finishing_table_name ?? 'no_data'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        図面ID: {project_name.drawing?.structural_diagram?.drawing_id ?? 'no_data'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        平面図Name: {project_name.drawing?.structural_diagram?.structural_floor_plan_name ?? 'エラー'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        図面ID: {project_name.drawing?.equipment_diagram?.drawing_id ?? 'no_data'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        機械設備図AllName: {project_name.drawing?.equipment_diagram?.machinery_equipment_diagram_all_name ?? 'no_data'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        図面ID: {project_name.drawing?.bim_drawing?.drawing_id ?? 'no_data'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        BimName: {project_name.drawing?.bim_drawing?.bim_drawing_name ?? 'no_data'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        プロジェクトID: {project_name.meeting_log?.project_id ?? 'no_data'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f6b4e' }}>
                                        打合せ簿Name: {project_name.meeting_log?.meeting_log_name ?? 'no_data'}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginTop: 2 }}
                                        onClick={() => sendProjectEditData(project_name.id)}>
                                        編集する
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};
