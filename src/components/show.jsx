import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Divider, Button } from '@mui/material';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { Project_detail } from './components/Project_details';
//import { Project_update } from './components/Project_update';
import { Project_search } from './components/Project_search';
export const App = () => {



    return (
        <>

            {/* <Project_detail /> */}
            {/* <Project_update /> */}
            <Project_search />
        </>
    );
};

export default App;
