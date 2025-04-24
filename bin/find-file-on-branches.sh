git config --global alias.find-file-local '!for branch in $(git for-each-ref --format="%(refname)" refs/heads); do if git ls-tree -r --name-only $branch | grep "$1" > /dev/null; then  echo "${branch}:"; git ls-tree -r --name-only $branch | nl -bn -w3 | grep "$1"; fi; done; :'

git config --global alias.find-file '!for branch in $(git for-each-ref --format="%(refname)" refs/remotes); do if git ls-tree -r --name-only $branch | grep "$1" > /dev/null; then  echo "${branch}:"; git ls-tree -r --name-only $branch | nl -bn -w3 | grep "$1"; fi; done; :'

