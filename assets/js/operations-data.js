/* =========================================================
   運用実績データ（ここを編集すれば一覧・詳細ページに反映されます）
   - title       : サイト名
   - catLabel    : 画面に出る区分
   - role        : 担当（公開後の運用）
   - period      : 担当していた時期
   - url         : 実際のサイトURL
   - summary     : 一覧カード用の短い説明
   - description : 詳細ページ用の説明
   - updates     : 公開後に対応した内容（配列）
   - tech        : 使用言語・技術（配列）
   - thumb       : サムネ画像パス
   - workId      : 新規制作側の実績ID（任意。制作物詳細へのリンクに使う）
   ========================================================= */

const OPERATIONS = [
  {
    id: "tkf",
    title: "東京ニットファッション工業組合（TKF）",
    catLabel: "運用",
    role: "単独",
    period: "2026年7月〜9月",
    url: "https://www.tkf.or.jp/recruit/",
    summary: "2023年公開の組合サイト（他メンバーが制作）に、人材募集セクションを単独で追加。社内チェック対応から本番反映、公開後の記事投稿までを担当しました。",
    description: "東京ニットファッション工業組合（TKF）の既存WordPressサイトの運用として、人材募集セクションの追加を一人で受け持ちました。サイト自体は2023年に別のメンバーが制作したもので、既存のブログや記事に影響を出さないことを前提に進めています。ディレクターからの追加指示や社内チェックの指摘はClaude Codeで実装し、公開中のサイトへの反映は、営業中のサイトで表示崩れが起きないよう手順を組み立てて行いました。主な対応は次のとおりです。",
    updates: [
      "人材募集セクション（トップ・下層6ページ・バナー3種）を既存テーマに追加し、グローバルナビの導線を人材募集へ差し替えました。",
      "デザインカンプとの表示差分の解消、コラムモジュールの実装、アクセシビリティ対応を行いました。",
      "社内チェック2回分の指摘に対応しました。職場環境の「取り組みの種類」を複数選択できるようにし、記事が0件のときの表示やアイキャッチ画像の解像度も改善しています。",
      "募集企業一覧に、求人の仲介・斡旋を行っていない旨の注意書きを追加し、研修制度「先輩の声」の写真と本文を実際のデータに差し替えました。",
      "本番反映では、反映してもすぐに表示が変わらないファイルから順にアップロードし、カスタム投稿タイプとカスタムフィールドの設定をテスト環境から移しました。上書き前のファイルと設定は控えとして保存しています。",
      "反映後の確認で見つけたブログ一覧の表示崩れをその場で修正し、インタビュー3記事と職場環境の取り組み1記事を本番で投稿・公開しました。"
    ],
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP", "Claude Code"],
    thumb: "assets/images/works/tkf.jpg",
    workId: "tkf"
  },
  {
    id: "aozora-sakubun",
    title: "あおぞら作文教室",
    catLabel: "運用",
    role: "単独",
    period: "2026年（公開後）",
    url: "https://sakubuncafe.com/",
    summary: "受験作文の個別指導教室サイト。新規制作は複数人で行い、公開後の更新は単独で担当。Claude Codeで修正依頼を短い周期で反映しました。",
    description: "小学1年生から高校3年生まで、都内5校舎とオンラインで作文を指導するあおぞら作文教室のWebサイトです。新規制作は複数人で進め、公開後のテーマ更新は一人で受け持ちました。教室から届く文言の修正やページの追加は、Claude Codeで実装し、公開中のサイトへ戻す間隔を短くしています。更新履歴に残っている主な対応は、次のとおりです。",
    updates: [
      "トップのキャッチコピーを更新し、メインビジュアルを動画から画像4点のフェードスライドへ差し替えました。YouTubeの埋め込みと合格実績の表示も更新しています。",
      "ヘッダーに無料体験の申し込みボタンを追加し、スマートフォン向けにアクセス・電話・LINE・問い合わせの固定メニューを設置しました。無料体験の案内文は一度掲載したあと、依頼に合わせて外しています。",
      "講師紹介に下田先生・滝沢先生・梁川先生を追加し、プロフィールの見せ方と学生講師の欄を整えました。担当クラス、阿佐ヶ谷校への掲載、5校の教室詳細にある講師カードも講師紹介と揃えています。",
      "クラスページのカレンダーとスケジュールを更新し、アコーディオンと一覧の並びを調整しました。教室ごとの時間割と「にじいろ」クラスの表示も直しています。",
      "資料ダウンロードのページを追加し、申し込み完了ページに配布資料と大学総合型入試のPDFを載せました。",
      "校舎名を南千住から北千住へ改め、電話番号と受付時間、各地図、SNSアイコンを更新しました。本文の誤記と、プライバシーポリシーにあるMicrosoft Clarityの表記も修正しています。",
      "コラムの一覧、カテゴリ別一覧、詳細ページを新設しました。"
    ],
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP", "Claude Code"],
    thumb: "assets/images/works/sakubuncafe.jpg",
    workId: "sakubuncafe"
  },
  {
    id: "yonetsubo",
    title: "ヨネツボ名古屋行政書士事務所",
    catLabel: "運用",
    role: "単独",
    period: "2025年1月〜2026年9月",
    url: "https://yonetsubo758.jp/",
    summary: "交通事故の後遺障害の申請を支援する行政書士事務所のサイト。公開済みのサイトのテーマ更新を、約1年8か月にわたって一人で担当しました。",
    description: "交通事故による後遺障害の申請を支援する、ヨネツボ名古屋行政書士事務所のWordPressサイトです。公開済みのサイトの運用として、2025年1月から2026年9月まで、テーマの更新を一人で受け持ちました。この間のテーマへのコミットは、マージを除いてすべて私のものです。実績や料金の内容更新に加え、表示の不具合はWordPress本体の処理までたどって原因を特定し、修正前のファイルを控えに残してから直しています。主な対応は次のとおりです。",
    updates: [
      "YouTube動画を画面に近づいたときだけ読み込むようにし、ページの表示を軽くしました。",
      "実績ページに2025年度の認定率のデータと比較図、推移グラフを追加し、表を画像のグラフに置き換えました。",
      "費用ページを、料金表中心から文章と画像中心の構成に組み直しました。",
      "スマートフォンでだけ費用ページの画像が表示されない不具合について、WordPressが属性内のショートコードを展開しない仕様が原因だと突き止めて修正しました。",
      "事例集のダウンロードページと完了ページを追加し、スマートフォン版とパソコン版の資料を選べるようにしました。",
      "知恵袋ページの事例を開閉式のQ&Aにまとめ、重複していた動画を整理しました。",
      "未認定ページのCSSと、事例タブの出力処理をテンプレートの外に切り出し、ページごとに書かれていたスタイルを整理しました。",
      "セミナー・相談会のお知らせ一覧で、表示件数とページ送りが合っていなかった点を直し、使われていない処理を削除しました。",
      "ヘッダー・フッターからInstagramを外し、お問い合わせページの文言と電話番号の表示を更新しました。"
    ],
    tech: ["HTML", "CSS", "JavaScript", "jQuery", "WordPress", "PHP", "Claude Code"],
    code: [
      {
        title: "YouTube動画を、画面に近づいたときだけ読み込む",
        problem: "1つのページに複数のYouTube動画を埋め込んでおり、ページを開いた時点ですべての動画の読み込みが始まって、表示が重くなっていました。",
        approach: "動画のURLをいったん別の属性に退避し、画面の200px手前まで来たときに読み込ませるようにしました。読み込んだ動画は監視の対象から外しています。",
        lang: "JavaScript",
        body: `//YouTube動画の読み込み速度アップ
document.addEventListener("DOMContentLoaded", function () {
  let iframes = document.querySelectorAll("iframe.youtube-lazyload");
  const loadIframe = (iframe) => {
    iframe.src = iframe.getAttribute("data-src");
    iframe.removeAttribute("data-src"); // 不要になった属性を削除
  };
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 画面内に入ったら
          loadIframe(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "200px" }
  ); // 200px手前で読み込む
  iframes.forEach((iframe) => observer.observe(iframe));
});`
      },
      {
        title: "スマートフォンでだけ画像が出ない不具合を、WordPress本体の処理までたどって直す",
        problem: "費用ページの画像が、パソコンでは表示されるのに、スマートフォンでだけ表示されませんでした。",
        approach: "スマートフォン用の画像のURLに書いたショートコードが展開されず、存在しないパスになっていたのが原因でした。WordPressは属性の中のショートコードを、許可された要素のときだけ展開します。picture と source は許可されていないため、そのまま出力されていました（wp-includes/shortcodes.php で確認）。ショートコードを使わないパスに直し、切り替えの幅もテーマのCSS・JavaScriptと同じ750pxにそろえています。",
        lang: "HTML（修正前 → 修正後）",
        body: `<!-- 修正前：source の srcset に書いたショートコードが展開されず、SPだけ404 -->
<picture>
  <source srcset="[hurl]/wp-content/uploads/2022/06/fee_sp.png" media="(max-width:767px)" />
  <img src="[hurl]/wp-content/themes/theme/images/module/fee_pc.png" class="switch" alt=""
    style="visibility: visible;">
</picture>

<!-- 修正後：ショートコードを使わないパスにし、切替幅をテーマ全体の750pxにそろえる -->
<picture>
  <source srcset="/wp-content/uploads/2022/06/fee_sp.png" media="(max-width:750px)" />
  <img src="[theme]/images/module/fee_pc.png" alt="">
</picture>`
      }
    ],
    thumb: "assets/images/works/yonetsubo.jpg"
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = OPERATIONS; }
