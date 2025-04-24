#!/bin/bash
git checkout master
git fetch
git branch --merged master | grep -v 'master$' | xargs git branch -d
git fetch --prune
