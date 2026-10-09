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
   - effort      : 工数比較（任意）{ items: [{ label, hours }], notes: [注記] }
                   items の1件目を比較の基準とし、2件目との差から削減率を表示
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
    id: "tkf",
    title: "東京ニットファッション工業組合（TKF）",
    category: "website",
    catLabel: "Webサイト",
    role: "単独改修",
    url: "https://www.tkf.or.jp/recruit/",
    summary: "既存の組合サイトへ人材募集セクションを追加。トップ・下層6ページ・バナー3種を、Claude Codeを使って単独で実装しました。",
    description: "東京ニットファッション工業組合（TKF）の既存WordPressサイトに、人材募集セクションを追加しました。人材募集トップ（ヒーロー、仕事紹介、インタビュー、研修制度、職場環境の取り組み、募集企業、CTA）に加え、インタビュー・職場環境・募集企業の一覧と詳細、計6つの下層ページ、バナー3種を既存テーマへ組み込んでいます。記事詳細はコラムモジュール（3列グリッド、タグ、ページ送り、目次の自動生成）として実装し、グローバルナビの導線も人材募集へ差し替えました。ランドマークや表の見出し、代替テキストなどのアクセシビリティ対応と、デザインカンプとの表示差分の修正、社内チェックバック対応まで、Claude Codeを活用して単独で進めています。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP", "Claude Code"]
  },
  {
    id: "arusen",
    title: "株式会社アルセン",
    category: "website",
    catLabel: "Webサイト",
    role: "単独制作",
    url: "https://arusen.com/",
    summary: "独自技術で機能性素材を開発する株式会社アルセンのコーポレートサイト。Figma MCP × Claude Code を活用し、単独制作・5営業日で納品しました。",
    description: "「独自技術の融複合で、新たな製品価値を作る」を掲げる株式会社アルセンのコーポレートサイト。「暗所イオン触媒」「スマート繊維 IoniQue-EX」「真軸インソール／Magic Insole」という3つのコア技術と研究開発のエビデンスを整理し、アパレル・寝具・フットウェアなどのメーカーからOEM・共同開発の相談につながる導線を設計しました。Figma MCPでデザインカンプから実装値を直接取得し、Claude Codeによる実装・検証を組み合わせることで、単独制作でありながら5営業日での納品を実現しています。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP", "Figma MCP", "Claude Code"],
    tracking: [
      { name: "Google Analytics", work: "設置・初期設定" },
      { name: "Google Tag Manager", work: "設置・初期設定・キーイベント設定" }
    ],
    effort: {
      items: [
        { label: "人間のみで制作した場合（想定工数）", hours: 60 },
        { label: "Claude Code を活用した場合", hours: 52 }
      ],
      notes: [
        "対象範囲：TOP・会社概要・開発ストーリー・暗所イオン触媒・OEM・よくある質問・ニュース・コラム・お問い合わせ・英語版会社概要など、公開済みの範囲。",
        "想定工数は、ページ別のコーディング工数に、環境構築・画像処理・モジュール設計・CMS設定・公開作業・修正対応の共通作業を加えた54〜67hの中央値。",
        "Claude Code 活用時の工数は、作業ログの稼働時間と作業日数（計17日）から算出。構造化データ（AIO）対応や設計ドキュメントの整備など、想定工数に含まない作業も含みます。"
      ]
    },
    thumb: "assets/images/works/arusen.jpg"
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
    id: "cinematic",
    title: "Cinematic",
    category: "website",
    catLabel: "Webサイト",
    role: "チーム制作",
    url: "https://www.cinematic.jp/",
    summary: "結婚式向け映像制作を専門とする株式会社シネマチックのコーポレートサイト。プロフィールムービーやエンドロールなど多彩なサービスをチームで制作。",
    description: "結婚式向け映像制作の専門会社・株式会社シネマチックのWebサイト。プロフィールムービー・オープニングムービー・エンドロールなど幅広いサービスを紹介するコーポレートサイトを、チームの一員として制作しました。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "Shopify", "Liquid"],
    thumb: "assets/images/works/cinematic.jpg"
  },
  {
    id: "taniguchi-oem",
    title: "ライオン靴クリーム OEMページ",
    category: "lp",
    catLabel: "LP",
    role: "単独制作",
    url: "https://taniguchi-kagaku.com/pages/oem",
    summary: "ライオン靴クリーム本舗のOEM紹介ページ。ShopifyのLiquidテンプレートで実装し、BtoBの問い合わせ導線を設計。",
    description: "ライオン靴クリーム本舗のOEM事業を紹介するページ。Shopify（Liquid）上で、BtoB向けに事業の強みと問い合わせ導線を整理して一人で実装しました。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "Shopify", "Liquid"],
    tracking: ANALYTICS_SETUP,
    thumb: "assets/images/works/taniguchi-oem.jpg"
  },
  {
    id: "g-eight",
    title: "株式会社ジーエイト",
    category: "website",
    catLabel: "Webサイト",
    role: "単独制作",
    url: "https://g-eight.info/",
    summary: "東京・池袋を拠点にアスベスト除去・調査と内装解体工事を専門とする株式会社ジーエイトのコーポレートサイト。",
    description: "アスベスト除去・含有調査・内装解体工事を手がける株式会社ジーエイトのコーポレートサイト。リフォーム前の安全確認を検討する住宅所有者や建設業者に向けて、サービス内容・施工実績・無料相談の導線をわかりやすく整理し、単独で制作しました。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    tracking: ANALYTICS_SETUP,
    thumb: "assets/images/works/g-eight.jpg"
  },
  {
    id: "inochiryo",
    title: "命涼（inochiryo）LP",
    category: "lp",
    catLabel: "LP",
    role: "単独制作",
    url: "https://i-icf.co.jp/inochiryo/",
    summary: "製造工場・建設現場向け熱中症対策ブース「命涼（らく冷えブース）」の商品LP。ブースの特長と問い合わせ導線を単独で設計・制作。",
    description: "コンフォートフォーム株式会社が開発した熱中症対策ブース「命涼（らく冷えブース）」の紹介ランディングページ。製造工場・建設現場を主なターゲットに、独自素材「エアインフォーム」の特長や「誰でも・どこでも・すぐ設置できる」というコンセプトを訴求する構成を単独で制作しました。",
    tech: ["HTML", "CSS / SCSS", "JavaScript"],
    thumb: "assets/images/works/inochiryo.jpg"
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
    tech: ["HTML", "CSS / SCSS", "JavaScript", "HubSpot CMS", "HubL"],
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
  }
];

/* CommonJS / ブラウザ両対応（編集ツールでの読み込み用） */
if (typeof module !== "undefined" && module.exports) { module.exports = WORKS; }
