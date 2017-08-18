# Please set this up as a precommit hook before you commit the first time:
# chmod +x pre-commit.sh && ln -s ../../pre-commit.sh .git/hooks/pre-commit

# stash unstaged changes
git stash -q --keep-index

# only format staged and unstaged files which have change
git diff -- name-only HEAD | grep ".*\.js(x?)" | xargs ./node_modules/.bin/prettier --single-quote true 'src/**/*.js*' --write

# stage formatted files
git add -u

# lint
npm run lint

# reapply unstaged changes
git stash pop -q