from django.core.management.base import BaseCommand
from django.db import IntegrityError
import os
import json
from shoes.models import Shoe


class Command(BaseCommand):
    help = 'Load shoes from web scraping data into the database'

    def handle(self, *args, **kwargs):

        mens_directory_path = '/Users/emilysaunders/Documents/web_scraper/shoe_data/mens_data'
        womens_directory_path = '/Users/emilysaunders/Documents/web_scraper/shoe_data/womens_data'

        for filename in os.listdir(mens_directory_path):
            file_path = os.path.join(mens_directory_path, filename)
            if filename.endswith('.json'):
                with open(file_path, 'r') as file:
                    data = json.load(file)

                    try: 
                        shoe = Shoe(
                            url=data['url'],
                            gender=data['gender'],
                            name=data['name'],
                            brand=data['brand'],
                            image_src=data['image_src'],
                            price=data['price'],
                            sizes=data['sizes'],
                            widths=data['widths'],
                            specs={
                                'weight': data['specs']['weight'],
                                'drop': data['specs']['drop'],
                                'stack': data['specs']['stack']
                            }
                        )
                        shoe.save()
                        self.stdout.write(self.style.SUCCESS(f"{filename} added to the database."))

                    except KeyError as e:
                        self.stdout.write(self.style.ERROR(f"Missing key {e} in file {filename}. Skipping this file."))

                    except IntegrityError as e:
                        self.stdout.write(self.style.ERROR(f"Integrity error for file {filename}: {e}. Skipping this file."))

        for filename in os.listdir(womens_directory_path):
            file_path = os.path.join(womens_directory_path, filename)
            if filename.endswith('.json'):
                with open(file_path, 'r') as file:
                    data = json.load(file)

                    try: 
                        shoe = Shoe(
                            url=data['url'],
                            gender=data['gender'],
                            name=data['name'],
                            brand=data['brand'],
                            image_src=data['image_src'],
                            price=data['price'],
                            sizes=data['sizes'],
                            widths=data['widths'],
                            specs={
                                'weight': data['specs']['weight'],
                                'drop': data['specs']['drop'],
                                'stack': data['specs']['stack']
                            }
                        )
                        shoe.save()
                        self.stdout.write(self.style.SUCCESS(f"{filename} added to the database."))

                    except KeyError as e:
                        self.stdout.write(self.style.ERROR(f"Missing key {e} in file {filename}. Skipping this file."))

                    except IntegrityError as e:
                        self.stdout.write(self.style.ERROR(f"Integrity error for file {filename}: {e}. Skipping this file."))