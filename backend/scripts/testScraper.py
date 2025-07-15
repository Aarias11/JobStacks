import os
import sys
import json
import openai
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Determine input mode (CLI vs subprocess)
if len(sys.argv) > 1:
    job_url = sys.argv[1]
else:
    job_url = input("🔗 Enter the job posting URL: ").strip()

def get_visible_text(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print(f"🔍 Navigating to: {url}", file=sys.stderr)  # Log to stderr
        page.goto(url, timeout=60000)
        page.wait_for_timeout(5000)
        text_content = page.evaluate("() => document.body.innerText")
        browser.close()
        return text_content

def parse_with_openai(job_text):
    prompt = f"""
You're an AI job parser. Based on the job page text below, extract and return the following as a JSON object:

- title
- company
- location
- salary
- techStack (list of keywords)
- requirements (list)
- responsibilities (list)
- description (plain text)

Do not return anything else. Use best judgment to fill missing fields.

Job Page Text:
\"\"\"
{job_text[:12000]}
\"\"\"
"""

    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return response['choices'][0]['message']['content']

if __name__ == "__main__":
    job_text = get_visible_text(job_url)
    parsed_output = parse_with_openai(job_text)

    if len(sys.argv) > 1:
        json_start = parsed_output.find('{')
        json_end = parsed_output.rfind('}')
        clean_json = parsed_output[json_start:json_end + 1].strip()

        if clean_json.startswith("```json"):
            clean_json = clean_json[7:].strip()
        elif clean_json.startswith("```"):
            clean_json = clean_json[3:].strip()

        try:
            parsed = json.loads(clean_json)
            print(json.dumps(parsed))  # ✅ Clean JSON only to stdout
        except json.JSONDecodeError as e:
            print(f"Error: JSON decode failed - {e}", file=sys.stderr)
            sys.exit(1)
    else:
        print("✅ Parsed Job JSON:\n", file=sys.stderr)
        print(parsed_output)