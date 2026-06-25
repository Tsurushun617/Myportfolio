/* =========================================================
   実績データ（ここを編集すれば一覧・詳細ページに反映されます）
   - title       : サイト名
   - category    : "website" または "lp"（絞り込みに使用）
   - catLabel    : 画面に出るカテゴリ名
   - role        : 担当範囲（例: 単独制作 / チーム制作）
   - url         : 実際のサイトURL
   - summary     : 一覧カード用の短い説明（1〜2行）
   - description : 詳細ページ用の説明
   - tech        : 使用言語・技術（配列）
   - tracking    : 計測ツール等（任意）{ name: 項目名, work: 担当内容 } の配列
   - thumb       : サムネ画像パス（assets/images/works/ に置いて指定。空ならプレースホルダ表示）

   ※業種・説明・担当範囲は鶴岡さんご自身でご確認のうえ、適宜修正してください。
     アクセス制限で内容を取得できなかったものは [要確認] と記載しています。
   ========================================================= */

const ANALYTICS_SETUP = [
  { name: "Google Analytics", work: "設置・初期設定" },
  { name: "Google Tag Manager", work: "設置・初期設定・キーイベント設定" },
  { name: "Microsoft Clarity", work: "設置・初期設定" }
];

const WORKS = [
  {
    id: "matsuda-motors",
    title: "松田自動車整備工場",
    category: "website",
    catLabel: "Webサイト",
    role: "単独制作",
    url: "https://matsuda-motors.com/",
    summary: "墨田区・1956年創業の自動車整備工場。車検から板金塗装、保険、車両販売までワンストップで訴求するコーポレートサイト。",
    description: "墨田区スカイツリー近くの地域密着型整備工場のコーポレートサイト。車検・修理・板金塗装・保険・車両販売という幅広いサービスを、来店前のユーザーが迷わず辿れる導線設計で構成しました。デザインカンプの再現からCMS実装まで一人で担当。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    tracking: ANALYTICS_SETUP,
    thumb: "assets/images/works/matsuda-motors.jpg"
  },
  {
    id: "bincho",
    title: "佐藤燃料（紀州備長炭）",
    category: "website",
    catLabel: "Webサイト",
    role: "チーム制作",
    url: "https://bincho.co.jp/",
    summary: "紀州備長炭をはじめとする木炭の専門商社サイト。飲食店向けの商品ラインナップと品質のこだわりを発信。",
    description: "紀州備長炭など国産・輸入木炭を扱う専門商社のWebサイト。飲食店（蒲焼・串焼き店など）の業務用ニーズに向けて、炭の種類や特長をわかりやすく整理しました。チームでの共同制作。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    tracking: ANALYTICS_SETUP,
    thumb: "assets/images/works/bincho.jpg"
  },
  {
    id: "sakubuncafe",
    title: "あおぞら作文教室",
    category: "website",
    catLabel: "Webサイト",
    role: "チーム制作",
    url: "https://sakubuncafe.com/",
    summary: "子どもの「書く力」と自己肯定感を育てる作文教室のサイト。教室の理念とあたたかい世界観を表現。",
    description: "子ども向け作文教室のコーポレートサイト。「遊びの中に学びがある」という教室の教育理念を、やわらかいトーンのデザインで表現しました。チームでの共同制作。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    thumb: "assets/images/works/sakubuncafe.jpg"
  },
  {
    id: "inadog",
    title: "inadog",
    category: "website",
    catLabel: "Webサイト",
    role: "チーム制作",
    url: "https://inadog.com/",
    summary: "中小企業の経営者向けYouTube運用サポートを提供するコーポレートサイト。代表・稲田の実績とサービス内容を訴求。",
    description: "中小企業の経営者向けにYouTube運用の相談・伴走支援を行うinadogのコーポレートサイト。Inc-Tubeなどのサービス紹介、事例・お客様の声、セミナー情報などを整理し、チームの一員として制作に参加しました。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    thumb: "assets/images/works/inadog.jpg"
  },
  {
    id: "azmas-tray",
    title: "吾嬬製作所 トレー商品LP",
    category: "lp",
    catLabel: "LP",
    role: "単独制作",
    url: "https://azmas.co.jp/tray_lp/",
    summary: "墨田区で創業100年超の真空成型メーカー・吾嬬製作所のトレー商品LP。小ロット・オーダーメイドの強みを訴求。",
    description: "株式会社吾嬬製作所のプラスチックトレー・真空成型試作を紹介するランディングページ。創業1924年の技術力と、小ロット・オーダーメイドへの対応力をファーストビューから問い合わせ導線まで一貫して訴求する構成を、単独制作しました。",
    tech: ["HTML", "CSS / SCSS", "JavaScript"],
    thumb: "assets/images/works/azmas-tray.jpg"
  },
  {
    id: "inochiryo",
    title: "命寮（inochiryo）LP [要確認]",
    category: "lp",
    catLabel: "LP",
    role: "単独制作",
    url: "https://i-icf.co.jp/inochiryo/",
    summary: "サービス紹介のランディングページを単独制作。（※内容はご確認ください）",
    description: "サービス紹介のランディングページを単独制作。※サービス名・概要は鶴岡さんにてご確認・加筆をお願いします。",
    tech: ["HTML", "CSS / SCSS", "JavaScript"],
    thumb: "assets/images/works/inochiryo.jpg"
  },
  {
    id: "taniguchi-oem",
    title: "ライオン靴クリーム OEMページ",
    category: "website",
    catLabel: "Webページ",
    role: "単独制作",
    url: "https://taniguchi-kagaku.com/pages/oem",
    summary: "ライオン靴クリーム本舗のOEM紹介ページ。ShopifyのLiquidテンプレートで実装し、BtoBの問い合わせ導線を設計。",
    description: "ライオン靴クリーム本舗のOEM事業を紹介するページ。Shopify（Liquid）上で、BtoB向けに事業の強みと問い合わせ導線を整理して一人で実装しました。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "Shopify", "Liquid"],
    tracking: ANALYTICS_SETUP,
    thumb: "assets/images/works/taniguchi-oem.jpg"
  },
  {
    id: "cinematic",
    title: "Cinematic [要確認]",
    category: "website",
    catLabel: "Webサイト",
    role: "チーム制作",
    url: "https://www.cinematic.jp/",
    summary: "コーポレート／サービスサイトをチームで共同制作。（※内容はご確認ください）",
    description: "Webサイトの制作にチームの一員として参加。※事業内容・概要は鶴岡さんにてご確認・加筆をお願いします。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    thumb: "assets/images/works/cinematic.jpg"
  }
];

/* CommonJS / ブラウザ両対応（編集ツールでの読み込み用） */
if (typeof module !== "undefined" && module.exports) { module.exports = WORKS; }
