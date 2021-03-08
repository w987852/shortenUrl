# shortenUrl
shortenUrl Service

use Node.Js and Redis to create shortenUrl Service

1.創建短網址連結<br><br/>
2.進入短網址連結<br><br/>
---
3.取得短網址資料<br><br/>
---
TODO
4.定期清除逾期的資料<br><br/>
5.處理DDOS(透過限制IP或使用者用量)<br><br/>
---
## Install
Node.Js 12.13.1
1.  npm install pm2
2.  npm insall

## Run
1. In dev
    npm run start:dev
2. In prod
    npm run start:prod

## Develop
1.Run Redis
2.Run Project

## Folder Description
- app
    - controller: API routes 對應的邏輯處理
    - routes: API router 設定
    - services: 邏輯函式庫
    - models: DataBase 資料處理，包含schema設計等等(未使用)
- config
    - config, env: 環境參數設定
    - db: 初始化DB

- public, views: 處理畫面相關
