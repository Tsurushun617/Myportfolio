# Shun Tsuruoka Portfolio

鶴岡駿さんのポートフォリオサイト（静的サイト / HTML・CSS・Vanilla JS）。
サーバー費用ゼロで公開できる構成です。

## 構成

```
portfolio/
├─ index.html        … トップ（ヘッダー / KV / 実績 / プロフィール / Contact / フッター）
├─ works.html        … 実績一覧（すべて / Webサイト / LP で絞り込み）
├─ work.html         … 実績詳細（work.html?id=◯◯ で表示）
├─ about.html        … プロフィール詳細（経歴・スキル・価値観）
└─ assets/
   ├─ css/style.css        … デザイン（:root にカラー等のトークンを集約）
   ├─ js/works-data.js     … ★実績データ（ここを編集すれば一覧・詳細に反映）
   ├─ js/main.js           … 一覧描画・絞り込み・詳細描画・ナビ
   └─ images/works/        … 実績サムネ置き場（任意）
```

## 公開前にやること（プレースホルダの差し替え）

1. **メールアドレス** … `index.html` と `about.html` の `your-email@example.com`（2か所×各ページ＝計4か所）を実際のアドレスに。
2. **GitHub URL** … 全ページのフッター `https://github.com/` をご自身のGitHub URLに。
3. **実績の内容確認** … `assets/js/works-data.js` の `[要確認]` が付いた4件（inadog / azmas-tray / inochiryo / cinematic）のタイトル・説明・担当範囲をご確認・修正ください。
4. **プロフィール写真** … `PHOTO` のプレースホルダ部分。画像を使う場合は `index.html` / `about.html` の `.profile__photo` を `<img src="assets/images/profile.jpg" alt="鶴岡 駿">` に置き換え。
5. **実績サムネ（任意）** … 各サイトのスクショを `assets/images/works/` に置き、`works-data.js` の各 `thumb` にパスを指定（例: `"assets/images/works/matsuda.jpg"`）。未指定なら自動でプレースホルダ表示。

> ※電話番号・住所・生年月日は、公開サイトには載せていません（個人情報のため）。履歴書の情報をそのまま公開しないようご注意ください。

## 実績の追加・編集方法

`assets/js/works-data.js` の配列に1件追加するだけです。

```js
{
  id: "new-site",          // URLの ?id= に使う（半角英数）
  title: "サイト名",
  category: "website",      // "website" か "lp"
  catLabel: "Webサイト",
  role: "一人で制作",
  url: "https://example.com/",
  summary: "一覧カード用の短い説明",
  description: "詳細ページ用の説明",
  tech: ["HTML", "CSS / SCSS", "JavaScript"],
  thumb: ""                 // サムネ画像パス（空でOK）
}
```

## 無料で公開する（おすすめ順）

### A. GitHub Pages
1. GitHubで新規リポジトリを作成し、このフォルダの中身をpush。
2. リポジトリ Settings → Pages → Source を `main` ブランチ / `/ (root)` に設定。
3. 数分後 `https://ユーザー名.github.io/リポジトリ名/` で公開。

### B. Cloudflare Pages / Netlify
- リポジトリを連携するだけ。ビルド設定は不要（Build command 空欄、Publish directory はこのフォルダ）。
- 独自ドメインも無料で割り当て可能。

### ローカル確認
`file://` で直接開くと一部ブラウザで読み込み制限がかかる場合があるため、簡易サーバー推奨：

```bash
# このフォルダで
python3 -m http.server 8000
# → http://localhost:8000 を開く
```

## デザイン仕様（指定ブリーフ準拠）

- カラー：白/淡色ベース + アクセント。トークンは `style.css` の `:root` 参照。
- フォント：Noto Sans JP（日本語）/ Inter（英数）。
- 角丸14px、ホバーで `translateY(-2px)`＋弾むイージング、淡いシャドウ、広めの余白。
- `prefers-reduced-motion` 対応、キーボードフォーカス可視、レスポンシブ対応済み。
```
