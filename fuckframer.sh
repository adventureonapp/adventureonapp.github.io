#!/bin/bash

# Replace all </body> tags with the specified script tag and </body>
find . -name "*.html" -type f -exec sed -i '' 's|</body>|<script src="../../fuckframer.js"></script>\
</body>|g' {} \;

echo "Replacement complete! All </body> tags have been updated."