import json
from openai import OpenAI

from app.config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def analyze_text(text):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content":
                    """
                    You are an AI assistant for document analysis.
                    
                    Return ONLY valid JSON.
                    
                    Format:
                    
                    {
                      "summary": "",
                      "deadlines": [],
                      "payments": [],
                      "contacts": [],
                      "notes": []
                    }
                    
                    Rules:
                    - summary must contain 1-2 short sentences
                    - deadlines must be an array
                    - payments must be an array
                    - contacts must be an array
                    - notes must be an array
                    - return valid JSON only
                    - do not use markdown
                    - do not use code blocks
                    """
            },
            {
                "role": "user",
                "content": text[:12000]
            }
        ]
    )

    result = response.choices[0].message.content
    return json.loads(result)