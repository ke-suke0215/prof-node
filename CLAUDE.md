# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 作業の注意点

- 作業が終わりユーザの入力を待つ前に、say コマンドを使って通知すること
- 修正はブランチを作成し、プルリクエストべースで行うこと
- Github上のissueやプルリクエストへ記述
  - `【By ClaudeCode】` を接頭語としてつけること
  - 日本語で記述すること
  - issue に関連するプルリクエストを作成する場合は、説明欄に issue のリンクを添付すること

## プロジェクト概要

**ProfNode** - エンジニア向け Web 名刺サービス

イベント等で名刺の代わりに URL を共有して自分のプロフィールを相手に伝えられる「web 名刺」のアプリケーションです。主なターゲットはソフトウェアエンジニアで、無料で提供されます。

## 機能要件（詳細は ./docs/web_business_card_requirements.md を参照）

### MVP (Must 機能)

- **基本レイアウト**: スマホファースト、PC 表示対応
- **ユーザー認証**: Google ログイン優先、パスワード認証補完
- **プロフィール機能**: 名前、職種、所属会社、メールアドレス
- **関連リンク登録**: GitHub、Twitter、LinkedIn、Qiita、Zenn、その他 URL
- **公開プロフィール**: `/{nanoid}` 形式の URL、誰でも閲覧可能

### Phase 2 (Better 機能)

- プロフィール画像登録
- QR コード生成・表示
- プライバシーポリシー・利用規約

### 画面構成

| パス              | 画面名             | 認証要否 |
| ----------------- | ------------------ | -------- |
| `/`               | ランディングページ | 不要     |
| `/login`          | ログイン画面       | 不要     |
| `/register`       | ユーザー登録       | 不要     |
| `/dashboard`      | マイページ         | 必要     |
| `/dashboard/edit` | プロフィール編集   | 必要     |
| `/{nanoid}`       | 公開プロフィール   | 不要     |

## 開発環境

### Dev Container

プロジェクトは `.devcontainer/devcontainer.json` で Dev Container 設定済み。VS Code で「Reopen in Container」を実行すると、Node.js 20 + 必要な拡張機能がインストールされた開発環境が起動します。

- **ポート転送**: 5173 (Vite), 8787 (Wrangler)
- **自動セットアップ**: `npm install` と `npm run cf-typegen` が自動実行
- **推奨拡張機能**: TypeScript, TailwindCSS, Prettier, ESLint 等

### Git 設定

Dev Container で git push 等を使用するための設定済み：

- **Git 設定ファイル**: ホストの `~/.gitconfig` をコンテナ内にマウント
- **SSH 鍵**: ホストの `~/.ssh` ディレクトリをコンテナ内にマウント
- **GitHub CLI**: `gh` コマンドが利用可能

**初回セットアップ手順**:

1. ホストマシンで Git と SSH 鍵を設定済みであることを確認
2. Dev Container を起動
3. 必要に応じて `gh auth login` で GitHub 認証を実行

## 開発コマンド

### 基本的な開発コマンド

- `npm run dev` - 開発サーバーを起動（HMR 付き、http://localhost:5173 で利用可能）
- `npm run build` - プロダクション用ビルドを作成
- `npm run preview` - プロダクションビルドをローカルでプレビュー
- `npm run typecheck` - TypeScript の型チェックを実行（Cloudflare 型定義生成、React Router 型生成、TypeScript コンパイラによるチェックを含む）

### デプロイ関連

- `npm run deploy` - ビルドして Cloudflare Workers に直接デプロイ
- `npx wrangler versions upload` - プレビュー URL にデプロイ
- `npx wrangler versions deploy` - バージョンをプロダクションに昇格

### ユーティリティ

- `npm run cf-typegen` - Cloudflare Workers 用の型定義を生成

## アーキテクチャ概要

このプロジェクトは**React Router v7 + Cloudflare Workers**を使用したフルスタック React アプリケーションです。

### 主要技術スタック

- **React Router v7** - ルーティングと SSR
- **Cloudflare Workers** - エッジでのサーバーサイド実行
- **Vite** - ビルドツール
- **TailwindCSS** - スタイリング
- **TypeScript** - 型安全性

### ディレクトリ構造

- `app/` - メインの React アプリケーションコード
  - `routes/` - ページコンポーネント（React Router のファイルベースルーティング）
  - `root.tsx` - アプリケーションのルートレイアウト
  - `routes.ts` - ルート設定
- `workers/` - Cloudflare Workers 用のエントリーポイント
- `public/` - 静的アセット
- `docs/` - プロジェクト関連ドキュメント
  - `web_business_card_requirements.md` - プロジェクト要件定義書
  - `landing-page-sample.html` - ランディングページの UI サンプル
  - `profile-sample.html` - プロフィールページの UI サンプル

### 重要な設定ファイル

- `react-router.config.ts` - React Router の設定（SSR 有効化）
- `vite.config.ts` - ビルド設定（Cloudflare、TailwindCSS、React Router プラグイン）
- `wrangler.jsonc` - Cloudflare Workers 設定
- `tsconfig.json` - TypeScript 設定

### アプリケーションアーキテクチャ

1. **SSR アーキテクチャ**: サーバーサイドレンダリングが有効で、初期 HTML 生成とハイドレーションを行う
2. **エッジファースト**: Cloudflare Workers でグローバルエッジネットワーク上で実行
3. **型安全性**: TypeScript と React Router の型生成により、ルートとローダーの型安全性を確保
4. **モダンな React**: React 19 と React Router v7 の最新機能を活用

### 開発時の注意点

- 型チェックは`npm run typecheck`で実行（Cloudflare 型定義と React Router 型定義の生成を含む）
- 開発時は localhost:5173 で実行されるが、実際のデプロイ先は Cloudflare Workers
- `workers/app.ts`が Cloudflare Workers 用のエントリーポイント
- **認証が必要な画面への未ログイン時のアクセスは `/login` にリダイレクト**
- **ユーザー識別子には nano ID を使用**（公開 URL: `/{nanoid}` 形式）
- ユニットテストをカバレッジ高く実装すること

## UI/UX デザイン参考

- `docs/landing-page-sample.html` - ProfNode ランディングページのデザインサンプル（モダンなグラデーション、グラスモーフィズム効果）
- `docs/profile-sample.html` - Web 名刺プロフィールページのデザインサンプル（オーロラエフェクト、ソーシャルリンク）

## Other

- --dangerously-skip-permissions で起動されている場合は、タスクの完了時に通知音を鳴らすこと
