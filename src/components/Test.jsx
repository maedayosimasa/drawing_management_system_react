import React from "react";
import axios from "axios";

export const Test = () => {
    const handleDownload = async () => {
        const fileName = encodeURIComponent("A_3階平面図.pdf");
        const fileURL = `http://127.0.0.1:8000/api/Project_name/downloadpdf/${fileName}`;

        try {
            console.log("ダウンロードを開始します...");

            // Axiosを使ってファイルを取得
            const response = await axios.get(fileURL, {
                responseType: "blob", // ファイルをBlob形式で取得
            });

            console.log("ファイルを取得しました");

            // BlobをURLとして生成
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // ダウンロードリンクを作成
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName); // ダウンロード時のファイル名を設定
            document.body.appendChild(link);
            link.click();

            // 使い終わったリンクを削除
            document.body.removeChild(link);
        } catch (error) {
            console.error("CORSエラーまたはダウンロード失敗:", error);
            alert("ダウンロードに失敗しました。CORSエラーの可能性があります。");
        }
    };

    return (
        <div>
            <h2>PDFファイルダウンロードテスト</h2>
            <button onClick={handleDownload}>ファイルをダウンロード</button>
            <br />
            <a
                href="http://127.0.0.1:8000/storage/uploads/A_3%E9%9A%8E%E5%B9%B3%E9%9D%A2%E5%9B%B3.pdf"
                download="テスト.pdf"
            >
                PDFはこちらからダウンロード
            </a>
        </div>
    );
};
