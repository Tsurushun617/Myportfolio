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
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP", "Claude Code"],
    code: [
      {
        title: "記事の見出しから、目次を自動で作る",
        problem: "記事ごとに目次を手で入力すると、見出しを直したときに目次の直し忘れが起き、リンク先もずれます。",
        approach: "編集者が入力した見出しの行だけを順に拾い、目次の項目とリンク先のIDを自動で作るようにしました。本文側と番号の付け方をそろえる必要がある点は、コメントに残しています。",
        lang: "PHP",
        body: `/*
 * 本文モジュールの見出しを拾って目次の項目配列を返す(自動生成用)
 *
 * カスタムフィールドの「見出し」行だけを見ている。
 * 本文欄の中に直接書かれた見出しは拾えない。
 * 拾うにはHTMLのパースが要るため、必要になった時点で別途対応する。
 *
 * 戻り値: array( array( 'level' => 1|2, 'text' => '...', 'anchor' => 'toc-1' ), ... )
 *   level 1 = h2(数字の項目) / level 2 = h3(英小文字の項目)。
 *   h4 以下はデザインの目次に階層が無いため拾わない。
 */
function article_collect_headings( $post_id ) {
  $items = array();
  if ( ! function_exists( 'have_rows' ) || ! have_rows( 'blog_module', $post_id ) ) {
    return $items;
  }
  $index = 0;
  while ( have_rows( 'blog_module', $post_id ) ) {
    the_row();
    if ( get_row_layout() !== 'blog_mod_title' ) {
      continue;
    }
    $index++;
    $text = get_sub_field( 'blog_mod_title' );
    $tag  = get_sub_field( 'blog_mod_class' );
    if ( ! $text ) {
      continue;
    }
    if ( 'h2' === $tag ) {
      $level = 1;
    } elseif ( 'h3' === $tag ) {
      $level = 2;
    } else {
      continue; // h4 以下は目次に出さない
    }
    $items[] = array(
      'level'  => $level,
      'text'   => $text,
      'anchor' => article_heading_id( $index ),
    );
  }
  return $items;
}`
      },
      {
        title: "入れ子の目次を、正しいHTMLで出力する",
        problem: "大項目と小項目のある目次は、小項目のリストを置く位置を誤ると不正なHTMLになります。また、未入力の項目から、行き先のない空リンクが出ていました。",
        approach: "小項目のリストは直前の大項目の中に入れ、開いたタグを変数で管理して必ず閉じるようにしました。カスタムフィールドが未入力のときに返る値の違いも確かめ、空リンクが出ないようにしています。",
        lang: "PHP",
        body: `function article_render_toc( $items ) {
  if ( empty( $items ) ) {
    return;
  }
  // 小項目の ol は「直前の li の中」に入れる。li の兄弟として置くと不正なHTMLになるため。
  $open_child = false; // 小項目の ol を開いているか
  $open_item  = false; // 大項目の li を開いたままにしているか
  echo '<div class="toc">';
  echo '<p class="toc_title">目次</p>';
  echo '<ol class="toc_list">';
  foreach ( $items as $item ) {
    $level = ( isset( $item['level'] ) && 2 === (int) $item['level'] ) ? 2 : 1;
    // フィールドが存在しない場合、取得関数は null ではなく false を返す。
    // 素通しすると '' !== false が真になり、href="#" の空リンクが生える。
    // 文字列でないものはすべて「未入力」として扱う。
    $text   = ( isset( $item['text'] ) && is_string( $item['text'] ) ) ? $item['text'] : '';
    $anchor = ( isset( $item['anchor'] ) && is_string( $item['anchor'] ) ) ? $item['anchor'] : '';
    if ( '' === $text ) {
      continue;
    }
    $label = ( '' !== $anchor )
      ? '<a href="#' . esc_attr( $anchor ) . '">' . esc_html( $text ) . '</a>'
      : esc_html( $text );

    if ( 1 === $level ) {
      if ( $open_child ) { echo '</ol>'; $open_child = false; }
      if ( $open_item )  { echo '</li>'; $open_item  = false; }
      echo '<li class="toc_item">' . $label;
      $open_item = true;
      continue;
    }

    // 小項目。大項目より先に小項目が来た場合に備えて、親の li が無ければ空で開く
    if ( ! $open_child ) {
      if ( ! $open_item ) {
        echo '<li class="toc_item">';
        $open_item = true;
      }
      echo '<ol class="toc_list-child">';
      $open_child = true;
    }
    echo '<li class="toc_item">' . $label . '</li>';
  }
  if ( $open_child ) {
    echo '</ol>';
  }
  if ( $open_item ) {
    echo '</li>';
  }
  echo '</ol>';
  echo '</div>';
}`
      },
      {
        title: "表の見出しセルに、列と行のどちらの見出しかを明示する",
        problem: "見出し行と、各行の左端の見出しが同時にある表では、読み上げソフトがどのセルの見出しなのかを判断しにくくなります。",
        approach: "見出しセルに scope 属性を付け、列の見出しか行の見出しかを明示しました。理由はコード内のコメントに残しています。",
        lang: "PHP / HTML",
        body: `<table class="<?php echo $table_class; ?>">
  <?php // scope="col"/"row" は、見出し行(thead)と各行左端のth(行見出し)が
        // 同時に存在する二次元の表になりうるため、どちらの見出しか明示して紐付ける ?>
  <?php if ( $has_head ) : ?>
  <thead>
    <tr class="head">
      <th scope="col"><?php echo $th01 ? $th01 : '&nbsp;'; ?></th>
      <th scope="col"><?php echo $th02 ? $th02 : '&nbsp;'; ?></th>
    </tr>
  </thead>
  <?php endif; ?>
  <?php foreach ( $rows as $row ) : ?>
  <tr>
    <th scope="row"><?php echo $row['td01']; ?></th>
    <td><?php echo $row['td02']; ?></td>
  </tr>
  <?php endforeach; ?>
</table>`
      },
      {
        title: "人材募集の記事に、投稿タイプごとのタグを自動で出す",
        problem: "インタビュー・職場環境・募集企業は、それぞれ別のタクソノミー（分類）を持ちます。タグの出力を3種類のテンプレートに書くと、分類を足すたびに3か所を直すことになります。",
        approach: "投稿タイプとタクソノミーの対応表を配列で1か所に持ち、現在の投稿タイプから分類を選んで、付いているタームを全件出力します。分類が1つも付いていない記事では get_the_terms() が false を返すため、配列に直してから判定しています。",
        lang: "PHP",
        body: `$tags_taxonomyMap = array(
	'recruit_voice'     => 'voice_cat',
	'recruit_workplace' => 'workplace_cat',
	'recruit_company'   => 'company_cat',
);
$tags_postType = get_post_type();
$tags_taxonomy = isset( $tags_taxonomyMap[ $tags_postType ] )
	? $tags_taxonomyMap[ $tags_postType ]
	: '';
$tags_terms = $tags_taxonomy
	? get_the_terms( get_the_ID(), $tags_taxonomy )
	: array();
if ( ! is_array( $tags_terms ) ) {
	// タームが1つも無い場合、get_the_terms() は array() ではなく false を返す
	$tags_terms = array();
}
?>
<?php if ( ! empty( $tags_terms ) ) : ?>
<ul class="tags">
	<?php foreach ( $tags_terms as $tags_term ) : ?>
	<li class="tags_item"><?php echo esc_html( $tags_term->name ); ?></li>
	<?php endforeach; ?>
</ul>
<?php endif; ?>`
      },
      {
        title: "パンくずリストを、配列を渡すだけの共通パーツにする",
        problem: "下層ページごとにパンくずのHTMLを書くと、クラス名や現在地の扱いが少しずつずれていきます。",
        approach: "表示する項目を配列で受け取り、url を省略した項目を「現在地」として aria-current を付けます。ラベルが空の項目は飛ばし、項目が1つもなければ何も出しません。",
        lang: "PHP",
        body: `/*
 * 使い方
 *   get_template_part( 'inc', 'breadcrumb', array(
 *     'items' => array(
 *       array( 'label' => 'TOP',      'url' => home_url( '/' ) ),
 *       array( 'label' => '人材募集', 'url' => home_url( '/recruit/' ) ),
 *       array( 'label' => 'インタビュー' ), // url を省略した項目が現在地になる
 *     ),
 *   ) );
 */
$crumb_items = ( isset( $args['items'] ) && is_array( $args['items'] ) ) ? $args['items'] : array();
if ( ! $crumb_items ) {
	return;
}
?>
<nav class="crumb_wrap" aria-label="パンくず">
	<ol class="crumb">
		<?php foreach ( $crumb_items as $crumb_item ) :
			$crumb_label = isset( $crumb_item['label'] ) ? $crumb_item['label'] : '';
			$crumb_url   = isset( $crumb_item['url'] ) ? $crumb_item['url'] : '';
			if ( '' === $crumb_label ) {
				continue;
			}
			?>
			<li class="crumb_item"<?php echo ( '' === $crumb_url ) ? ' aria-current="page"' : ''; ?>>
				<?php if ( '' !== $crumb_url ) : ?>
					<a href="<?php echo esc_url( $crumb_url ); ?>"><?php echo esc_html( $crumb_label ); ?></a>
				<?php else : ?>
					<?php echo esc_html( $crumb_label ); ?>
				<?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ol>
</nav>`
      }
    ],
    thumb: "assets/images/works/tkf.jpg"
  },
  {
    id: "arusen",
    title: "株式会社アルセン",
    category: "website",
    catLabel: "Webサイト",
    role: "単独制作",
    url: "https://arusen.com/",
    summary: "独自技術で機能性素材を開発する株式会社アルセンのコーポレートサイト。Figma MCP × Claude Code を活用し、単独で制作しました。",
    description: "「独自技術の融複合で、新たな製品価値を作る」を掲げる株式会社アルセンのコーポレートサイト。「暗所イオン触媒」「スマート繊維 IoniQue-EX」「真軸インソール／Magic Insole」という3つのコア技術と研究開発のエビデンスを整理し、アパレル・寝具・フットウェアなどのメーカーからOEM・共同開発の相談につながる導線を設計しました。Figma MCPでデザインカンプから実装値を直接取得し、Claude Codeによる実装・検証を組み合わせています。実装からチェックバック4巡の反映、公開準備までを単独で進めました（第1弾：2026年7月10日〜8月18日、コミットのあった日は10日）。",
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
        "Claude Code 活用時の工数は、作業ログの稼働時間と作業日数（第1弾10日・第2弾7日の計17日）から算出。構造化データ（AIO）対応や設計ドキュメントの整備など、想定工数に含まない作業も含みます。"
      ]
    },
    code: [
      {
        title: "段階公開のリンクの出し分けを、配列1か所で管理する",
        problem: "サイトを段階的に公開するため、先行公開の時点ではリンク先の多くがまだ存在しません。リンクを個別にコメントアウトすると7ファイルに散らばり、公開時に戻し漏れが起きます。",
        approach: "公開済みページのスラッグを1つの配列にまとめ、リンクを出す側はすべてこの判定を通すようにしました。公開するときは配列に1行足すだけで、テンプレートには触りません。",
        lang: "PHP",
        body: `// 公開済み（＝リンクを出してよい）ページのスラッグ。
// 公開する段になったら、ここに1行足す。それだけで
// ヘッダー・フッター・CTA・本文のリンクが一斉に切り替わる。
function theme_published_slugs(): array
{
  return array(
    'about',
    'contact',
    'privacy',
    // 'service-a', // 次回公開
  );
}

// そのページを公開しているか
// 関数名に接頭辞を付けているのは、is_published のような一般的な名前が
// 他のプラグインと衝突しうるため
function theme_is_published(string $slug): bool
{
  return in_array($slug, theme_published_slugs(), true);
}

// 本文中のリンク。未公開のページなら、リンクにせず文字だけを残す
// 沿革の文章のように、リンクが消えても文として成立する箇所で使う
function theme_published_link(string $slug, string $text, string $class = ''): string
{
  if (!theme_is_published($slug)) {
    return esc_html($text);
  }

  $attr = $class !== '' ? ' class="' . esc_attr($class) . '"' : '';
  return '<a href="' . esc_url(home_url('/' . $slug . '/')) . '"' . $attr . '>' . esc_html($text) . '</a>';
}`
      },
      {
        title: "よくある質問を、担当者が管理画面だけで更新できる部品にする",
        problem: "同じ質問を複数のページに載せる必要があり、ページごとに並び順も違います。テンプレートに直接書くと、質問を1つ直すたびにエンジニアの作業が発生します。",
        approach: "質問をカスタム投稿にし、カテゴリを渡すだけで呼び出せる共通部品にしました。担当者が触るのは質問と回答の中身だけです。ページごとの並び順は、専用のカスタムフィールドで持たせています。",
        lang: "PHP",
        body: `// よくある質問のアコーディオン（投稿タイプ faq）
//
// $args['cat']        : 出力するカテゴリのスラッグ
// $args['order_meta'] : ページごとの並び順を持たせるカスタムフィールド名（任意）
//
// FAQを載せるページが増えたときは、管理画面でカテゴリを1件足し、
// そのページのテンプレートでこの部品を1行呼ぶだけでよい。
//
// 同じ質問を複数ページに出すため、1つの投稿に複数のカテゴリを付けている。
// ところが「順序」欄（menu_order）は投稿につき1つしか持てず、
// ページごとに別の並びにできない。そこで専用のカスタムフィールドで並びを持たせる
$cat        = isset($args['cat']) ? $args['cat'] : '';
$order_meta = isset($args['order_meta']) ? $args['order_meta'] : '';
if (!$cat) {
  return;
}

$faq_args = array(
  'post_type'      => 'faq',
  'posts_per_page' => -1,
  'order'          => 'ASC',
  'tax_query'      => array(
    array(
      'taxonomy' => 'faq_cat',
      'field'    => 'slug',
      'terms'    => $cat,
    ),
  ),
);

if ($order_meta) {
  // ページ専用の並び順。値が入っていない投稿は末尾に回す
  $faq_args['meta_key'] = $order_meta;
  $faq_args['orderby']  = array('meta_value_num' => 'ASC', 'menu_order' => 'ASC');
} else {
  // 「順序」欄で並べる。管理画面で数値を入れ替えれば表示順が変わる
  $faq_args['orderby'] = 'menu_order';
}`
      },
      {
        title: "最終更新日を、投稿とテンプレートの新しいほうから自動で出す",
        problem: "固定ページの本文をテンプレートに書いている場合、テンプレートを直しても管理画面の更新日は変わりません。手で日付を書くと、直し忘れが起きます。",
        approach: "投稿の更新日時とテンプレートファイルの更新日時を比べ、新しいほうを出力する関数にしました。検索エンジンやAIが読めるよう、機械可読の日付も time 要素に持たせています。",
        lang: "PHP",
        body: `// $template_file : 対象テンプレートのパス。呼び出し側から __FILE__ を渡す
// 戻り値 : Unixタイムスタンプ。どちらも取れなければ 0
function get_last_updated_time(string $template_file = ''): int
{
  $times = array();

  $post_modified = get_post_modified_time('U', true); // GMT基準
  if ($post_modified) {
    $times[] = (int) $post_modified;
  }

  if ($template_file !== '' && file_exists($template_file)) {
    $times[] = (int) filemtime($template_file);
  }

  return $times ? max($times) : 0;
}

// 最終更新日を <time> 要素で出力する
// datetime 属性は機械可読用。表示用の書式とは別に持たせる
function the_last_updated(string $template_file = '', string $format = 'Y/m/d'): void
{
  $time = get_last_updated_time($template_file);
  if (!$time) {
    return;
  }
  echo '<time datetime="' . esc_attr(wp_date('Y-m-d', $time)) . '">' . esc_html(wp_date($format, $time)) . '</time>';
}`
      }
    ],
    thumb: "assets/images/works/arusen.jpg"
  },
  {
    id: "sakubuncafe",
    title: "あおぞら作文教室",
    category: "website",
    catLabel: "Webサイト",
    role: "チーム制作（メイン担当）",
    url: "https://sakubuncafe.com/",
    summary: "都内5校舎とオンラインで作文を指導する教室のサイト。チーム制作のなかでメインの実装を担当し、クラス・講師・教室・コラムの仕組みを作りました。",
    description: "小学1年生から高校3年生まで、都内5校舎とオンラインで作文を指導するあおぞら作文教室のWebサイトです。土台のテーマを別のメンバーが用意したあと、2025年11月から2026年9月まで、私がメインで実装を担当しました。現在のテーマのPHP・JavaScript・Sassのうち、約54%の行が私のコミットによるものです（git blame で集計）。教室側が管理画面で更新できるよう、クラスはカスタム投稿として一覧・詳細・カテゴリ別のページを作り、講師紹介と5校の教室詳細ページは同じ講師カードを共用する形にそろえました。資料ダウンロードのページ、コラムの一覧・カテゴリ別一覧・詳細ページも新設し、コラムはディレクターが管理画面から投稿できるよう、手順と表示ルールをまとめた仕様書も残しています。",
    tech: ["HTML", "CSS / Sass", "JavaScript", "WordPress", "PHP", "ACF", "Claude Code"],
    code: [
      {
        title: "画面幅とUser-Agentのずれで崩れるカルーセルを、判定をそろえて直す",
        problem: "スマートフォン幅で見ると、担当講師のカルーセルが崩れることがありました。カルーセルを動かす処理は画面幅で判定していた一方、そのCSSはUser-Agent（端末の種類）で読み込みを分けていたため、「画面は狭いが端末はパソコン」と判定される環境で、CSSだけが読み込まれない状態になっていました。",
        approach: "CSSの読み込みを、JavaScriptと同じ画面幅の条件（750px以下）にそろえました。原因と、なぜこの判定にしたかをコメントに残しています。",
        lang: "PHP",
        body: `// swiper.css は User-Agent（wp_is_mobile）ではなく画面幅で読み込む。
// Swiper の起動判定は js/common.js の matchMedia("(max-width: 750px)") ＝画面幅であり、
// CSS を UA で出し分けると「画面は狭いが UA はデスクトップ」の環境（DevTools 等）で
// Swiper だけ起動して CSS が無い状態になり、担当講師カルーセルが崩れる。
// media 属性を JS と同じブレークポイントに揃え、UA に依存せず整合させる。
echo '<link rel="stylesheet" media="(max-width: 750px)" href="' . get_template_directory_uri() . '/css/swiper.css?' . date('ymd-Hi') . '">' . "\\n";`
      },
      {
        title: "ページ内リンクで開いたときだけ崩れるカルーセルを、原因から直す",
        problem: "講師紹介ページを、特定の講師へのリンク（/teacher#講師名）で開くとカードが端に寄り、矢印が枠の外に消えていました。再読み込みすると直るため、原因が分かりにくい不具合でした。",
        approach: "ブラウザがリンク先を見せようとして、カルーセルの枠そのものを横にスクロールさせていることを突き止めました。そのずれを打ち消し、目的の講師まではカルーセル側の機能で移動させています。画像の読み込みあとに再びずれる場合にも備えました。",
        lang: "JavaScript",
        body: `// アンカー付きURL（例: /teacher#teacher-a）で遷移すると、ブラウザは
// 対象要素を見せるために overflow:hidden のswiperコンテナ自体を
// 横スクロール（scrollLeft）させる。SwiperはこのscrollLeftを関知しないため
// transformと二重にずれ、カードが端に寄り矢印が枠外に消える崩れが起きる
// （リロードで直るのは、再読込時はアンカーへの再スクロールが行われないため）。
// scrollLeftをリセットし、対象スライドへはSwiperのAPIで正しく移動する。
container.scrollLeft = 0;
if (location.hash) {
  const hashId = location.hash.slice(1);
  const realSlides = Array.from(container.querySelectorAll(".swiper-slide")).filter(
    (slide) => !slide.classList.contains("swiper-slide-duplicate")
  );
  const hashIndex = realSlides.findIndex((slide) => slide.id === hashId);
  if (hashIndex !== -1) {
    swiperInstance.slideToLoop(hashIndex, 0);
  }
}

// 画像の遅延読み込み等で読み込み完了時にブラウザがアンカー位置へ再スクロールし、
// swiperコンテナのscrollLeftが再び汚れる場合に備えて、loadでも解除する
$(window).on("load", function () {
  document.querySelectorAll(".swiper-container").forEach(function (container) {
    container.scrollLeft = 0;
  });
});`
      },
      {
        title: "トップのメインビジュアルを、ライブラリなしのフェード切り替えにする",
        problem: "トップのメインビジュアルを、動画から画像4点の切り替えに変えることになりました。スライダーのライブラリを足すと、そのぶん読み込みが重くなります。",
        approach: "クラス名を付け替えるだけの短い処理にし、切り替えの動きはCSSに任せました。1枚目の画像だけ優先して読み込ませ、表示が遅れないようにしています。",
        lang: "JavaScript",
        body: `(function () {
  var items = document.querySelectorAll(".mv-slide__item");
  if (items.length < 2) return;
  var INTERVAL = 5000;
  var current = 0;
  var prev = -1;
  setInterval(function () {
    if (prev >= 0) items[prev].classList.remove("is-prev");
    items[current].classList.remove("is-active");
    items[current].classList.add("is-prev");
    prev = current;
    current = (current + 1) % items.length;
    items[current].classList.add("is-active");
  }, INTERVAL);
})();`
      },
      {
        title: "コラム一覧の件数と並び順を、テンプレートの外で決める",
        problem: "コラムの一覧とカテゴリ別一覧で、表示件数と並び順をそろえる必要がありました。テンプレートごとに検索条件を書くと、片方だけ直し忘れが起きます。",
        approach: "WordPressが記事を取りに行く直前に条件を差し込み、一覧とカテゴリ別一覧の両方に同じ条件が効くようにしました。管理画面の一覧には影響しないようにしています。",
        lang: "PHP",
        body: `function column_archive_query($query) {
  if (is_admin() || !$query->is_main_query()) {
    return;
  }
  if (!is_post_type_archive('column') && !is_tax('column_cat')) {
    return;
  }
  $query->set('posts_per_page', 9);
  $query->set('orderby', 'date');
  $query->set('order', 'DESC');
}
add_action('pre_get_posts', 'column_archive_query');`
      }
    ],
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
    code: [
      {
        title: "本文の見出しに、デザイン用のクラスと囲みを自動で付ける",
        problem: "担当者が管理画面で記事を書くとき、見出しにクラス名を手で書いてもらうのは現実的ではありません。書き忘れると、デザインが崩れます。",
        approach: "本文を出力する直前に、見出しタグへクラスを自動で付けるようにしました。担当者はエディタで見出しを選ぶだけです。すでにクラスがある見出しには、追記する形にしています。",
        lang: "PHP",
        body: String.raw`/**
 * 本文内のh2〜h6タグに指定クラスを自動付与
 * h2タグをhgroupで囲む
 */
function add_heading_class_to_content($content) {
  $replacements = [
    'h2' => 'h2default',
    'h3' => 'h3second',
    'h4' => 'h4default',
    'h5' => 'h5default',
    'h6' => 'h6default',
  ];

  // h2タグをhgroupで囲む処理
  $content = preg_replace_callback(
    '/<h2([^>]*)>(.*?)<\/h2>/is',
    function($matches) {
      $h2_attributes = $matches[1];
      $h2_content = $matches[2];

      // h2タグにクラスを付与
      if (strpos($h2_attributes, 'class=') !== false) {
        $h2_tag = preg_replace('/class=["\\\']([^"\\\']*)["\\\']/', 'class="$1 h2default"', '<h2'.$h2_attributes.'>');
      } else {
        $h2_tag = '<h2 class="h2default"'.$h2_attributes.'>';
      }

      // hgroupで囲む
      return '<hgroup class="hgroup">'.$h2_tag.$h2_content.'</h2></hgroup>';
    },
    $content
  );

  // h3〜h6タグのクラス付与
  foreach ($replacements as $tag => $class) {
    if ($tag === 'h2') continue; // h2は既に処理済み
    $content = preg_replace_callback(
      '/<'.$tag.'([^>]*)>/i',
      function($matches) use ($class, $tag) {
        if (strpos($matches[1], 'class=') !== false) {
          // すでにclassがある場合はクラス名を追記
          return preg_replace('/class=["\\\']([^"\\\']*)["\\\']/', 'class="$1 '.$class.'"', '<'.$tag.$matches[1].'>');
        } else {
          // classがなければ新規で付与
          return '<'.$tag.' class="'.$class.'"'.$matches[1].'>';
        }
      },
      $content
    );
  }
  return $content;
}
add_filter('the_content', 'add_heading_class_to_content');`
      },
      {
        title: "画像を、短い書き方で本文に入れられるようにする",
        problem: "固定ページの本文に画像のURLを直接書くと、テスト環境と本番でパスが変わったときに画像が切れます。URLが長く、担当者には書きにくいという問題もありました。",
        approach: "ファイル名と説明文を書くだけで画像タグを出すショートコードにしました。保存場所はテーマ側で組み立てるので、環境が変わっても切れません。使い方は、非エンジニアの担当者にも読める言葉でコメントに書いています。",
        lang: "PHP",
        body: `// テーマ画像出力用ショートコード（汎用版）
// [themeimg file="パス/ファイル名.jpg" alt="説明"] のように使うと、
// テーマの images フォルダ内の好きな場所の画像を簡単に表示できる仕組みです。
// たとえば [themeimg file="service/photo1.jpg" alt="作業中の写真"] と書くと、
// <img src=".../images/service/photo1.jpg" alt="作業中の写真"> という画像タグが自動で作られます。
function shortcode_themeimg($atts) {
    // ショートコードで指定された値を受け取る。なければ空文字になる。
    $a = shortcode_atts([
        'file' => '',      // imagesフォルダからのパス（例: service/photo1.jpg）
        'alt' => '',       // 画像の説明文（alt属性）
        'class' => '',     // 画像に付けるクラス名（任意）
        'width' => '',     // 画像の幅（任意）
        'height' => ''     // 画像の高さ（任意）
    ], $atts);

    // ファイル名が指定されていなければ何も表示しない
    if (empty($a['file'])) return '';

    // 画像のURLを作る（テーマのimages/の中を自動で探す）
    $src = get_template_directory_uri() . '/images/' . ltrim($a['file'], '/');
    $alt = esc_attr($a['alt']);
    $class = $a['class'] ? ' class="' . esc_attr($a['class']) . '"' : '';
    $width = $a['width'] ? ' width="' . esc_attr($a['width']) . '"' : '';
    $height = $a['height'] ? ' height="' . esc_attr($a['height']) . '"' : '';

    // 完成した<img>タグを返す
    return '<img src="' . esc_url($src) . '"' . $class . $width . $height . ' alt="' . $alt . '" />';
}
add_shortcode('themeimg', 'shortcode_themeimg');`
      },
      {
        title: "作業実績を、親カテゴリ→子カテゴリの二段で自動表示する",
        problem: "作業内容のカテゴリは親と子の二段になっており、カテゴリが増えるたびにリンク一覧を手で直すと、直し忘れや並び順のずれが起きます。",
        approach: "カスタムタクソノミーの親ターム（parent=0）を順番どおりに取り出し、親ごとに子タームを取得してリンクにします。並び順は管理画面で決めた term_order に従います。タームの名前とURLは esc_html と esc_url で出力します。",
        lang: "PHP",
        body: `<?php
$taxonomy = 'works_cat';
$taxonomy_obj = get_taxonomy($taxonomy);
$taxonomy_label = $taxonomy_obj ? $taxonomy_obj->labels->name : '作業内容から探す';
?>
<hgroup class="hgroup">
  <h2 class="h2default"><?php echo esc_html($taxonomy_label); ?></h2>
</hgroup>
<?php
// 親ターム（parent=0）を取得
$parent_terms = get_terms([
  'taxonomy' => $taxonomy,
  'parent' => 0,
  'hide_empty' => false,
  'orderby' => 'term_order',
  'order' => 'ASC',
]);
if (!empty($parent_terms) && !is_wp_error($parent_terms)) :
  foreach ($parent_terms as $parent_term) :
    // 子タームを取得
    $child_terms = get_terms([
      'taxonomy' => $taxonomy,
      'parent' => $parent_term->term_id,
      'hide_empty' => false,
      'orderby' => 'term_order',
      'order' => 'ASC',
    ]);
    echo '<h3 class="h3second h3default">' . esc_html($parent_term->name) . '</h3>';
    if (!empty($child_terms) && !is_wp_error($child_terms)) :
      echo '<ul class="category-list mb3em">';
      foreach ($child_terms as $child_term) :
        $term_link = get_term_link($child_term);
        echo '<li class="category-item"><a href="' . esc_url($term_link) . '">' . esc_html($child_term->name) . '</a></li>';
      endforeach;
      echo '</ul>';
    endif;
  endforeach;
endif;
?>`
      },
      {
        title: "個別ページが不要なカスタム投稿を、一覧へ振り分ける",
        problem: "社員紹介は一覧ページだけで見せる設計でしたが、個別ページのURLを直接開くと、中身のないページが表示されてしまいます。",
        approach: "template_redirect で、社員紹介の個別ページが開かれたときだけ一覧ページへリダイレクトします。テンプレートを作らずに済み、検索から個別URLに入られても一覧へ戻せます。",
        lang: "PHP",
        body: `// 社員紹介（member）の個別ページを一覧ページにリダイレクト
add_action('template_redirect', function() {
  if (is_singular('member')) { // 'member'はカスタム投稿タイプのスラッグ
    wp_redirect(get_post_type_archive_link('member'));
    exit;
  }
});`
      }
    ],
    thumb: "assets/images/works/matsuda-motors.jpg"
  },
  {
    id: "cinematic",
    title: "Cinematic",
    category: "website",
    catLabel: "Webサイト",
    role: "チーム制作（一部ページと公開後の改修を担当）",
    url: "https://www.cinematic.jp/",
    summary: "結婚式向け映像制作のShopifyサイト。チーム制作のうち、申込規約ページとコラム記事テンプレートの制作、公開後のトップ・ヘッダー・ロケーション撮影LPの改修を担当しました。",
    description: "結婚式向け映像制作の専門会社・株式会社シネマチックのShopifyサイトです。テーマの土台と多くのページは別のメンバーが制作しました。私が担当したのは、申込規約ページ、コラム記事のテンプレート、公開後のトップページ・ヘッダー・ロケーション撮影LPの改修です（マージを除くコミット28件のうち16件。うち1件は最初のテーマ取り込み）。2025年は申込規約ページを受け持ち、HTMLに直接書かれていた style 属性を60か所から6か所に減らしました。外部ライブラリで開いていた画像のポップアップは、CSSだけで開閉する作りに置き換えています。コラム記事のテンプレートには、お客様の声の記事にだけ挙式日とお客様名を出す仕組みを加えました。2026年は、トップのメインビジュアルに動画の再生・停止ボタンと人気プランへの導線を加え、スマートフォンで横にスクロールする料金表にスクロールのヒントを付けました。ヘッダーのメニュー表記の変更と、LPのプラン・料金の更新も行っています。2026年の改修はCursorで進め、AIに読ませるコーディング規約のファイルもリポジトリに追加しました。",
    tech: ["HTML", "CSS / Sass", "JavaScript", "jQuery", "Shopify", "Liquid", "Cursor"],
    code: [
      {
        title: "画像のポップアップを、外部ライブラリからCSSだけの作りに置き換える",
        problem: "納品イメージの画像を開くために、ページの途中で外部のポップアップ用ライブラリと、テーマ全体ですでに読み込んでいるjQuery（別のバージョン）をもう一度読み込んでいました。1枚の画像を見せるために、読み込みが二重になっていました。",
        approach: "非表示のチェックボックスと label を使い、チェックが入ったときだけ CSS でモーダルを表示する作りにしました。開く・閉じるにJavaScriptは使っていません。外部ライブラリの読み込みはなくなりました。",
        lang: "Liquid（修正前 → 修正後）",
        body: `<!-- 修正前：画像1枚のために、外部ライブラリとjQueryをページ内で読み込んでいた -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/css/lightbox.css" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/js/lightbox.min.js" defer></script>
<a href="{{ 'thumbnail.png' | asset_url }}" data-lightbox="group" class="linkbox spNone">
  納品イメージはこちら
</a>

<!-- 修正後：チェックボックスの状態だけで開閉する -->
<input type="checkbox" id="modal-toggle" class="modal-toggle">
<label for="modal-toggle" class="linkbox">納品イメージはこちら</label>
<div class="modal">
  <div class="modal-content">
    <label for="modal-toggle" class="modal-close">&times;</label>
    <h2 class="h2default">データ納品イメージ</h2>
    <div class="modal-body">
      <img src="{{ 'legal_modal.png' | asset_url }}" alt="データ納品イメージ">
    </div>
  </div>
</div>

// Sass：チェックが入ったときだけ表示する
input.modal-toggle
  display: none
.modal
  position: fixed
  inset: 0
  background: rgba(0, 0, 0, 0.8)
  opacity: 0
  visibility: hidden
  transition: all 0.3s ease
  .modal-toggle:checked ~ &
    opacity: 1
    visibility: visible`
      },
      {
        title: "モーダルの外側を押したら閉じる",
        problem: "CSSだけの作りでは、閉じるボタン（×）を押す以外にモーダルを閉じる方法がありませんでした。",
        approach: "背景を押したときだけ、チェックボックスを外して閉じる処理を足しました。押した場所が画像などの中身の中なら何もしません。開閉の状態はチェックボックスが持ったままなので、CSSの作りは変えていません。",
        lang: "JavaScript",
        body: `// モーダルウィンドウの制御
document.addEventListener('DOMContentLoaded', function() {
  const modalToggles = document.querySelectorAll('.modal-toggle');

  modalToggles.forEach(function(toggle) {
    const modal = toggle.nextElementSibling.nextElementSibling; // .modal要素

    // モーダルの背景部分をクリックした時の処理
    modal.addEventListener('click', function(e) {
      // モーダルコンテンツ部分（.modal-content）をクリックした場合は何もしない
      if (e.target.closest('.modal-content')) {
        return;
      }
      // 背景部分をクリックした場合はモーダルを閉じる
      toggle.checked = false;
    });
  });
});`
      },
      {
        title: "自動再生の動画に、再生・停止ボタンを付ける",
        problem: "トップのメインビジュアルの動画は自動でくり返し再生され、見る人が止める手段がありませんでした。",
        approach: "再生・停止を切り替えるボタンを置き、ボタンの読み上げ名（aria-label）を「次に起きること」に合わせて書き換えます。ボタン以外の理由で動画が止まったときも、動画の play / pause イベントを監視してボタンの状態をそろえます。見た目の切り替えは data-video-state を手がかりに CSS で行います。",
        lang: "Liquid / JavaScript",
        body: `<div class="mv-video-controls" role="group" aria-label="トップ動画の再生コントロール">
  <button type="button" class="mv-video-btn" data-video-action="toggle"
    aria-controls="mainvisual-video" aria-label="再生">
    <span class="mv-video-btn__icon">
      <img src="{{ 'icon_play-pause.svg' | asset_url }}" alt="" aria-hidden="true">
    </span>
  </button>
</div>
<script>
  (() => {
    const root = document.getElementById('mainvisual');
    if (!root) return;

    const video = root.querySelector('#mainvisual-video');
    const toggleBtn = root.querySelector('[data-video-action="toggle"]');
    if (!video || !toggleBtn) return;

    // 動画の状態に合わせて、ボタンのラベルと状態の属性を更新
    const updateState = () => {
      const isPaused = video.paused;
      // 読み上げ：次に何が起こるかをラベルに設定
      toggleBtn.setAttribute('aria-label', isPaused ? '再生' : '停止');
      // スタイリング用：CSSでアイコンを切り替える
      toggleBtn.setAttribute('data-video-state', isPaused ? 'paused' : 'playing');
    };

    updateState();

    // 手動操作や自動再生の停止など、動画側の変化にもボタンを同期
    video.addEventListener('play', updateState);
    video.addEventListener('pause', updateState);

    toggleBtn.addEventListener('click', async () => {
      try {
        if (video.paused) {
          await video.play();
        } else {
          video.pause();
        }
      } catch (e) {
        console.error('[mainvisual-video] Toggle failed:', e);
      }
    });
  })();
</script>`
      },
      {
        title: "「お客様の声」の記事にだけ、挙式日とお客様名を出す",
        problem: "コラムとお客様の声は同じ記事テンプレートを使っています。お客様の声にだけ必要な挙式日やお客様名を本文に手で書くと、記事ごとに書き方がばらつきます。",
        approach: "Shopifyのメタフィールド（記事ごとの追加項目）に挙式日とお客様名を持たせ、ブログが「お客様の声」のときだけ出力します。値が入っていない項目は表示しません。挙式日は日付の形式をテンプレート側でそろえます。",
        lang: "Liquid",
        body: `{% if blog.handle == 'voice' %}
<!-- ▼ お客様の声のみ -->
<div class="article-metafields flex">
  {% if article.metafields.custom.kyoshiki %}
  <div class="metafield-item">
    <strong>挙式日：</strong>
    {{ article.metafields.custom.kyoshiki | date: "%Y年%m月%d日" }}
  </div>
  {% endif %}

  {% if article.metafields.custom.couple_name %}
  <div class="metafield-item">
    <strong>お客様名：</strong>
    {{ article.metafields.custom.couple_name }}
  </div>
  {% endif %}
</div>
<!-- ▲ お客様の声のみ -->
{% endif %}`
      }
    ],
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
    code: [
      {
        title: "Shopifyのブログ記事を、ページに最新3件だけ出す",
        problem: "OEMページは独立したページのため、コラムの最新記事を出すには、記事のタグ・日付・画像を自分で組む必要がありました。",
        approach: "ブログのハンドルから記事を3件だけ取り出します。タグは先頭の1つだけ、アイキャッチ画像がない記事はダミー画像に差し替え、記事が1件もないときは else の側で案内文を出します。日付は datetime 属性にも入れています。",
        lang: "Liquid",
        body: `{% assign oem_blog = blogs['column'] %}
{% for article in oem_blog.articles limit: 3 %}
  <li class="article-item">
    <a href="{{ article.url }}" class="article-link">
      <h3 class="article-title">{{ article.title }}</h3>
      <div class="article-datebox">
        {% if article.tags.size > 0 %}
          <span class="article-tag">{{ article.tags | first }}</span>
        {% endif %}
        <time class="article-date" datetime="{{ article.published_at | date: '%Y-%m-%d' }}">
          {{ article.published_at | date: '%Y/%m/%d' }}
        </time>
      </div>
      <div class="imgbox">
        {% if article.image %}
          <img src="{{ article.image | image_url: width: 600 }}" alt="{{ article.image.alt | escape }}">
        {% else %}
          <img src="{{ 'dummy.png' | asset_url }}" alt="{{ article.title | escape }}">
        {% endif %}
      </div>
    </a>
  </li>
{% else %}
  {% comment %}記事がない場合{% endcomment %}
  <li class="article-item">
    <p class="article-link center">記事がまだ公開されていません。</p>
  </li>
{% endfor %}`
      },
      {
        title: "「よくある質問」を、JavaScriptなしの開閉にする",
        problem: "質問が9件あり、すべて開いたままだとページが長くなり、必要な答えを探しにくくなります。",
        approach: "HTMLの details と summary だけで開閉を作りました。JavaScriptを足さないため読み込みが軽く、キーボード操作や読み上げにもそのまま対応します。質問の追加は、1ブロックを複製するだけです。",
        lang: "HTML",
        body: `<div class="faq-box">
  <details class="details">
    <summary class="question">最小ロットや納期はどのくらいですか？</summary>
    <p class="answer">最小100個から対応しております。…</p>
  </details>
  <details class="details">
    <summary class="question">光沢や香りなど、仕上がりのカスタマイズは可能ですか？</summary>
    <p class="answer">ご要望を伺い、配合に反映のうえ試作品を製造いたします。</p>
  </details>
  <!-- 以降、同じ構造で9件 -->
</div>`
      },
      {
        title: "問い合わせボタンを、ページの途中から出して追従させる",
        problem: "ページを開いた直後から問い合わせボタンを出すと、最初に見せたい内容の邪魔になっていました。",
        approach: "ページの途中に目印の要素を置き、それが画面に入ったときに初めてボタンを表示します。目印の要素がないページでは何もしないようにして、エラーを防いでいます。",
        lang: "JavaScript",
        body: `document.addEventListener('DOMContentLoaded', function () {
  const trigger = document.getElementById('js-contact-trigger');
  const contactButton = document.querySelector('.contact-button');

  if (!trigger || !contactButton) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          contactButton.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px' }
  );

  observer.observe(trigger);
});`
      }
    ],
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
    description: "アスベスト除去・含有調査・内装解体工事を手がける株式会社ジーエイトのコーポレートサイト。リフォーム前の安全確認を検討する住宅所有者や建設業者に向けて、サービス内容・施工実績・無料相談の導線をわかりやすく整理し、単独で制作しました。テーマへのコミットは、マージを除いてすべて私のものです。",
    tech: ["HTML", "CSS / SCSS", "JavaScript", "WordPress", "PHP"],
    code: [
      {
        title: "ページ内リンクへの移動を、ライブラリなしでなめらかにする",
        problem: "他ページから「#price」のようなリンクで開くと、目的の位置へ一瞬で飛んでしまい、どこへ移動したのかが分かりにくくなっていました。",
        approach: "読み込み時のハッシュを取り出し、requestAnimationFrame で400msかけて移動させます。加速と減速をつける式（easeInOutQuad）だけを自前で持ち、プラグインは使っていません。",
        lang: "JavaScript",
        body: `document.addEventListener("DOMContentLoaded", () => {
  const urlHash = location.hash;
  if (urlHash) {
    window.scrollTo(0, 0); // ブラウザの自動ジャンプを打ち消す
    setTimeout(() => {
      const target = document.querySelector(urlHash);
      if (target) {
        const speed = 400;
        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + window.scrollY;
        const startTime = performance.now();
        const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
        const step = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / speed, 1);
          window.scrollTo(0, start + (end - start) * easeInOutQuad(progress));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, 100);
  }
});`
      },
      {
        title: "スマホの固定メニューに、ページ最下部が隠れないようにする",
        problem: "スマートフォンでは画面下に電話・問い合わせの固定メニューが出るため、フッターの最後の行が固定メニューの裏に隠れていました。",
        approach: "固定メニューの高さを実測し、その分だけ body の下に余白を足します。幅が変わったときも測り直すので、画面を回転しても隠れません。750pxを超えたら余白を戻します。",
        lang: "JavaScript",
        body: `const applyFooterMargin = () => {
  const fMenu = document.querySelector(".f_menu");
  if (fMenu && window.matchMedia("(max-width: 750px)").matches) {
    document.body.style.marginBottom = fMenu.offsetHeight + "px";
  } else {
    document.body.style.marginBottom = "";
  }
};
applyFooterMargin();
window.addEventListener("resize", applyFooterMargin);`
      },
      {
        title: "ハンバーガーメニューを、読み上げにも対応して開閉する",
        problem: "ボタンの見た目だけを切り替えると、スクリーンリーダーを使う人には、メニューが開いているのか閉じているのかが伝わりません。",
        approach: "aria-expanded と aria-label を、開閉のたびに同じ処理で更新します。メニュー内のリンクを押したときはドロワーを閉じ、ドロップダウン用のリンクだけは閉じないようにしています。メニューが開いている間は body に fixed を付けて、背景のスクロールを止めます。",
        lang: "JavaScript",
        body: `document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("js-buttonHamburger");
  const navMenu = document.querySelector(".gnav");
  const body = document.body;

  if (!menuButton || !navMenu) return;

  function closeDrawer() {
    menuButton.setAttribute("aria-expanded", false);
    menuButton.setAttribute("aria-label", "メニューを開く");
    navMenu.classList.remove("active");
    body.classList.remove("fixed", "is-drawerActive");
  }

  menuButton.addEventListener("click", function () {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    const newState = !isExpanded;

    menuButton.setAttribute("aria-expanded", newState);
    navMenu.classList.toggle("active", newState);
    body.classList.toggle("fixed", newState);
    body.classList.toggle("is-drawerActive", newState);
    menuButton.setAttribute("aria-label", newState ? "メニューを閉じる" : "メニューを開く");
  });

  // メニュー内リンクを押したらドロワーを閉じる（750px以下）
  navMenu.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;
    if (link.id === "dropdown-link") return; // ドロップダウンは閉じない
    if (menuButton.getAttribute("aria-expanded") === "true") {
      closeDrawer();
    }
  });
});`
      },
      {
        title: "セクションが画面に入ったときに、下からふわっと表示する",
        problem: "スクロールのイベントで位置を測り続けると処理が重くなり、ページ全体の動きがぎこちなくなります。",
        approach: "IntersectionObserver で、セクションが20%見えたときにだけ is-visible を付けます。動きそのものは CSS 側に持たせ、JavaScriptは付け外しだけにしています。",
        lang: "JavaScript",
        body: `// main内の .fade-in が画面に入ったら .is-visible を付与し、下からフワッと表示
// 発火タイミングは threshold で調整（0.2 = 20%見えたら）
// アニメーション内容は CSS の .fade-in.is-visible を編集する
const fadeInSections = document.querySelectorAll("main .fade-in");
if (fadeInSections.length > 0) {
  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 },
  );
  fadeInSections.forEach((section) => fadeInObserver.observe(section));
}`
      }
    ],
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
