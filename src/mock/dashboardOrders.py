from faker import Faker
import json
import os
import random

faker = Faker(locale='zh_CN')
current_path = os.path.dirname(__file__)
info = []

for i in range(12):
    n = faker.name()
    if len(n) != 2:
        n = n[0] + ' ' + n[1:]
    info.append({'name': n,
                 'date': str(Faker().date_time_between(
                     start_date="-10y", end_date="now", tzinfo=None)),
                'items': random.randint(1, 4),
                'money': random.randint(100, 2000)})

json_str = json.dumps(info, indent=4, ensure_ascii=False)
with open(current_path + "/dashboardOrders.json", 'w', encoding='utf-8') as json_file:
    json_file.write(json_str)
