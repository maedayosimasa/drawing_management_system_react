import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box, FormGroup , AppBar, Toolbar, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // useNavigate をインポート

const Container = styled(Box)({
    fontFamily: "'Georgia', serif",
    backgroundColor: '#f8f8f8',
    color: '#333',
    margin: 0,
    padding: 0,
});

const Title = styled(Typography)({
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#b38b5d',
    marginTop: '40px',
    fontWeight: 'bold',
    letterSpacing: '3px',
    textShadow: '3px 3px 6px rgba(184, 134, 11, 0.5)',
    fontFamily: "'Garamond', serif",
});

const FormContainer = styled(Box)({
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#faf1d7',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    border: '0.5px solid #d4af37',
});

const ResultContainer = styled(Box)({
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    border: '0.5px solid #d4af37',
});

const SubmitButton = styled(Button)({
    width: '100%',
    padding: '15px',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#d4af37',
    borderRadius: '10px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#b38b5d',
    },
});

export const Project_search = () => {
    const [query, setQuery] = useState('');
    const [projectNames, setProjectNames] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const navigate = useNavigate(); // ルートの移動用
    const searchUrl = 'http://127.0.0.1:8000/api/Project_name/search';
    const submitUrl = 'http://127.0.0.1:8000/api/Project_name/select';


    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(searchUrl, { query });
            setProjectNames(response.data);
        } catch (error) {
            console.error('検索エラーreact:', error);
        }
    };

    const handleCheckboxChange = (projectId) => {
        setSelectedProjects((prevSelected) => {
            if (prevSelected.includes(projectId)) {
                return prevSelected.filter((id) => id !== projectId);
            } else {
                return [...prevSelected, projectId];
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(submitUrl, { id: selectedProjects });
            console.log('選択したプロジェクトIDを送信しましたreact search:', selectedProjects);

            // リダイレクト情報がある場合はページ移動
            if (response.data.redirect) {
                navigate(`/${response.data.redirect}`, { state: { project_name: response.data.project_name } });
            }
        } catch (error) {
            console.error('送信エラーreact:', {
                errorMessage: error.message,
                status: error.response?.status,
                responseData: error.response?.data,
                submittedIds: selectedProjects,
            });
            alert('送信に失敗しました。もう一度試してください。');
        }
    };
    

    return (
        <>
        
         <AppBar position="sticky" sx={{ bgcolor: "#d4af37", height: "40px"  }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center" ,height: "40px"}}>
          <MuiLink component={Link} to="/Project_select" sx={{ color: "#fff", margin: "0 30px", mt: 1, mb: 3 }}>
            選 択
          </MuiLink>
          <MuiLink component={Link} to="/Project_create" sx={{ color: "#fff",  margin: "0 30px", mt: 1, mb: 3}}>
            新規入力
          </MuiLink>
          <MuiLink component={Link} to="/Project_show" sx={{ color: "#fff", margin: "0 30px", mt: 1, mb: 3}}>
            表 示
          </MuiLink>
          <MuiLink component={Link} to="/Project_download" sx={{ color: "#fff", margin: "0 30px", mt: 1, mb: 3 }}>
            download
          </MuiLink>
          <MuiLink component={Link} to="/" sx={{ color: "#fff",  margin: "0 30px", mt: 1, mb: 3 }}>
            一 覧 表
          </MuiLink>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Title>プロジェクトの検索</Title>

                <FormContainer>
                    <TextField
                        label="検索項目"
                        variant="outlined"
                        fullWidth
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="検索 project name..."
                        required
                        sx={{
                            marginBottom: '20px',
                            backgroundColor: '#fff',
                            border: '1px solid #d4af37',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#d4af37',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#b38b5d',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#b38b5d',
                                },
                            },
                        }}
                    />
                    <SubmitButton onClick={handleSearch}>検索</SubmitButton>
                </FormContainer>

                {projectNames.length > 0 && (
                    <ResultContainer>
                        <Typography variant="h6">検索結果:</Typography>
                        <FormGroup>
                            {projectNames.map((project) => (
                                <FormControlLabel
                                    key={project.id}
                                    control={
                                        <Checkbox
                                            checked={selectedProjects.includes(project.id)}
                                            onChange={() => handleCheckboxChange(project.id)}
                                        />
                                    }
                                    label={project.project_name}
                                />
                            ))}
                        </FormGroup>
                        <SubmitButton onClick={handleSubmit}>送信</SubmitButton>
                    </ResultContainer>
                )}

                {projectNames.length === 0 && query && (
                    <Typography variant="body1" color="textSecondary">
                        見つかりませんでした: "{query}".
                    </Typography>
                )}
            </Container>
        </>
    );
};
