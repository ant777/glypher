
#!/bin/bash

# Usage: ./replace_names.sh /path/to/folder

FOLDER="./docs"

if [[ -z "$FOLDER" ]]; then
  echo "Usage: $0 /path/to/folder"
  exit 1
fi

# Get list of file names excluding .map and .cache
FILE_LIST=$(find "$FOLDER" -type f ! -name "*.map*" ! -name "*.cache*" -printf "%P\n")

# Format as JavaScript array
JS_ARRAY=$(printf "\"/glypher/%s\",\n" $FILE_LIST | sed '$ s/,$//' | sed ':a;N;$!ba;s/\n/\\n/g')
JS_ARRAY="[\n'/glypher/',$JS_ARRAY\n]"

# Find the target file (excluding .map files)
TARGET_FILE=$(find "$FOLDER" -type f -name "*service-worker*" ! -name "*.map*" | head -n 1)

if [[ -z "$TARGET_FILE" ]]; then
  echo "No matching service-worker file found."
  exit 1
fi

# Replace $NAMES$ in the target file
sed -i "s|\[\]|$JS_ARRAY|" "$TARGET_FILE"

echo "Replaced \$NAMES\$ in $TARGET_FILE with JS array of file names from $FOLDER"
