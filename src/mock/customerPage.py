import json
import os
import copy
from faker import Faker
import datetime

faker = Faker(locale='zh_CN')
current_path = os.path.dirname(__file__)

with open(current_path + '/reviewPage.json', encoding='utf-8') as a:
    customerReview = json.load(a)

baseInfo = []
personalInfo = {}
baseHistory = {}

for i in customerReview:
    personalInfo['lastName'] = i['customer'][0]
    personalInfo['firstName'] = i['customer'][1:]
    personalInfo['email'] = faker.email()
    personalInfo['phoneNumber'] = faker.phone_number()
    personalInfo['address'] = faker.address()[:-7]
    personalInfo['birthday'] = faker.ssn()[6:14]
    personalInfo['zipcode'] = faker.address()[-6:]
    personalInfo['originalPwd'] = faker.pystr()
    personalInfo['city'] = faker.city()
    personalInfo['province'] = faker.province()

    [date1, date2] = [faker.date(), faker.date()]
    strftime1 = datetime.datetime.strptime(date1, "%Y-%m-%d")
    strftime2 = datetime.datetime.strptime(date2, "%Y-%m-%d")
    baseHistory['firstSeen'] = date1 if strftime2 > strftime1 else date2
    baseHistory['lastSeen'] = date1 if strftime2 < strftime1 else date2

    baseInfo.append({'customerId': i['customer_id'],
                     'personalInfo': copy.deepcopy(personalInfo),
                     'baseHistory': copy.deepcopy(baseHistory)})
                     

newInfo = []
unique_customerIds = []
for item in baseInfo:
    if item['customerId'] in unique_customerIds:
        continue
    else:
        unique_customerIds.append(item['customerId'])
        newInfo.append(
            {'customerId': item['customerId'], 'personalInfo': item['personalInfo'], 'baseHistory': item['baseHistory']})

count = 0
for uniqueItem in newInfo:
    ordersNum = 0
    ordersInfo = []
    for item in customerReview:
        if item['customer_id'] == uniqueItem['customerId']:
            ordersNum += 1
            ordersInfo.append(
                {'reviewId': item['reviews_id'], 'product': item['product'], 'date': item['date'], 'status': item['status'], 'comment': item['comment'], 'rating': item['rating'], 'spent': faker.random_int(min=1, max=999)})
    newInfo[count]['ordersInfo'] = copy.deepcopy(ordersInfo)
    newInfo[count]['baseHistory']['ordersNum'] = ordersNum
    count += 1

json_str = json.dumps(newInfo, indent=4, ensure_ascii=False)
with open(current_path + "/customerPage.json", 'w', encoding='utf-8') as json_file:
    json_file.write(json_str)