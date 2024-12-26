import React, { useCallback, useState, useEffect, useRef ,memo} from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Divider, Button } from '@mui/material';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { Link } from 'react-router-dom';
  
  //export const Project_detail = () => {
    //console.log(props);
    // ウインドウのコンポーネント
    // Windowコンポーネントをメモ化
    const Window = memo(({ title, children, onClose }) => {
      const [isMinimized, setIsMinimized] = useState(false);
      const nodeRef = useRef(null); // Refを追加

      return (
        <Draggable handle=".window-header" nodeRef={nodeRef}>
          <ResizableBox width={400} height={300} minConstraints={[300, 200]} maxConstraints={[800, 600]}>
            <div style={{ border: '2px solid #b38b5d', backgroundColor: '#fcfbf8', borderRadius: 8 }} ref={nodeRef}>
              <div className="window-header" style={{ padding: 10, backgroundColor: '#7f6b4e', color: '#fff', cursor: 'move' }}>
                <Typography variant="h6">{title}</Typography>
                <Button onClick={onClose} size="small" style={{ float: 'right', color: '#fff' }}>✖</Button>
              </div>
              {!isMinimized && <div style={{ padding: 10 }}>{children}</div>}
              <Button onClick={() => setIsMinimized(!isMinimized)} size="small">{isMinimized ? '最大化' : '最小化'}</Button>
            </div>
          </ResizableBox>
        </Draggable>
      );
    });

    // ラベルとデータを1/4位置に配置するスタイル
    const dataRowStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
    };

    const labelStyle = {
      flexBasis: '40%',  // 左側のラベル領域を1/4に設定
      fontWeight: 'bold',
      color: '#7f6b4e',
    };

    const contentStyle = {
      flexGrow: 1,  // 残りのスペースを使用
      color: '#6e4b3b',
    };


    export const Project_detail = () => {

      const url = 'http://localhost:8000/api/project_names';
      const [projectNames, setProjectNames] = useState([]);
      const [windows, setWindows] = useState([]);

    // API呼び出しは一度だけ実行
      useEffect(() => {
        const getProjectNames = async () => {
          try {
            const response = await axios.get(url);
            setProjectNames(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        getProjectNames();
      }, []);

    // openWindow関数をメモ化
      const openWindow = (project) => {
        setWindows((prevWindows) => [...prevWindows, { id: project.user_id, project }]);
      };

    // closeWindow関数をメモ化
    const closeWindow = useCallback((id) => {
        setWindows(windows.filter(win => win.id !== id));
      },[]);
  return(
  <>
      <div>
        <h3>一覧表</h3>
        <Link to="/Project_create">createに移動する</Link><br />
        <Link to="/Project_search">searchに移動する</Link><br />
        <Link to="/Project_show">showに移動する</Link>
      </div>

      <Container maxWidth="md" sx={{ marginTop: 5, backgroundColor: '#fcfbf8', borderRadius: 3, boxShadow: 3, padding: 4 }}>
        <Typography variant="h5" align="center" color="#b38b5d" gutterBottom>プロジェクト一覧</Typography>
        {projectNames.map((project, index) => (
          <Card key={index} sx={{ marginBottom: 3, backgroundColor: '#fff8e1', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body1" color="#6e4b3b">プロジェクト名: {project.project_name}</Typography>
              <Button onClick={() => openWindow(project)} variant="outlined" sx={{ marginTop: 2 }}>詳細を開く</Button>
            </CardContent>
          </Card>
        ))}
      </Container>
  {/* ウインドウのレンダリング */}
      {windows.map(win => (
        <Window key={win.id} title={`プロジェクト: ${win.project.project_name ?? 'No data'}`} onClose={() => closeWindow(win.id)}>
          <Typography variant="body1" color="#6e4b3b" style={dataRowStyle}><div style={labelStyle}>ユーザーID</div> <div style={contentStyle}>:　{win.project.user_id ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span"  color="#6e4b3b" style={dataRowStyle}><div style={labelStyle}>プロジェクトID</div> <div style={contentStyle}>:　{win.project.drawing?.project_name_id ?? 'No data'}</div></Typography>
           <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>プロジェクト名</div> <div style={contentStyle}>:　{win.project.project_name ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>プロジェクトID</div> <div style={contentStyle}>:　{win.project.drawing?.project_name_id ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#6e4b3b" style={dataRowStyle}><div style={labelStyle}>図面ID</div> <div style={contentStyle}>:　{win.project.drawing?.design_drawing?.drawing_id ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>仕上げ表Name</div> <div style={contentStyle}>:　{win.project.drawing?.design_drawing?.finishing_table_name ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>図面ID</div> <div style={contentStyle}>:　{win.project.drawing?.structural_diagram?.drawing_id ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>平面図Name</div> <div style={contentStyle}>:　{win.project.drawing?.structural_diagram?.floor_plan_name ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>図面ID</div> <div style={contentStyle}>:　{win.project.drawing?.equipment_diagram?.drawing_id ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>機械設備図ALLName</div> <div style={contentStyle}>:　{win.project.drawing?.equipment_diagram?.machinery_equipment_diagram_all_name ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>図面ID</div> <div style={contentStyle}>:　{win.project.drawing?.bim_drawing?.drawing_id ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>BIMName</div> <div style={contentStyle}>:　{win.project.drawing?.bim_drawing?.bim_drawing_name ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>プロジェクトID</div> <div style={contentStyle}>:　{win.project.meeting_log?.project_id ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" component="span" color="#7f6b4e" style={dataRowStyle}><div style={labelStyle}>打合せ簿Name</div> <div style={contentStyle}>:　{win.project.meeting_log?.meeting_log_name ?? 'No data'}</div></Typography>
          <Divider sx={{ marginY: 2 }} />

        </Window>
      ))}
    </>
  );
};

