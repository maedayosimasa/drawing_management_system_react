import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Divider, Button } from '@mui/material';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Project_detail } from './components/Project_details';
//import { Project_create, Project_update } from './components/Project_create';
import { Project_create } from './components/Project_create';
import { Project_search } from './components/Project_search';
import { Project_select } from './components/Project_select';
import { Project_show } from './components/Project_show';
import { Project_download } from './components/Project_download';

export const App = () => {

  return (
    <>
         <Typography 
        variant="h5" 
        align="center" 
        sx={{
          fontWeight: 'bold',
          color: '#6b4f29',
          fontFamily: '"Times New Roman", serif',
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
          marginBottom: 0, // タイトル下のスペースを最小に
        }}
      >
        図面管理システム
      </Typography>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Project_detail />}/>
          <Route path='/Project_create' element={<Project_create />}/>
          <Route path='/Project_search' element={<Project_search />}/>
          <Route path="/Project_name/select" element={<Project_select />} />
          <Route path="/Project_name/show" element={<Project_show />} />
          <Route path="/Project_name/download" element={<Project_download />} />
        </Routes>
      </BrowserRouter>
      
      {/* Provider を追加 */}
      {/* <ProjectProvider>
        <Router>
          <Routes>
            <Route path="/Project_search" element={<Project_search />} />
            <Route path="/Project_select" element={<Project_select />} />
          </Routes>
        </Router>
      </ProjectProvider> */}
     
    </>
  );
};

export default App;
