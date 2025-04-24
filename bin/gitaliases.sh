# Adds an alias 'slm' to git to show commits
#
# Usage: `git slm "[AUTHOR]"`
# e.g.: `git slm "Damian Dawber"`
#
# Modified from https://helpfulsheep.com/2016-03-22-what-git-i-do-last-month/
git config --global alias.slm '!echo $(git log --author="$1" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse | grep commit | wc -l) commits, $(git log --author="$1" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} files? changed" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }") files changed, $(git log --author="$1" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} insertions?" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }") insertions and $(git log --author="$1" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} deletions?" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }") deletions last month'
