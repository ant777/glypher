
#!/bin/bash
# Squash the last 10 commits into one with a default commit message
git reset --soft HEAD~2
git commit -m "initial implementation"
git push -f
