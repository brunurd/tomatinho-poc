@echo off

set NODE_ENV=development

concurrently "stylus src/style/main.styl -o src/style.min.css -w" "yarn electron"
