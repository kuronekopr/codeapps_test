# 実装タスク (Claude Code 用)

このチェックリストを使用して、React タイムシートアプリのシェルを実装してください。

- [ ] **セットアップ**: Tailwindの設定を確認し、ライブラリをインストールする:
  ```bash
  npm install lucide-react framer-motion react-hook-form @headlessui/react clsx tailwind-merge
  ```
- [ ] **Power Apps 環境接続**:
  - `pac auth list` で `env_codeapps` が選択されているか確認する。
  - ソリューション `Timesheet` が存在するか確認、または作成する。
- [ ] **プロジェクト構造**: `src/` 配下に以下のファイル構造が存在することを確認する:
  - `components/`
  - `hooks/`
  - `types/`

- [ ] **型定義**: `types/index.ts` を作成する:
  - `TimeEntry` (時間エントリー), `Project` (プロジェクト), `User` (ユーザー) のインターフェース。

- [ ] **モックデータ・フック**: `hooks/useTimesheet.ts` を作成する:
  - エントリー管理用の `useState`。
  - 初期状態用の `mockData` 配列。
  - 関数: `addEntry` (追加), `updateEntry` (更新), `deleteEntry` (削除)。

- [ ] **コンポーネント: LayoutWrapper**:
  - アニメーション付きグラデーション背景とグラスモーフィズムスタイルを持つメインコンテナを実装する。

- [ ] **コンポーネント: Header**:
  - アイコンには `lucide-react` を使用する。
  - レスポンシブレイアウト (モバイルでは縦並び `flex-col`, デスクトップでは横並び `flex-row`)。

- [ ] **コンポーネント: TimesheetGrid**:
  - 週次ビューには CSS Grid を使用する。
  - 曜日をマッピングして表示する。
  - 各セルに対して `TimeSlot` コンポーネントをレンダリングする。

- [ ] **コンポーネント: TimeEntryModal**:
  - `Headless UI` の Dialog (または類似のもの) を使用する。
  - `react-hook-form` を使用してロジカルなフォームを実装する。
  - モーダルコンテンツにグラスモーフィズムスタイルを適用する。

- [ ] **アニメーション統合**:
  - モーダルに `Framer Motion` の `AnimatePresence` を追加する。
  - グリッドアイテムに `layout` プロパティを追加して、並べ替えやサイズ変更をスムーズにする。

- [ ] **最終組み立て**:
  - すべてを `App.tsx` にインポートする。
  - ビルドエラーがゼロであることを確認する。

## スタイルガイド (Tailwind)
- **Glass (ガラス効果)**: `bg-white/10 backdrop-blur-md border border-white/20 shadow-xl`
- **Primary Gradient (メイングラデーション)**: `bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500`
- **Text (テキスト)**: `text-slate-800 dark:text-slate-100` (可能であればダークモード対応、そうでなければ一貫した高品質なライト/ダークテーマを維持)。
