from bs4 import BeautifulSoup
import re


def getColor(html_content: str):
    """
    色名（読み）,
    RGB,
    CMYK,
    HEX Triplet,
    色の説明,
    を取得
    """
    soup = BeautifulSoup(html_content, "html.parser")
    # 色の名前を取得
    th_element = soup.find_all("th")
    for th in th_element:
        if "色の名前" in th.strings:
            color_name_element = th
    color_name: str = color_name_element.find_next("td").text.strip()

    # RGB値を取得
    rgb_td = soup.find("td", class_="rgb")
    rgb_value = rgb_td.text.replace("\n", "")
    rgb_value = re.match(r".*R:(\d*) *G:(\d*) *B:(\d*).*", rgb_value).groups()
    # CMYK値を取得
    cmyk_td = soup.find("td", class_="cmyk")
    cmyk_value = cmyk_td.text.replace("\n", "")
    cmyk_value = re.match(
        r".*C:(\d*) *M:(\d*) *Y:(\d*) *K:(\d*).*", cmyk_value
    ).groups()
    # HEX Tripletを取得
    for th in th_element:
        if "Web カラー" in th.strings:
            hex_triplet_element = th

    hex_triplet: str = hex_triplet_element.find_next("input")["value"]

    # 色の説明を取得
    color_description = soup.find("h3", string="色の説明").find_next("p").text.strip()
    start = soup.find("h3", string="色の説明").find_next("p")
    color_description = ""
    while start:
        color_description += start.text.strip()
        start = start.find_next("p")
        if not re.match(r"-読み：( |　|.)+-", start.text or ""):
            color_description += "\n"
        else:
            break

    # print("色の名前:", color_name)
    # print("RGB値:", rgb_value)
    # print("CMYK値:", cmyk_value)
    # print("HEX Triplet:", hex_triplet)
    # print("色の説明:", color_description)
    return (
        color_name,
        list(rgb_value),
        list(cmyk_value),
        hex_triplet,
        color_description,
    )
