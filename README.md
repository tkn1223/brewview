# BrewView Project

## 💻 使用技術

- php 8.3
- larvel 11 系
- ChakuraUI
- JavaScript ES6 系以降
- React 18 系
- vite
- nginx
- docker

## 🏗️ プロジェクト構成

### ディレクトリ構造

```
brewview/                       # プロジェクトルート
├── .gitignore                  # Git除外設定
├── docker-compose.yml          # Docker Compose設定
├── docker-config/              # Docker設定ファイル
│   ├── php/                    # PHPコンテナ設定
│   │   ├── Dockerfile          # PHP 8.3 + FPM
│   │   └── php.ini             # PHP設定
│   ├── nginx/                  # Nginx設定
│   │   ├── Dockerfile          # Nginxコンテナ
│   │   └── default.conf        # Nginx設定
│   └── mariadb/                # MariaDB設定
│       └── data/               # データベースデータ（Git除外）
├── my-app/                     # Laravel v12.0.0 アプリケーション
│   ├── app/                    # アプリケーションロジック
│   ├── bootstrap/              # ブートストラップ
│   │   └── cache/              # キャッシュ（Git除外）
│   ├── config/                 # 設定ファイル
│   ├── database/               # データベース関連
│   ├── public/                 # 公開ファイル
│   ├── resources/              # リソースファイル
│   ├── routes/                 # ルート定義
│   ├── storage/                # ストレージ
│   │   ├── app/                # アプリケーションファイル
│   │   ├── framework/          # フレームワーク
│   │   │   ├── cache/          # キャッシュ（Git除外）
│   │   │   ├── sessions/       # セッション（Git除外）
│   │   │   ├── testing/        # テスト用
│   │   │   └── views/          # ビューキャッシュ（Git除外）
│   │   └── logs/               # ログファイル（Git除外）
│   ├── tests/                  # テストファイル
│   ├── vendor/                 # Composer依存関係（Git除外）
│   ├── composer.json           # Composer設定
│   ├── package.json            # Node.js設定
│   └── artisan                 # Laravelコマンド
└── README.md                   # このファイル
```
