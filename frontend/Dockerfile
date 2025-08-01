# --- 第一階段: 建置階段 (Builder) ---
# 目標：在一個包含 Node.js 的完整環境中，產生最終的靜態檔案。
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN echo "--- Listing files in /app directory ---"
RUN ls -la
RUN echo "--- Displaying content of package.json ---"
RUN cat package.json
RUN echo "================== 除錯結束 =================="
RUN npm install
COPY . .
RUN npm run build # 在這裡完成建置，產生 /app/dist 資料夾

# --- 第二階段: 生產階段 (Production) ---
# 目標：在一個極輕量的 Nginx 環境中，只存放並提供第一階段的產物。
FROM nginx:1.27-alpine
# 只從第一階段拿走我們唯一需要的東西：編譯好的 /app/dist 資料夾
COPY --from=builder /app/dist /usr/share/nginx/html
# 複製 Nginx 設定檔
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 開放 80 埠並啟動 Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]