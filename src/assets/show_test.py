import csv

with open("src/assets/color_list.csv", encoding="utf-8") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row[0])
