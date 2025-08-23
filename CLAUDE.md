# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 作業の注意点

- 修正はブランチを作成し、プルリクエストべースで行うこと
- Githubの操作
  - Github上のissueやプルリクエストへ記述
    - `【By ClaudeCode】` を接頭語としてつけること
    - 日本語で記述すること
    - issue に関連するプルリクエストを作成する場合は、説明欄に issue のリンクを添付すること
  - push前に以下の静的解析チェックを実施すること（CI/CDと同じチェック）
    - `npm run typecheck` - 型チェック
    - `npm run lint` - ESLintチェック
    - `npm run format:check` - Prettierフォーマットチェック
    - `npm test` - ユニットテスト実行
  - push後には `sleep 60` を実行することで1分間待機をし、プルリクエストのCI/CDが成功しているかを確認する
    - 成功している場合は次のタスクにとりかかる
    - 失敗している場合は原因を調査して修正を行う

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

### 初回セットアップ

1. **環境変数の設定**
   ```bash
   cp .env.sample .env
   # .envファイルを編集して必要な値を設定
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **Supabaseのローカル環境起動**（データベースを使用する場合）
   ```bash
   npx supabase start
   ```

### Dev Container

プロジェクトは `.devcontainer/devcontainer.json` で Dev Container 設定済み。VS Code で「Reopen in Container」を実行すると、Node.js 20 + 必要な拡張機能がインストールされた開発環境が起動します。

- **ポート転送**: 5173 (Vite), 8787 (Wrangler), 54321 (Supabase Studio), 54322 (PostgreSQL)
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

- `npx wrangler dev` - **推奨開発サーバー**（Hono統合環境、http://localhost:8787 で利用可能）
- `npm run build` - プロダクション用ビルドを作成
- `npm run preview` - プロダクションビルドをローカルでプレビュー
- `npm run typecheck` - TypeScript の型チェックを実行（Cloudflare 型定義生成、React Router 型生成、TypeScript コンパイラによるチェックを含む）

### デプロイ関連

- `npm run deploy` - ビルドして Cloudflare Workers に直接デプロイ
- `npx wrangler versions upload` - プレビュー URL にデプロイ
- `npx wrangler versions deploy` - バージョンをプロダクションに昇格

### テスト関連

- `npm test` - ユニットテストを実行
- `npm run test:ui` - Vitest UIでテストを実行
- `npm run test:coverage` - カバレッジレポート付きでテストを実行
- `npm run e2e` - E2Eテストを実行（Playwright）
- `npm run e2e:headed` - ブラウザ表示付きでE2Eテストを実行
- `npm run e2e:ui` - Playwright UIでE2Eテストを実行

### データベース関連

- `npx supabase start` - ローカルSupabase環境を起動
- `npx supabase stop` - ローカルSupabase環境を停止
- `npx drizzle-kit generate` - スキーマ変更からマイグレーションファイルを生成
- `npx supabase db reset` - データベースをリセットして全マイグレーションを再適用
- `npx drizzle-kit studio` - Drizzle Studioでデータベースを閲覧・編集

### コード品質

- `npm run lint` - ESLintでコード品質をチェック
- `npm run lint:fix` - ESLintエラーを自動修正
- `npm run format` - Prettierでコードをフォーマット
- `npm run format:check` - フォーマットの問題をチェック

### ユーティリティ

- `npm run cf-typegen` - Cloudflare Workers 用の型定義を生成

### ローカルCI実行（act）

GitHub Actionsワークフローをローカルで実行するため、[act](https://github.com/nektos/act)を導入済み。

**基本的な使用方法**:
- `act --list` - 利用可能なワークフローとジョブを表示
- `act --job lint` - lintジョブのみを実行
- `act --job typecheck` - typecheckジョブのみを実行
- `act --job test` - testジョブのみを実行
- `act --dryrun` - 実際に実行せずに実行計画を表示

**設定ファイル**: `.actrc` でApple M-seriesチップ対応とパフォーマンス最適化設定済み

**注意**: E2Eテストジョブ（`e2e-tests`）は依存関係が多く実行時間が長いため、ローカルでは個別のジョブ単位での実行を推奨

**重要**: `npm run dev` は使用しない。React Router v7 + hono-react-router-adapter との組み合わせで、Viteモジュールランナーエラー（"invoke was called before connect"）が発生するため、`npx wrangler dev` を使用する。

## アーキテクチャ概要

このプロジェクトは**React Router v7 + Hono + Cloudflare Workers**を使用したフルスタック React アプリケーションです。

### 主要技術スタック

- **React Router v7** - ルーティングと SSR
- **Hono** - WebフレームワークとAPI開発
- **hono-react-router-adapter** - HonoとReact Router v7の統合
- **Cloudflare Workers** - エッジでのサーバーサイド実行
- **Vite** - ビルドツール
- **TailwindCSS** - スタイリング
- **TypeScript** - 型安全性

### ディレクトリ構造

- `app/` - メインの React アプリケーションコード
  - `routes/` - ページコンポーネント（React Router のファイルベースルーティング）
  - `lib/` - 共通ライブラリ（Hono RPCクライアント等）
  - `root.tsx` - アプリケーションのルートレイアウト
  - `routes.ts` - ルート設定
- `server/` - Hono サーバーコード
  - `index.ts` - Hono アプリケーションのメインエントリーポイント
  - `routes/` - API ルート定義
  - `services/` - ビジネスロジック層
  - `middleware/` - 認証などのミドルウェア
  - `schemas/` - Zodバリデーションスキーマ
  - `db/` - データベース関連
    - `schema/` - Drizzle ORMスキーマ定義
    - `index.ts` - データベース接続設定
  - `lib/` - 共通ユーティリティ（Supabaseクライアント等）
  - `__tests__/` - サーバーサイドのユニットテスト
- `workers/` - Cloudflare Workers 用のエントリーポイント
- `public/` - 静的アセット
- `docs/` - プロジェクト関連ドキュメント
  - `web_business_card_requirements.md` - プロジェクト要件定義書
  - `landing-page-sample.html` - ランディングページの UI サンプル
  - `profile-sample.html` - プロフィールページの UI サンプル
- `supabase/` - Supabase設定とマイグレーション
  - `migrations/` - SQLマイグレーションファイル
  - `config.toml` - Supabase設定
- `tests/` - E2Eテスト（Playwright）

### 重要な設定ファイル

- `react-router.config.ts` - React Router の設定（SSR 有効化）
- `vite.config.ts` - ビルド設定（hono-react-router-adapter、Cloudflare、TailwindCSS、React Router プラグイン）
- `wrangler.jsonc` - Cloudflare Workers 設定
- `server/index.ts` - Hono アプリケーション設定（CORS、API ルート）
- `tsconfig.json` - TypeScript 設定

### アプリケーションアーキテクチャ

1. **SSR アーキテクチャ**: サーバーサイドレンダリングが有効で、初期 HTML 生成とハイドレーションを行う
2. **Hono統合**: hono-react-router-adapterによりHonoとReact Router v7が統合された環境
3. **型安全なAPI**: Hono RPCクライアントにより、サーバーとクライアント間の型安全性を確保
4. **エッジファースト**: Cloudflare Workers でグローバルエッジネットワーク上で実行
5. **型安全性**: TypeScript と React Router の型生成により、ルートとローダーの型安全性を確保
6. **モダンな React**: React 19 と React Router v7 の最新機能を活用
7. **認証システム**: Supabase Authによる認証管理（Google OAuth、メール/パスワード認証対応）
8. **データベース**: Drizzle ORM + Supabase (PostgreSQL) でデータ永続化

### 開発時の注意点

- **開発サーバーは `npx wrangler dev` を使用**（localhost:8787）
- 型チェックは`npm run typecheck`で実行（Cloudflare 型定義と React Router 型定義の生成を含む）
- `workers/app.ts`が Cloudflare Workers 用のエントリーポイント
- `server/index.ts`が Hono アプリケーションのメインエントリーポイント
- API開発時は `server/routes/` にルート定義を追加し、ユニットテストも併せて実装
- **認証が必要な画面への未ログイン時のアクセスは `/login` にリダイレクト**
- **ユーザー識別子には nano ID を使用**（公開 URL: `/{nanoid}` 形式）
- ユニットテストをカバレッジ高く実装すること
- **データベーススキーマを変更した場合**:
  1. `server/db/schema/` でスキーマを更新
  2. `npx drizzle-kit generate` でマイグレーションファイル生成
  3. `npx supabase db reset` でローカルDBに適用
- **APIエンドポイント追加時**:
  1. `server/routes/` に新規ルートファイル作成
  2. `server/schemas/` にZodスキーマ定義
  3. `server/services/` にビジネスロジック実装
  4. `server/__tests__/` または `server/routes/__tests__/` にユニットテスト追加

## UI/UX デザイン参考

- `docs/landing-page-sample.html` - ProfNode ランディングページのデザインサンプル（モダンなグラデーション、グラスモーフィズム効果）
- `docs/profile-sample.html` - Web 名刺プロフィールページのデザインサンプル（オーロラエフェクト、ソーシャルリンク）

## 環境変数

- `SUPABASE_URL` - Supabase プロジェクトのURL
- `SUPABASE_ANON_KEY` - Supabase 匿名キー
- `DATABASE_URL` - PostgreSQL接続文字列
- `VITE_SUPABASE_URL` - クライアント側用のSupabase URL
- `VITE_SUPABASE_ANON_KEY` - クライアント側用のSupabase匿名キー

ローカル開発では `.env.sample` をコピーして `.env` ファイルを作成し、適切な値を設定してください。

## トラブルシューティング

### 開発サーバーが起動しない場合
- `npm run dev` ではなく `npx wrangler dev` を使用する（React Router v7 + hono-react-router-adapter の互換性問題のため）

### 型エラーが発生する場合
1. `npm run cf-typegen` で Cloudflare Workers の型定義を再生成
2. `npm run typecheck` で全体の型チェックを実行

### データベース接続エラーの場合
1. `npx supabase status` でローカルSupabaseが起動しているか確認
2. 起動していない場合は `npx supabase start` で起動

### マイグレーションエラーの場合
1. `npx supabase db reset` でデータベースをリセット
2. 手動でマイグレーションを適用する場合は `npx supabase migration up`

## Other

- --dangerously-skip-permissions で起動されている場合は、タスクの完了時に通知音を鳴らすこと
