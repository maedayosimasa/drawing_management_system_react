import openai
import json
import os

# OpenAI APIキーの取得
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    print("Error: OpenAI API Key is missing")
client = openai.Client(api_key=OPENAI_API_KEY)

# 見本データ
sample_data = {
    "project_name_id": "001",
    "project_name": "グリーンレジデンス",
    "address": "東京都世田谷区桜丘3-5-10",
    "client": "株式会社レジデンス開発",
    "construction_period_start": "2024-03-01",
    "construction_period_end": "2025-08-15",
    "completion_date": "2025-09-01",
    "contract_amount": "3,500,000,000",
    "use": "共同住宅",
    "site_area": "1,200",
    "building_area": "800",
    "total_floor_area": "6,500",
    "structural": "鉄筋コンクリート造",
    "floor_number_underground": "1",
    "floor_number_ground": "15",
}


def process_test_data(test_data):
    """ファイルの内容を解析し、GPT-4o miniで処理する"""
    print("Sending request to OpenAI API...")
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "あなたは高度なデータ解析AIです。入力値に対応する`key: value`を推定し、JSON形式で出力してください。",
                },
                {
                    "role": "user",
                    "content": f"見本データ:\n{json.dumps(sample_data, ensure_ascii=False, indent=2)}\n\n入力値: {test_data}",
                },
            ],
        )

        response_content = response.choices[0].message.content
        return {"statusCode": 200, "body": json.loads(response_content)}
    except Exception as e:
        print(f"Error in OpenAI API call: {e}")
        return {"statusCode": 500, "body": {"error": str(e)}}


def lambda_handler(event, context):
    print("=== Lambda handler started ===")
    print("Received event:", json.dumps(event, indent=2, ensure_ascii=False))

    try:
        test_data = event.get("test_01")
        if not test_data or "body" not in test_data:
            return {
                "statusCode": 400,
                "body": {"error": "test_01 のデータが見つかりません。"},
            }

        try:
            body = json.loads(test_data["body"])
        except json.JSONDecodeError:
            return {
                "statusCode": 400,
                "body": {"error": "bodyのJSONデコードに失敗しました。"},
            }

        files = body.get("files", [])
        if not isinstance(files, list):
            return {
                "statusCode": 400,
                "body": {"error": "files はリストである必要があります。"},
            }

        results = []
        for file in files:
            filename = file.get("filename", "unknown")
            file_content = file.get("content", "")
            print(f"Processing file: {filename}")
            processed_result = process_test_data(file_content)
            results.append({"filename": filename, "processed_result": processed_result})

        return {"statusCode": 200, "body": {"processed_data": results}}
    except Exception as e:
        print(f"Unexpected error: {e}")
        return {"statusCode": 500, "body": {"error": str(e)}}
