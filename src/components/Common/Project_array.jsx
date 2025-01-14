import React, { useEffect } from 'react';

const ProjectArray = ({ projects, onProjectData }) => {
    const baseUrl = "http://127.0.0.1:8000/storage/";

    useEffect(() => {
        //console.log("Received projects:", projects);
        if (!Array.isArray(projects)) return;

        const updatedProjects = projects.map((project, index) => {
            const currentFileName =
                project.finishing_table_name ||
                project.floor_plan_name ||
                project.machinery_equipment_diagram_all_name ||
                project.bim_drawing_name ||
                project.meeting_log_name;

            const thmbnal =
                project.finishing_table_view_path ||
                project.floor_plan_view_path ||
                project.machinery_equipment_diagram_all_view_path ||
                project.bim_drawing_view_path ||
                project.meeting_log_view_path;

            const pdf_path =
                project.finishing_table_pdf_path ||
                project.floor_plan_pdf_path ||
                project.machinery_equipment_diagram_all_pdf_path ||
                project.bim_drawing_pdf_path ||
                project.meeting_log_pdf_path;

            const imageURI = thmbnal ? `${baseUrl}${thmbnal}` : null;
            const pdfURL = pdf_path ? `${baseUrl}${pdf_path}` : null;

            // console.log("Sending data:", {
            //     index,
            //     id: project.id,
            //     name: currentFileName,
            //     imageURI,
            //     pdfURL,
            //     created_at: project.created_at,
            //     updated_at: project.updated_at,
            // });

            return {
                index,
                id: project.id,
                id_sub: null,
                name: currentFileName,
                imageURI,
                pdfURL,
                created_at: project.created_at,
                updated_at: project.updated_at,
            };
        });

        onProjectData(updatedProjects);
    }, [projects, onProjectData]);

    return (
        <div>
            <h2>Project Array</h2>
            {Array.isArray(projects) ? (
                projects.map((project, i) => (
                    <div key={i}>
                        <p>Project Name: {project.name || 'No Name'}</p>
                        <p>Project ID: {project.id || 'No ID'}</p>
                    </div>
                ))
            ) : (
                <p>No projects available</p>
            )}
        </div>
    );
};

export default ProjectArray;
