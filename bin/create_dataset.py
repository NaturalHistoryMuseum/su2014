#!/usr/bin/env python
# encoding: utf-8
"""
Created by 'bens3' on 2013-06-21.
Copyright (c) 2013 'bens3'. All rights reserved.
"""

import sys
import os
import ckanapi
from ConfigParser import ConfigParser

config = ConfigParser()
config.read(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'config.cfg'))

def main():

    ckan = ckanapi.RemoteCKAN(config.get('ckan', 'site_url'), apikey=config.get('ckan', 'api_key'))

    package = {
        'name': 'su2014',
        'notes': u'Live transcriptions from Science Uncovered 2014',
        'title': "Crowdsourcing the Collection",
        'author': 'Science Uncovered visitors',
        'license_id': u'cc-by',
        'resources': [],
        'dataset_type': 'Specimen',
        'owner_org': config.get('ckan', 'owner_org')
    }

    fields = ['flickr_id', 'image_url', 'identifier', 'scientificName', 'locality', 'typeStatus', 'collector', 'collectionDate', 'created']

    try:
        # If the package exists, retrieve the resource
        package = ckan.action.package_show(id=package['name'])

    except ckanapi.NotFound:

        print("Package %s not found - creating", package['name'])

        # Create the package
        package = ckan.action.package_create(**package)
        # And create the datastore

        datastore = {
            'fields': [{'id': f, 'type': 'text'} for f in fields],
            'resource': {
                'name': 'Transcriptions',
                'description': 'Transcriptions data',
                'format': 'csv',
                'package_id': package['id']
            },
        }

        # API call to create the datastore
        datastore = ckan.action.datastore_create(**datastore)

        print("Created datastore resource %s",  datastore['resource_id'])


if __name__ == '__main__':
    main()

