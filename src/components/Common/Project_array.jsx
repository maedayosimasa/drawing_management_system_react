import React, { useEffect } from 'react';

const ProjectArray = ({ projects, onProjectData }) => {
    const baseUrl = "${import.meta.env.VITE_API_URL}/storage/";

    useEffect(() => {
        console.log("Received projects:", projects);
        if (!Array.isArray(projects)) return;

        // 各プロジェクトのデータを適切に整形
        const updatedProjects = projects.map((project, index) => {
            // imageDataが配列の場合、内容を取り出す
            const imageContent = Array.isArray(project) ? project[1] : project;

            // 分割代入で必要なデータを取得
            const {
                id,
                created_at,
                updated_at,
                finishing_table_name,
                finishing_table_view_path,
                finishing_table_pdf_path,
                floor_plan_name,
                floor_plan_view_path,
                floor_plan_pdf_path,
                machinery_equipment_diagram_all_name,
                machinery_equipment_diagram_all_view_path,
                machinery_equipment_diagram_all_pdf_path,
                bim_drawing_name,
                bim_drawing_view_path,
                bim_drawing_pdf_path,
                meeting_log_name,
                meeting_log_view_path,
                meeting_log_pdf_path,
            } = imageContent; // ここで分割代入

            const currentFileName =
                finishing_table_name ||
                floor_plan_name ||
                machinery_equipment_diagram_all_name ||
                bim_drawing_name ||
                meeting_log_name;

            const thmbnal =
                finishing_table_view_path ||
                floor_plan_view_path ||
                machinery_equipment_diagram_all_view_path ||
                bim_drawing_view_path ||
                meeting_log_view_path;

            const pdf_path =
                finishing_table_pdf_path ||
                floor_plan_pdf_path ||
                machinery_equipment_diagram_all_pdf_path ||
                bim_drawing_pdf_path ||
                meeting_log_pdf_path;

            const imageURI = thmbnal ? `${baseUrl}${thmbnal}` : null;
            const pdfURL = pdf_path ? `${baseUrl}${pdf_path}` : null;

            // sub_idの取得
            const sub_id = Array.isArray(project) ? project[0] : index;

            // 各データを整形して返す
            return {
                index,          // 配列のインデックスを格納
                id,
                id_sub: sub_id, // sub_idの格納
                name: currentFileName,
                imageURI,
                pdfURL,
                created_at,
                updated_at,
            };
        });

        // 更新されたprojectsをonProjectDataに渡す
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
