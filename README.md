# gulp-for-wordpress

## 使用技術

下記の環境で動作確認をしております。
 - WordPress 5.x
 - PHP 7.4.1
 - Gulp 4.0.2

### ローカル環境でワードプレスをセットアップするまで

WordPressのローカル環境構築は、Localを前提としています。 
1. [Local](https://localwp.com/)をインストール
1. インストール後新規サイトを作成(+マークから)
1. サイト名: なんでもOK
1. CONTINUE
1. WordPress Username, WordPress Passwordを入力（何でもOK）
1. ADD SITE

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload
$ npm run dev

# generate static project
$ npm run build
```

## tinypngについて
tinypngはAPIの登録が必要です。
API登録をして、gulpfileの`"YOUR API KEY"`を任意の値に変更してください。

## .gitignoreについて
distフォルダはgitignoreに入っています。
初回は、`npm run build`を実行して、distフォルダを作成するようにしてください。