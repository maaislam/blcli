#!/usr/bin/python
#
# Usage: python parse-categories.py categories.csv
# Generate json file, overwriting existing
#
# Assumes client provides format as per attached csv
# Applicable to categories hierarchy 

import csv
import sys
import json
import re

OUTPUT_FILENAME = 'categories.json'

f = open(sys.argv[1], 'rt')

results = []

def get_bottom(results, level):
    """ Get the last element in our results array for given level """
    if(len(results) == 0):
        return False

    lastItem = results[len(results) - 1]

    if(level <= 1):
        return lastItem
    else:
        if('children' in lastItem and len(lastItem['children']) > 0):
            return get_bottom(lastItem['children'], level - 1)
        else:
            return lastItem

try: 
    # Parse CSV into hierarchical JSOn
    reader = csv.reader(f)

    # Identify number of levels (using csv header row)
    # This has the benefit of being 
    headerRow = reader.next()
    levels = len(headerRow) + 1 / 2

    # Break each csv row into pairs of tuples each corresponding to a level
    # [(cat, link), (cat, link), (cat, link), ...]
    # and iterate over each tuple set to build levels
    for row in reader:
        rowPairs = [row[i:i+2] for i in xrange(0,len(row),2)];
        for idx, pair in enumerate(rowPairs):
            cat = pair[0]
            link = re.sub(r"(https?://)?www.protecdirect.co.uk\/?", "/", pair[1])
            level = idx

            if(cat):
                bottom = get_bottom(results, idx)

                if(idx == 0):
                    results.append({
                        'url': link,
                        'title': cat,
                        'children': []
                    })
                elif(bottom and 'children' in bottom):
                    bottom['children'].append({
                        'url': link,
                        'title': cat,
                        'children': []
                    })
finally: 
    f.close()

try:
    # Write results as json to output file
    o = open(OUTPUT_FILENAME, 'w')
    o.write(json.dumps(results, indent=4, sort_keys=False))
finally:
    o.close()

