@echo off

set NODE_ENV=development

concurrently "rollup -cw" "stylus src/style/main.styl -o src/style.min.css -w" "yarn electron"
