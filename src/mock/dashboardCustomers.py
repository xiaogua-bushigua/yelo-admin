from faker import Faker
import json
import os

faker = Faker(locale='zh_CN')
current_path = os.path.dirname(__file__)
names = []

for i in range(40):
  n = faker.name()
  if len(n)!=2:
    n = n[0] + ' ' + n[1:]
  names.append(n)

json_str = json.dumps(names, indent=4, ensure_ascii=False)
with open(current_path + "/dashboardCustomers.json", 'w', encoding='utf-8') as json_file:
    json_file.write(json_str)