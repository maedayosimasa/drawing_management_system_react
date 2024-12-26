import { createContext, CreateContext } from "react";
export const AdminFlagContext = createContext({});

export const AdminFlagProvider = props => {
    const { children} = props;
    //動作確認のためのオブジェクト
    const sampleObj = { sampleValue: "テスト"};
    //AdminFlagContextの中にProviderがあるのでそれでchildenを囲む
    //valueの中にグローバルに扱う実際の値を設定
    return (
        <AdminFlagContext.Provider value={sampleObj}>
            {children}
            </AdminFlagContext.Provider>
    );
};