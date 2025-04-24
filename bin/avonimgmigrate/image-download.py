import re
import os
import urllib

TARGET = 'source.txt'

def download_url(url, root, filename=None):
    """Download a file from a url and place it in root.
    Args:
        url (str): URL to download file from
        root (str): Directory to place downloaded file in
        filename (str, optional): Name to save the file under. If None, use the basename of the URL
    """

    root = os.path.expanduser(root)
    if not filename:
        filename = os.path.basename(url)
    fpath = os.path.join(root, filename)

    try:
        print('Downloading ' + url + ' to ' + fpath)
        urllib.urlretrieve(url, fpath)
    except () as e:
        print('Failed download.')

# Replace in file and trigger downloads
pattern_full = re.compile(r"https://service.maxymiser.net/cm/images-eu/avon-mas/(.+?\.)(jpg|png|gif|svg)(\?meta=.*?\.(jpg|png|gif|png|svg))?", re.IGNORECASE)
replacement = r'https://ucds.ams3.digitaloceanspaces.com/avmig/\1\2'

result = []
newfile = ""

with open (TARGET) as jsfile:
    for line in jsfile:
        matches = pattern_full.findall(line)

        newfile += re.sub(pattern_full, replacement, line) + '\n'

        if matches:
            for m in matches:
                result.append("https://service.maxymiser.net/cm/images-eu/avon-mas/" + m[0] + m[1])

for r in result:
    print(r)
    download_url(r, os.getcwd() + '\downloads')

output = open('output.txt', 'w')
output.write(newfile)
