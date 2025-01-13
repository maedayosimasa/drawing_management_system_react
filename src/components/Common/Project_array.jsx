import React, { useEffect } from 'react';

const ProjectArray = ({ projects, onProjectData }) => {
    const baseUrl = "http://127.0.0.1:8000/storage/";
    

    // projects配列を一つずつ処理
    useEffect(() => {
        projects.forEach((project, index) => {
             // 分割代入
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
                                        }  = project;

             // 必要な値を選択  ＊＊順序注意＊＊
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


            const imageURI = `${baseUrl}${viewPath}`;
            const pdfURL = `${baseUrl}${pdf_path}`;

            // それぞれの変数の値をログに出力
            console.log('Index:', index);
            console.log('ID:', id);
            console.log('Drawing ID:', drawing_id);
            console.log('Name:', name);
            console.log('Image URI:', imageURI);
            console.log('PDF URL:', pdfURL);
            console.log('Created At:', created_at);
            console.log('Updated At:', updated_at);

            // 親コンポーネントに返すデータ
            onProjectData(index, id, drawing_id, name, imageURI, pdfURL, created_at, updated_at);
        });
    }, [projects, onProjectData]);

    return (
         <div>
            <h2>Project Array</h2>
            {/* projectsが配列でない場合を防ぐ */}
            {Array.isArray(projects) ? (
                projects.map((project, i) => (
                    <div key={i}>
                        <p>Project Name: {project.name || 'No Name'}</p>
                        <p>Project ID: {project.id || 'No ID'}</p>
                        {/* 他のプロパティを表示 */}
                    </div>
                ))
            ) : (
                <p>No projects available</p>
            )}
        </div>
    );
};

export default ProjectArray;
