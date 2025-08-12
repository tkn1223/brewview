# BrewView Project

## 🏗️ プロジェクト構成

### ディレクトリ構造

```
brewview/                          # プロジェクトルート
├── .gitignore                    # Git除外設定
├── docker-compose.yml            # Docker Compose設定
├── docker-config/                # Docker設定ファイル
│   ├── php/                     # PHPコンテナ設定
│   │   ├── Dockerfile          # PHP 8.3 + FPM
│   │   └── php.ini             # PHP設定
│   ├── nginx/                   # Nginx設定
│   │   ├── Dockerfile          # Nginxコンテナ
│   │   └── default.conf        # Nginx設定
│   └── mariadb/                 # MariaDB設定
│       └── data/                # データベースデータ（Git除外）
├── my-app/                      # Laravel v12.0.0 アプリケーション
│   ├── app/                     # アプリケーションロジック
│   ├── bootstrap/               # ブートストラップ
│   │   └── cache/              # キャッシュ（Git除外）
│   ├── config/                  # 設定ファイル
│   ├── database/                # データベース関連
│   ├── public/                  # 公開ファイル
│   ├── resources/               # リソースファイル
│   ├── routes/                  # ルート定義
│   ├── storage/                 # ストレージ
│   │   ├── app/                 # アプリケーションファイル
│   │   ├── framework/           # フレームワーク
│   │   │   ├── cache/          # キャッシュ（Git除外）
│   │   │   ├── sessions/       # セッション（Git除外）
│   │   │   ├── testing/        # テスト用
│   │   │   └── views/          # ビューキャッシュ（Git除外）
│   │   └── logs/               # ログファイル（Git除外）
│   ├── tests/                   # テストファイル
│   ├── vendor/                  # Composer依存関係（Git除外）
│   ├── composer.json            # Composer設定
│   ├── package.json             # Node.js設定
│   └── artisan                  # Laravelコマンド
└── README.md                    # このファイル
```

## 🐳 Docker 環境

### サービス構成

- **web** (PHP-FPM 8.3): ポート 5173
- **nginx**: ポート 81
- **mariadb**: ポート 3306

### 重要な設定

- PHP 8.3-fpm を使用（Laravel v12.0.0 要件）
- 権限設定は起動時に実行
- ボリュームマウント: `./my-app:/var/www/`

## 📁 ファイルパスのルール

### AI アシスタント向け重要事項

1. **プロジェクトルート**: `/home/tkn1223/proc/laravel/brewview`
2. **Laravel アプリ**: `my-app/` サブディレクトリ内
3. **Docker 設定**: `docker-config/` ディレクトリ内
4. **相対パス**: プロジェクトルートからの相対パスを使用

### パス例

- Laravel 設定: `my-app/config/`
- ストレージ: `my-app/storage/`
- PHP 設定: `docker-config/php/Dockerfile`
- Nginx 設定: `docker-config/nginx/default.conf`

## 🔧 Git ファイル管理

### Git 関連ファイルの配置

```
brewview/                          # プロジェクトルート
├── .gitignore                    # Git除外設定（プロジェクト全体）
├── .gitattributes                # Git属性設定（プロジェクト全体）
└── .git/                         # Gitリポジトリ
```

### 配置理由

- **`.gitignore`**: プロジェクト全体の除外ルールを管理

  - `my-app/vendor/`, `my-app/storage/` など
  - `docker-config/mariadb/data/` など

- **`.gitattributes`**: プロジェクト全体のファイル属性を統一
  - 改行コードの統一（LF）
  - バイナリファイルの適切な扱い
  - 言語別の diff 設定

### 注意事項

- **Laravel 固有の Git ファイル**: `my-app/.gitignore` は不要
- **プロジェクトルート**: 全サブディレクトリに適用される
- **相対パス**: `my-app/` プレフィックスで Laravel ファイルを指定

## 🔒 権限設定

### 重要なディレクトリ（777 権限）

- `my-app/storage/` - 全ストレージ
- `my-app/bootstrap/cache/` - ブートストラップキャッシュ
- `my-app/storage/framework/views/` - ビューキャッシュ
- `my-app/storage/framework/cache/` - フレームワークキャッシュ
- `my-app/storage/framework/sessions/` - セッションファイル
- `my-app/storage/logs/` - ログファイル

## 🚀 開発コマンド

### Docker 操作

```bash
# ビルド
docker-compose build --no-cache

# 起動
docker-compose up -d

# 停止
docker-compose down

# ログ確認
docker-compose logs web
```

### Laravel 操作

```bash
# コンテナ内で実行
docker-compose exec web php artisan

# 権限設定（ホスト側）
sudo chown -R $USER:$USER ./my-app/storage
sudo chmod -R 777 ./my-app/storage
sudo chmod -R 777 ./my-app/bootstrap/cache
```

## ⚠️ 注意事項

1. **Git 除外**: `.gitignore`はプロジェクトルートに配置
2. **パス指定**: Laravel ファイルは `my-app/` プレフィックスが必要
3. **権限問題**: ストレージディレクトリの権限設定が重要
4. **PHP 8.3**: Laravel v12.0.0 の要件を満たす

## 🔧 トラブルシューティング

### よくある問題

- **権限エラー**: ストレージディレクトリの権限を確認
- **ビルドエラー**: PHP 8.3-fpm の使用を確認
- **パスエラー**: `my-app/` プレフィックスの有無を確認

---

**AI アシスタント向け**: このプロジェクトでは、Laravel アプリケーションが `my-app/` サブディレクトリに配置されているため、ファイルパスを指定する際は常にこのプレフィックスを考慮してください。

#使用技術

- php 8.3
- larvel 11 系
- ChakuraUI
- JavaScript ES6 系以降
- React 18 系
- vite
- nginx
- docker
