#!/usr/bin/python
#
# Usage: python parse-a-z.py a-z.csv
# Generate json file, overwriting existing

import csv
import sys
import json
import re

OUTPUT_FILENAME = 'a-z.json'

f = open(sys.argv[1], 'rt')

results = []

try: 
    reader = csv.reader(f)
    reader.next()

    for row in reader:
        results.append({
            'categoryName': row[0],
            'url': re.sub(r"(https?://)?www.protecdirect.co.uk\/?", "/", row[1])
        })
finally:
    f.close()

try:
    # Write results as json to output file
    o = open(OUTPUT_FILENAME, 'w')
    o.write(json.dumps(results, indent=4, sort_keys=False))
finally:
    o.close()

