#!/usr/bin/env python3
import os
import re
import shutil
from pathlib import Path

# 配置
DESKTOP_PATH = Path("/Users/dev-tian/Desktop")
PROJECT_PATH = Path("/Users/dev-tian/Developer/tj/git/MoonReading")

# 星座列表
SIGNS = ["aquarius", "aries", "cancer", "capricorn", "gemini", "leo", 
         "libra", "pisces", "sagittarius", "scorpio", "taurus", "virgo"]

# 类别
CATEGORIES = ["career", "love", "health", "money", "luck"]

# 共享资源文件列表
SHARED_FILES = [
    "2523922164511192", "analytics.js", "bc-v4.min.html", "css2", "css2(1)",
    "f.txt", "fbevents.js", "footerdown.svg", "footlogo.svg", "jquery-3.7.1.js",
    "js(1)", "js(2)", "js", "memberarea.css", "saved_resource", "saved_resource(1)",
    "saved_resource.html", "script.js", "slick-theme.css", "slick.css", "slick.min.js",
    "topstyles.css", "uc.js", "v8c78df7c7c0f484497ecbca7046644da1771523124516",
    "horoscope1.webp", "horoscope2.png", "horoscope3.png", "horoscope4.png",
    "horoscope6.png", "horoscope7.png", "horoscope8.png", "privacy-choices.png",
    "style.css"
]

# 图标映射 - 每个类别的icon编号
ICON_MAP = {
    "career": "icon_2.svg",
    "love": "icon_4.svg",
    "health": "icon_3.svg",
    "money": "icon_5.svg",
    "luck": "icon_6.svg"
}

# 星座符号文件
def get_sign_file(sign):
    sign_numbers = {
        "aries": "sign1.svg", "taurus": "sign2.svg", "gemini": "sign3.svg",
        "cancer": "sign4.svg", "leo": "sign5.svg", "virgo": "sign6.svg",
        "libra": "sign7.svg", "scorpio": "sign8.svg", "sagittarius": "sign9.svg",
        "capricorn": "sign10.svg", "aquarius": "sign11.svg", "pisces": "sign12.svg"
    }
    return sign_numbers.get(sign, f"sign{sign}.svg")

def process_html_content(html_content, sign, category):
    """处理HTML内容，替换资源路径"""
    
    # 1. 处理共享资源文件 (从 ./XXX_files/xxx 到 ../../../assets/horoscope/shared/xxx)
    # 先处理不带括号的文件，再处理带括号的文件
    files_without_parens = [f for f in SHARED_FILES if '(' not in f]
    files_with_parens = [f for f in SHARED_FILES if '(' in f]
    
    # 先处理不带括号的
    for filename in files_without_parens:
        pattern = rf'\./[^/]*_files/{re.escape(filename)}'
        replacement = f'../../../assets/horoscope/shared/{filename}'
        html_content = re.sub(pattern, replacement, html_content)
    
    # 再处理带括号的（避免重复替换）
    for filename in files_with_parens:
        escaped_filename = filename.replace("(", r"\(").replace(")", r"\)")
        pattern = rf'\./[^/]*_files/{escaped_filename}'
        replacement = f'../../../assets/horoscope/shared/{filename}'
        html_content = re.sub(pattern, replacement, html_content)
    
    # 2. 处理星座符号
    sign_file = get_sign_file(sign)
    pattern = r'\./[^/]*_files/sign\d+\.svg'
    replacement = f'../../../assets/horoscope/signs/{sign}/{sign_file}'
    html_content = re.sub(pattern, replacement, html_content)
    
    # 3. 处理类别图标
    icon_file = ICON_MAP.get(category, "icon_2.svg")
    pattern = r'\./[^/]*_files/icon_\d+\.svg'
    replacement = f'../../../assets/horoscope/icons/{sign}/{icon_file}'
    html_content = re.sub(pattern, replacement, html_content)
    
    # 4. 替换 localhost URLs 为相对路径
    html_content = html_content.replace('href="http://localhost:8080/', 'href="../../../')
    html_content = html_content.replace("href='http://localhost:8080/", "href='../../..")
    
    # 5. 替换 moonreading.com URLs 为相对路径
    html_content = re.sub(
        r'href="https://www\.moonreading\.com/',
        'href="../../../',
        html_content
    )
    html_content = re.sub(
        r"href='https://www\.moonreading\.com/",
        "href='../../..",
        html_content
    )
    
    # 6. 替换图片src中的moonreading URLs
    html_content = re.sub(
        r'src="https://www\.moonreading\.com/',
        'src="../../../',
        html_content
    )
    
    return html_content

def copy_and_convert_html(sign, category):
    """复制并转换HTML文件"""
    source_dir = DESKTOP_PATH / sign / category
    dest_dir = PROJECT_PATH / "horoscope" / sign / category
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    # 查找源HTML文件
    source_files = list(source_dir.glob("*.html"))
    if not source_files:
        print(f"Warning: No HTML file found in {source_dir}")
        return False
    
    source_file = source_files[0]
    print(f"Processing: {source_file.name} -> {dest_dir}/index.html")
    
    # 读取源文件
    with open(source_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # 处理HTML内容
    processed_content = process_html_content(html_content, sign, category)
    
    # 写入目标文件
    dest_file = dest_dir / "index.html"
    with open(dest_file, 'w', encoding='utf-8') as f:
        f.write(processed_content)
    
    print(f"  -> Created: {dest_file}")
    return True

def main():
    print("Starting horoscope HTML integration...")
    print("=" * 50)
    
    total = 0
    success = 0
    
    for sign in SIGNS:
        for category in CATEGORIES:
            total += 1
            try:
                if copy_and_convert_html(sign, category):
                    success += 1
            except Exception as e:
                print(f"Error processing {sign}/{category}: {e}")
    
    print("=" * 50)
    print(f"Completed: {success}/{total} files processed successfully")

if __name__ == "__main__":
    main()
