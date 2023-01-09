import json
import os
import copy
from faker import Faker
import datetime
import bson
import random

faker = Faker(locale='zh_CN')
current_path = os.path.dirname(__file__)

with open(current_path + '/customerPage.json', encoding='utf-8') as a:
    customerPage = json.load(a)

products = ['乒乓球', '木门', '感冒药', '耳机', '平板',
            '手表', '手机', '苹果', '卷饼', '显示器', '手套', '电动车']
status = ['ordered', 'delivered', 'canceled']

buyItem = {}
info = []
temp = {}

for i in customerPage:
    temp['orderCode'] = str(bson.ObjectId())
    temp['date'] = str(Faker().date_time_between(
        start_date="-10y", end_date="now", tzinfo=None))
    temp['customer'] = i['personalInfo']['lastName'] + \
        i['personalInfo']['firstName']
    temp['customerId'] = i['customerId']
    temp['address'] = i['personalInfo']['address']
    temp['totalDeliveryFees'] = random.randint(10, 40)
    temp['totalExPrices'] = 0
    temp['totalTaxes'] = 0
    buyItems = []
    for j in range(random.randint(1, 4)):
        buyItem['product'] = random.choice(products)
        buyItem['status'] = random.choices(status, weights=[0.1, 0.7, 0.2], k=1)[0]
        buyItem['unitPrice'] = random.randint(10, 500)
        buyItem['quantity'] = random.randint(1, 4)
        buyItem['taxe'] = random.randint(1, 50)
        buyItem['totalSolo'] = buyItem['quantity'] * buyItem['unitPrice'] + buyItem['taxe']
        buyItems.append(copy.deepcopy(buyItem))

        temp['totalExPrices'] += buyItem['unitPrice'] * buyItem['quantity']
        temp['totalTaxes'] += buyItem['taxe']

    temp['buyItems'] = buyItems
    info.append(copy.deepcopy(temp))

json_str = json.dumps(info, indent=4, ensure_ascii=False)
with open(current_path + "/salePage.json", 'w', encoding='utf-8') as json_file:
    json_file.write(json_str)
