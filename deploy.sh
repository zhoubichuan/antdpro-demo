# 1.发布到master分支
git add -A
git commit -m '🐛 fix(compiler): master'
git remote add gitee https://gitee.com/zhoubichuan/antdpro-demo.git
git pull gitee master
git push gitee master

# 2.打包
npm run src:build

cd dist
# 3.发布到gh-pages分支
git init
git checkout --orphan gh-pages
git add .
git commit -m '🐛 fix(compiler): gh-pages'
git remote add gitee https://gitee.com/zhoubichuan/antdpro-demo.git
git push -f gitee gh-pages

# 4.返回初始目录
cd -

# # 1.发布到master分支
git add -A
git commit -m '🐛 fix(compiler): master'
git remote add github https://github.com/zhoubichuan/antdpro-demo.git
git pull github master
git push github master

# 2.打包
npm run build

# 3.进入打包目录
cd dist

# 4.发布到gh-pages分支
git init
git checkout --orphan gh-pages
git add .
git commit -m '🐛 fix(compiler): gh-pages'
git remote add github https://github.com/zhoubichuan/antdpro-demo.git
git push -f github gh-pages

# 5.返回初始目录
cd -