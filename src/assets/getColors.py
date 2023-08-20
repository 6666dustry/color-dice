from getColor import getColor
from time import sleep
import csv
import urllib.request


def getColors(paths: list[str]):
    with open("src/assets/color_list.csv", "w", encoding="utf-8", newline="") as file:
        writer = csv.writer(file)
        i = 0
        for path in paths:
            try:
                with urllib.request.urlopen(path) as response:
                    # with open(path, encoding="utf-8") as f:
                    html_content = response.read().decode("utf-8")
                    # html_content = f.read()
                    color_info = getColor(html_content)
                    # print(color_info)
                    color_info = list(color_info)
                    color_info.append(path)
                    writer.writerow(color_info)
                    i += 1
                    print(f"end {i}th repeat:{path}")
                    sleep(3)
            except Exception as e:
                print(e)
                print(f"error at{i}th repeat:{path}")
                writer.writerow(["", "", "", "", "", str(e), path])
                sleep(3)
                continue


if __name__ == "__main__":
    # getColors(["src/assets/藍色(あいいろ)とは？：伝統色のいろは.html"])
    with open("src/assets/links.txt", "r") as links:
        paths = links.read().splitlines()
        getColors(paths)
