#!/usr/bin/env bash
echo "clean folder dist"
rm ./dist/index.html
rm -rf ./dist/web/{install,js,php,install.php,res}

echo "copy folder [web]"
mkdir -p ./dist/web/js/
cat src/web/js/lib/jquery.min.js > ./dist/web/js/bundle.js
cat src/web/js/lib/{bootstrap.min.js,mustache.js,xss.js,wangEditor.min.js,md5.js,simplemde.min.js,card.js} >> ./dist/web/js/bundle.js
cat src/web/js/src/{01head.js,02function.js,03database.js,04main_page.js,05debug.js,06art.js,07main.js,08mgr.js} >> ./dist/web/js/bundle.js
cp -a ./src/web/{install,php,res,install.php} ./dist/web/
echo "copy index.html"
cat ./src/index/i01.html > ./dist/index.html
cat ./src/web/css/{bootstrap.min.css,simplemde.min.css,siplog.css} >> ./dist/index.html
cat ./src/index/i02.html >> ./dist/index.html
v=`md5sum ./dist/web/js/bundle.js`
echo -n ${v:0:32} >> ./dist/index.html
cat ./src/index/i03.html >> ./dist/index.html
cat ./src/web/template.html >> ./dist/index.html
cat ./src/index/i04.html >> ./dist/index.html

echo "done!"
