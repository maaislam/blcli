#!/usr/bin/python
#
# Usage: python parse-brands.py brands.csv
# Generate json file, overwriting existing

import csv
import sys
import json
import re

OUTPUT_FILENAME = 'brands.json'

f = open(sys.argv[1], 'rt')

results = []

try: 
    reader = csv.reader(f)
    reader.next()

    for row in reader:
        results.append({
            'code': row[0],
            'brandName': row[1],
            'url': re.sub(r"(https?://)?www.protecdirect.co.uk\/?", "/", row[2])
        })

    results = sorted(results, key=lambda k: k['brandName'].lower())
finally:
    f.close()

try:
    # Write results as json to output file
    o = open(OUTPUT_FILENAME, 'w')
    o.write(json.dumps(results, indent=4, sort_keys=False))
finally:
    o.close()
