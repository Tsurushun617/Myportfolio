/* =========================================================
   実績データ（ここを編集すれば一覧・詳細ページに反映されます）
   - title       : サイト名
   - category    : "website" または "lp"（絞り込みに使用）
   - catLabel    : 画面に出るカテゴリ名
   - role        : 担当範囲（例: 一人で制作 / 共同で制作）
   - url         : 実際のサイトURL
   - summary     : 一覧カード用の短い説明（1〜2行）
   - description : 詳細ページ用の説明
   - tech        : 使用言語・技術（配列）
   - thumb       : サムネ画像パス（assets/images/works/ に置いて指定。空ならプレースホルダ表示）

   ※業種・説明・担当範囲は鶴岡さんご自身でご確認のうえ、適宜修正してください。
     アクセス制限で内容を取得できなかったものは [要確認] と記載しています。
   ========================================================= */

const WORKS = [
  {
    id: "matsuda-motors",
    title: "松田自動車整備工場",
    category: "website",
    catLabel: "Webサイト",
    role: "一人で制作",
    url: "https://matsuda-motors.com/",
    summary: "墨田区・1956年創業の自動車整備工場。車検から板金塗装、保険、車両販売までワンストップで訴求するコーポレートサイト。",
    description: "墨田区スカイツリー近くの地域密着型整備工場のコーポレートサイト。車検・修理・板金塗装・保険・車両販売という幅広いサービスを、来店前のユーザーが迷わず辿れる導線設計で構成しました。デザインカンプの再現からCMS実装まで一人で担当。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    thumb: ""
  },
  {
    id: "bincho",
    title: "佐藤燃料（紀州備長炭）",
    category: "website",
    catLabel: "Webサイト",
    role: "共同で制作",
    url: "https://bincho.co.jp/",
    summary: "紀州備長炭をはじめとする木炭の専門商社サイト。飲食店向けの商品ラインナップと品質のこだわりを発信。",
    description: "紀州備長炭など国産・輸入木炭を扱う専門商社のWebサイト。飲食店（蒲焼・串焼き店など）の業務用ニーズに向けて、炭の種類や特長をわかりやすく整理しました。チームでの共同制作。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    thumb: ""
  },
  {
    id: "sakubuncafe",
    title: "あおぞら作文教室",
    category: "website",
    catLabel: "Webサイト",
    role: "共同で制作",
    url: "https://sakubuncafe.com/",
    summary: "子どもの「書く力」と自己肯定感を育てる作文教室のサイト。教室の理念とあたたかい世界観を表現。",
    description: "子ども向け作文教室のコーポレートサイト。「遊びの中に学びがある」という教室の教育理念を、やわらかいトーンのデザインで表現しました。チームでの共同制作。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    thumb: ""
  },
  {
    id: "inadog",
    title: "ドッグサービスサイト [要確認]",
    category: "website",
    catLabel: "Webサイト",
    role: "共同で制作",
    url: "https://inadog.com/",
    summary: "犬向けサービスのWebサイト。（※内容を取得できなかったため、説明・タイトルはご確認ください）",
    description: "犬関連サービスのWebサイト制作にチームの一員として参加。※サイト内容を自動取得できなかったため、業種・概要は鶴岡さんにて加筆・修正をお願いします。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    thumb: ""
  },
  {
    id: "azmas-tray",
    title: "アズマ商事 トレー商品LP [要確認]",
    category: "lp",
    catLabel: "LP",
    role: "一人で制作",
    url: "https://azmas.co.jp/tray_lp/",
    summary: "商品ランディングページ。訴求から問い合わせまでを1ページで完結させる構成を一人で実装。",
    description: "商品紹介のランディングページ。ファーストビューでの訴求からCTAまでの流れを意識し、一人で制作しました。※商品・社名はご確認のうえ修正してください。",
    tech: ["HTML", "CSS / SCSS", "JavaScript"],
    thumb: ""
  },
  {
    id: "inochiryo",
    title: "命寮（inochiryo）LP [要確認]",
    category: "lp",
    catLabel: "LP",
    role: "一人で制作",
    url: "https://i-icf.co.jp/inochiryo/",
    summary: "サービス紹介のランディングページを一人で制作。（※内容はご確認ください）",
    description: "サービス紹介のランディングページを一人で制作。※サービス名・概要は鶴岡さんにてご確認・加筆をお願いします。",
    tech: ["HTML", "CSS / SCSS", "JavaScript"],
    thumb: ""
  },
  {
    id: "taniguchi-oem",
    title: "谷口化学 OEMページ",
    category: "website",
    catLabel: "Webページ",
    role: "一人で制作",
    url: "https://taniguchi-kagaku.com/pages/oem",
    summary: "化学メーカーのOEM紹介ページ。ShopifyのLiquidテンプレートで実装し、BtoBの問い合わせ導線を設計。",
    description: "化学メーカーのOEM事業を紹介するページ。Shopify（Liquid）上で、BtoB向けに事業の強みと問い合わせ導線を整理して一人で実装しました。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "Shopify", "Liquid"],
    thumb: ""
  },
  {
    id: "cinematic",
    title: "Cinematic [要確認]",
    category: "website",
    catLabel: "Webサイト",
    role: "共同で制作",
    url: "https://www.cinematic.jp/",
    summary: "コーポレート／サービスサイトをチームで共同制作。（※内容はご確認ください）",
    description: "Webサイトの制作にチームの一員として参加。※事業内容・概要は鶴岡さんにてご確認・加筆をお願いします。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    thumb: ""
  }
];

/* CommonJS / ブラウザ両対応（編集ツールでの読み込み用） */
if (typeof module !== "undefined" && module.exports) { module.exports = WORKS; }
