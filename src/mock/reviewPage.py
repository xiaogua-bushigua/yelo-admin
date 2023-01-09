import json
from faker import Faker
import copy
import random
import bson
import os

current_path = os.path.dirname(__file__)

review_info = {
    'reviews_id': '',
    'customer': '',
    'customer_id': '',
    'date': '',
    'rating': 0,
    'product': '',
    'comment': '',
    'status': ''
}

products = ['乒乓球', '木门', '感冒药', '耳机', '平板', '手表', '手机', '苹果', '卷饼', '显示器', '手套', '电动车']
status = ['rejected', 'accepted', 'pending']

info = []
for i in range(101):
    fakeName = Faker("zh_CN").name()
    review_info['customer'] = fakeName
    review_info['customer_id'] = str(bson.ObjectId())
    for j in range(random.randint(0, 3)):
      review_info['reviews_id'] = str(bson.ObjectId())
      fakeDate = str(Faker().date_time_between(start_date="-10y", end_date="now", tzinfo=None))
      fakeText = Faker("zh_CN").text()
      review_info['date'] = fakeDate
      review_info['comment'] = fakeText
      review_info['rating'] = random.randint(1, 5)
      review_info['product'] = random.choice(products)
      review_info['status'] = random.choices(status, weights=[0.3, 0.45, 0.25], k=1)[0]
      info.append(copy.deepcopy(review_info))

random.shuffle(info)

json_str = json.dumps(info, indent=4, ensure_ascii=False)
with open(current_path + "/customerReview.json", 'w', encoding='utf-8') as json_file:
    json_file.write(json_str)
