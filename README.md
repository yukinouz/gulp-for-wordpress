# gulp-for-wordpress

## 使用技術

下記の環境で動作確認をしております。

- node 18.12.1
- WordPress 5.x
- PHP 7.4.1
- Gulp 4.0.2

### ローカル環境でワードプレスをセットアップするまで

WordPress のローカル環境構築は、Local を前提としています。

1. [Local](https://localwp.com/)をインストール
1. インストール後新規サイトを作成(+マークから)
1. サイト名: なんでも OK
1. CONTINUE
1. WordPress Username, WordPress Password を入力（何でも OK）
1. ADD SITE
1. このリポジトリをテーマとして配置します。

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload
$ npm run dev

# generate static project
$ npm run build
```

## tinypng について

tinypng は API の登録が必要です。
API 登録をして、gulpfile の`"YOUR API KEY"`を任意の値に変更してください。

## .gitignore について

dist フォルダは gitignore に入っています。
初回は、`npm run build`を実行して、dist フォルダを作成するようにしてください。
