import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Test = () => {
    const handleDownload = async () => {
        const fileURL = "http://127.0.0.1:8000/storage/uploads/A_3%E9%9A%8E%E5%B9%B3%E9%9D%A2%E5%9B%B3.pdf";
        const fileName = "A_3階平面図.pdf";

        try {
            console.log("ダウンロードを開始します...");
            const response = await axios.get(fileURL, {
                responseType: "blob", // Blobとして受け取る
            });
            console.log("ファイルを取得しました");

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName); // ダウンロードするファイル名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("CORSエラーまたはダウンロード失敗:", error);
            alert("ダウンロードに失敗しました。CORSエラーの可能性があります。");
        }
    };

    return (
        
        <div>
            <h2>PDFファイルダウンロードテスト</h2>
            <button onClick={handleDownload}>ファイルをダウンロード</button><br />
            <a href="http://127.0.0.1:8000/storage/uploads/A_3%E9%9A%8E%E5%B9%B3%E9%9D%A2%E5%9B%B3.pdf" download="テスト.pdf">PDFはこちらからダウンロード</a>
        </div>
    );
};

//export default Test;
