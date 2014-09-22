# -*- coding: utf-8 -*-

# Import images from FLICKR
# This should be run on cron, every 5 mins

import json
from pymongo import MongoClient
from pymongo.errors import InvalidOperation
import flickr_api
from flickr_api.api import flickr

FLICKR_API_KEY = '3608750bb8733644f1b6b0ea75602330'
FLICKR_API_SECRET = '3399d3a72bf1023c'
FLICKR_GROUP_ID = '2687808@N24'
FLICKR_PER_PAGE = 10

MONGO_DB = 'su2014'
MONGO_COLLECTION = 'specimens'

client = MongoClient()
db_collection = client[MONGO_DB][MONGO_COLLECTION]

def get_existing_images():
    """
    Get all existing images from MongoDB
    """
    cursor = db_collection.find({}, {'_id': 1})
    return [record['_id'] for record in cursor]


def import_flickr_images():

    """
    Gets public photos from the Flickr group
    And adds them to mongo
    """

    flickr_api.set_keys(api_key=FLICKR_API_KEY, api_secret=FLICKR_API_SECRET)

    existing_images = get_existing_images()

    current_page = (len(existing_images) / FLICKR_PER_PAGE) + 1

    print 'Loading flickr images for page %s' % current_page

    response = json.loads(flickr.groups.pools.getPhotos(
        group_id=FLICKR_GROUP_ID,
        format='json',
        nojsoncallback=1,
        per_page=FLICKR_PER_PAGE,
        page=current_page,
        extras='url_l, url_o, path_alias'
    ))

    bulk = db_collection.initialize_unordered_bulk_op()

    count = 0

    print 'Total flickr images: %s' % response['photos']['total']
    print 'Total mongo images: %s' % len(existing_images)

    # Loop through all the tasks, adding them to the app
    for photo in response['photos']['photo']:

        if photo['id'] not in existing_images:

            record = dict(
                _id=photo['id'],
                flickrURL='http://www.flickr.com/photos/' + photo['pathalias'] + '/' + photo['id'],
                dateAdded=photo['dateadded']
            )

            # Not all photos have url_l - if not use the original
            try:
                record['url'] = photo['url_l']
            except KeyError:
                record['url'] = photo['url_o']

            # Find and replace doc - inserting if it doesn't exist
            # This should never happen but we want to make sure
            bulk.find({'_id': record['_id']}).upsert().replace_one(record)

            count += 1

    if count:
        bulk.execute()
        print '%s images loaded to Mongo' % count
    else:
        if int(response['photos']['total']) == len(existing_images):
            print 'There are no images to load'
        else:
            print 'ERROR: No images to load'


if __name__ == '__main__':
    import_flickr_images()
