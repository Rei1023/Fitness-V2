# Fitness V2

這是一個使用 React + TypeScript + Vite 構建的健身訓練應用程式。

## 專案設置 (Project Setup)

### 1. 安裝依賴 (Install Dependencies)

請確保您已安裝 [Node.js](https://nodejs.org/) (建議 v18 或更高版本)。

在專案根目錄執行：

```bash
npm install
```

### 2. 環境變數 (Environment Variables)

請複製 `.env.example` (如果有的話) 並命名為 `.env`，填入必要的環境變數。

```bash
# 範例
VITE_API_KEY=your_api_key
```

### 3. 啟動開發伺服器 (Development)

啟動本地開發伺服器：

```bash
npm run dev
```

瀏覽器打開 `http://localhost:3000` (或終端機顯示的埠號) 即可預覽。

## 部署 (Deployment)

本專案已配置 GitHub Actions 以自動部署至 GitHub Pages。

### 手動構建 (Build)

若要手動構建生產版本：

```bash
npm run build
```

構建產物位於 `dist` 資料夾。

### 自動部署流程

當代碼推送到 `main` 分支時，GitHub Action 會自動觸發：
1. 安裝依賴 (`npm ci`)
2. 構建專案 (`npm run build`)
3. 上傳構建產物 (`dist`)
4. 部署至 GitHub Pages  

**注意**：請確保 GitHub Repository 的 Settings -> Pages -> Source 設置為 "GitHub Actions"。

## 專案結構 

- `src/`: 原始碼
- `public/`: 靜態資源 
- `.github/workflows/`: CI/CD 配置
