from bs4 import BeautifulSoup

# 完全には分別していないので気を付けてください
# スクレイピング対象のHTML
with open("src/assets/和色名 五十音順一覧：伝統色のいろは.html", "r", encoding="utf-8") as file:
    html = file.read()

# Beautiful SoupでHTMLを解析
soup = BeautifulSoup(html, "html.parser")

# style属性を持つ<a>要素をすべて取得する
a_tags = soup.find_all("a", attrs={"style": True})

# <a>タグのhref属性の値を取得
href_values = [a["href"] for a in a_tags]

print(href_values)
with open("links.txt", "w") as links:
    links.write("\n".join(href_values))
