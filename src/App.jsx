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
      <h2>図面管理システム</h2>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Project_detail />}/>
          <Route path='/Project_create' element={<Project_create />}/>
          <Route path='/Project_search' element={<Project_search />}/>
          <Route path="/Project_name/select" element={<Project_select />} />
          <Route path="/Project_name/show" element={<Project_show />} />
          <Route path="/Project_download" element={<Project_download />} />
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
