# Myportfolio

## Git 運用

このプロジェクトは1人で作業しているため、作業ブランチもプルリクも作らない。

- コミットは `main` に直接行う
- push は `git push origin main` で `main` へ直接行う
- 「プッシュ」「PR」「マージ」と指示されても、ブランチ作成・プルリク作成・マージは行わず、`main` へのコミットと push だけを行う
- グローバルのスキル（`git-branch-create`・`git-commit-message`・`post-pr-merge-cleanup`・`git-wip-push`）にある「`main` への直接コミット禁止」「作業ブランチ必須」は、このリポジトリでは適用しない
- コミットメッセージの書式（`<type>：<subject>` ＋見出し・箇条書き）は `git-commit-message` に従う
