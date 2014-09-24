# -*- coding: utf-8 -*-

"""
Import images from FLICKR

Either load from group:

python bin/import_flickr_images.py -g

Or (on the night) load for a user (specify uploaded since timestamp)
This should be run on cron, every 5 mins

python bin/import_flickr_images.py -u 1411479000



"""


import sys
import getopt
import json
from pymongo import MongoClient
from pymongo.errors import InvalidOperation
import flickr_api
from flickr_api.api import flickr

FLICKR_API_KEY = '3608750bb8733644f1b6b0ea75602330'
FLICKR_API_SECRET = '3399d3a72bf1023c'
FLICKR_USER_ID = '53906044@N04'
FLICKR_GROUP_ID = '2687808@N24'
FLICKR_PER_PAGE = 10

MONGO_DB = 'su2014'
MONGO_COLLECTION = 'specimens'

client = MongoClient()
db_collection = client[MONGO_DB][MONGO_COLLECTION]

help_message = '''
    Import flickr images into mongo
'''


class Usage(Exception):
    def __init__(self, msg):
        self.msg = msg


def main(argv=None):
    if argv is None:
        argv = sys.argv
    try:
        try:
            opts, args = getopt.getopt(argv[1:], "hgu:v", ["help", "group", "upload-min-date="])
        except getopt.error, msg:
            raise Usage(msg)
        args = {}
        # option processing
        for option, value in opts:
            if option == "-v":
                args['verbose'] = True
            if option in ("-h", "--help"):
                raise Usage(help_message)
            if option in ("-g", "--group"):
                args['group'] = True
            if option in ("-u", "--upload-min-date"):
                args['upload_min_date'] = value

        import_flickr_images(**args)

    except Usage, err:
        print >> sys.stderr, sys.argv[0].split("/")[-1] + ": " + str(err.msg)
        print >> sys.stderr, "\t for help use --help"
        return 2


def get_existing_images(group=False):
    """
    Get all existing images from MongoDB
    """

    if group:
        q = {'group': FLICKR_GROUP_ID}
    else:
        q = {'group': {'$exists': False}}

    cursor = db_collection.find(q, {'_id': 1})
    return [record['_id'] for record in cursor]


def import_flickr_images(verbose=False, group=False, upload_min_date=None):
    """
    Gets public photos from the Flickr group
    And adds them to mongo
    """

    flickr_api.set_keys(api_key=FLICKR_API_KEY, api_secret=FLICKR_API_SECRET)
    existing_images = get_existing_images(group)

    current_page = (len(existing_images) / FLICKR_PER_PAGE) + 1

    print 'Loading flickr images for page %s' % current_page

    params = {
        'format': 'json',
        'nojsoncallback': 1,
        'per_page': FLICKR_PER_PAGE,
        'page': current_page,
        'extras': 'url_l, url_o, path_alias'
    }

    if group:
        func = flickr.groups.pools.getPhotos
        params['group_id'] = FLICKR_GROUP_ID
    elif upload_min_date:
        func = flickr.photos.search
        params['user_id'] = FLICKR_USER_ID
        params['min_upload_date'] = upload_min_date
    else:
        raise Usage('If importing from user photostream, please specify min upload date')

    response = json.loads(func(**params))

    bulk = db_collection.initialize_unordered_bulk_op()

    count = 0

    print 'Total flickr images: %s' % response['photos']['total']
    print 'Total mongo images: %s' % len(existing_images)

    # Loop through all the tasks, adding them to the app
    for photo in response['photos']['photo']:

        if photo['id'] not in existing_images:

            if verbose:
                print photo

            record = dict(
                _id=photo['id'],
                flickrURL='http://www.flickr.com/photos/' + photo['pathalias'] + '/' + photo['id'],
            )

            # Not all photos have url_l - if not use the original
            try:
                record['url'] = photo['url_l']
            except KeyError:
                record['url'] = photo['url_o']

            # If group specified, add the group
            if group:
                record['group'] = FLICKR_GROUP_ID

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


if __name__ == "__main__":
    sys.exit(main())
