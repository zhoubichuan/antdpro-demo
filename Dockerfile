#设置构建的基础镜像
FROM node:16.15.0
# 设置工作目录
RUN mkdir -p /project/
WORKDIR /project/
COPY package*.json /project/
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN rm -rf node_modules && cd /project
#安装项目依赖
RUN cnpm install
COPY . /project/
CMD npm run dev
EXPOSE 8000
