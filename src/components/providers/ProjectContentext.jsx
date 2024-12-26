import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [query, setQuery] = useState('');

    return (
        <ProjectContext.Provider value={{ selectedProjects, setSelectedProjects, query, setQuery }}>
            {children}
        </ProjectContext.Provider>
    );
};
